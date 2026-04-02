import OpenAI from "openai";
import { PDFParse } from "pdf-parse";
import Analysis from "../models/Analysis.js";

const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription, resumeLabel, jobLabel } = req.body;
    let finalResumeText = resumeText?.trim() || "";
    const trimmedResumeLabel = resumeLabel?.trim() || "";
    const trimmedJobLabel = jobLabel?.trim() || "";
    const originalFileName = req.file?.originalname || "";

    const generatedResumeLabel =
      trimmedResumeLabel ||
      originalFileName ||
      finalResumeText?.split("\n").map((line) => line.trim()).find(Boolean) ||
      "Untitled Resume";

    const generatedJobLabel =
      trimmedJobLabel ||
      jobDescription
        ?.split("\n")
        .map((line) => line.trim())
        .find(Boolean) ||
      "No Job Label";
    const hasJobDescription = jobDescription && jobDescription.trim() !== "";

    if (req.file) {
      try {
        const parser = new PDFParse({
          data: req.file.buffer,
        });

        const parsedPdf = await parser.getText();
        finalResumeText = parsedPdf.text.trim();
      } catch (error) {
        console.error("PDF parse error:", error);

        return res.status(400).json({
          message: "Failed to parse uploaded PDF.",
        });
      }
    }

    if (!finalResumeText) {
      return res.status(400).json({
        message: "Resume text or PDF file is required.",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        message: "OpenAI API key is missing in server environment variables.",
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

const prompt = `
You are a senior ATS (Applicant Tracking System) optimization expert and professional resume reviewer.

Your job is to analyze a resume and compare it against a job description (if provided), producing structured, high-quality, realistic ATS feedback.

Return ONLY valid JSON in this EXACT format:

{
  "overallScore": number,
  "atsMatchScore": number | null,
  "summary": "2-3 sentence professional evaluation",
  "strengths": ["point 1", "point 2", "point 3"],
  "weaknesses": ["point 1", "point 2", "point 3"],
  "matchedKeywords": ["keyword 1", "keyword 2", "keyword 3"],
  "missingKeywords": ["keyword 1", "keyword 2", "keyword 3"],
  "atsSuggestions": ["ATS-specific improvement 1", "ATS-specific improvement 2"],
  "suggestions": ["general improvement 1", "general improvement 2"]
}

CRITICAL RULES:

1. overallScore:
- Score from 1–10
- Based on structure, clarity, impact, projects, and professionalism

2. atsMatchScore:
- Score from 1–10
- Based ONLY on how well the resume matches the job description
- If NO job description → return null

3. matchedKeywords:
- Extract important technical keywords FROM THE JOB DESCRIPTION
- Include ONLY keywords that clearly appear in the resume
- Examples: "React", "Node.js", "MongoDB", "REST APIs"

4. missingKeywords:
- Extract important keywords from job description NOT found in resume
- Do NOT hallucinate keywords
- Only include realistic, meaningful terms

5. atsSuggestions:
- Must be SPECIFIC to ATS optimization
- Focus on:
  - missing keywords
  - formatting issues
  - keyword density
  - alignment with job description

6. suggestions:
- General resume improvements
- Focus on:
  - impact (metrics, numbers)
  - clarity
  - stronger bullet points
  - better structure

7. STRICT BEHAVIOR:
- If no job description:
  - atsMatchScore = null
  - matchedKeywords = []
  - missingKeywords = []
  - atsSuggestions = []
- DO NOT mix ATS suggestions into general suggestions
- DO NOT return explanations outside JSON

Resume:
${finalResumeText}

Job Description:
${hasJobDescription ? jobDescription.trim() : "Not provided"}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional resume analyzer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const aiText = response.choices[0].message.content;

    let parsed;

    try {
      const cleaned = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON parse error from OpenAI response:");
      console.error(aiText);

      return res.status(500).json({
        message: "Failed to parse AI response.",
      });
    }
    parsed.matchedKeywords = parsed.matchedKeywords || [];
    parsed.missingKeywords = parsed.missingKeywords || [];
    parsed.atsSuggestions = parsed.atsSuggestions || [];
    parsed.suggestions = parsed.suggestions || [];

    const normalizeScore = (value, allowNull = false) => {
      if (allowNull && (value === null || value === undefined || value === "")) {
        return null;
      }

      const num = Number(value);

      if (Number.isNaN(num)) {
        return allowNull ? null : 0;
      }

      if (num > 10 && num <= 100) {
        return Math.round(num / 10);
      }

      return Math.max(0, Math.min(10, Math.round(num)));
    };

    parsed.overallScore = normalizeScore(parsed.overallScore);
    parsed.atsMatchScore = normalizeScore(parsed.atsMatchScore, true);

    const savedAnalysis = await Analysis.create({
      user: req.user.userId,
      resumeText: finalResumeText,
      jobDescription: jobDescription?.trim() || "",
      analysisResult: parsed,
      resumeLabel: generatedResumeLabel,
      jobLabel: generatedJobLabel,
      originalFileName,
    });

    return res.status(200).json({
      message: "Resume analyzed successfully.",
      analysis: parsed,
      savedAnalysisId: savedAnalysis._id,
    });

  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      message: "Error analyzing resume with AI.",
    });
  }
};
const getUserAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(analyses);
  } catch (error) {
    console.error("Fetch Analyses Error:", error);

    return res.status(500).json({
      message: "Failed to fetch analysis history.",
    });
  }
};

const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found.",
      });
    }

    if (analysis.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized to delete this analysis.",
      });
    }

    await analysis.deleteOne();

    return res.status(200).json({
      message: "Analysis deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Analysis Error:", error);

    return res.status(500).json({
      message: "Failed to delete analysis.",
    });
  }
};
export { analyzeResume, getUserAnalyses, deleteAnalysis };