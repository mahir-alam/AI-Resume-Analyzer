import OpenAI from "openai";
import { PDFParse } from "pdf-parse";
import Analysis from "../models/Analysis.js";

const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    let finalResumeText = resumeText?.trim() || "";
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
You are a professional resume reviewer and ATS optimization expert.

Analyze the resume and compare it to the job description only if one is provided.

Return ONLY valid JSON in this exact format:
{
  "overallScore": number,
  "atsMatchScore": number | null,
  "summary": "2-3 sentence professional evaluation",
  "strengths": ["point 1", "point 2", "point 3"],
  "weaknesses": ["point 1", "point 2", "point 3"],
  "missingKeywords": ["keyword 1", "keyword 2", "keyword 3"],
  "matchedKeywords": ["keyword 1", "keyword 2", "keyword 3"],
  "suggestions": ["point 1", "point 2", "point 3"]
}

Scoring rules:
- overallScore = overall resume quality, regardless of the job description
- overallScore should consider clarity, structure, relevance of experience, quantified impact, quality of projects, and professionalism
- atsMatchScore = match against the provided job description only
- If no job description is provided, set atsMatchScore to null
- If no job description is provided, set missingKeywords to []
- If no job description is provided, set matchedKeywords to []
- Do not invent ATS-specific keywords when no job description is given
- These two scores should usually be different unless there is a very strong reason for them to be the same

Output rules:
- Be specific and actionable
- Focus on impact, metrics, clarity, and ATS alignment
- If a job description is provided, compare the resume against it
- Identify important missing keywords from the job description
- Identify important matched keywords already present in the resume
- Avoid generic feedback
- Keep the tone professional and concise

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
      parsed = JSON.parse(aiText);
    } catch (parseError) {
      console.error("JSON parse error from OpenAI response:");
      console.error(aiText);

      return res.status(500).json({
        message: "Failed to parse AI response.",
      });
    }

    const savedAnalysis = await Analysis.create({
      user: req.user.userId,
      resumeText: finalResumeText,
      jobDescription: jobDescription?.trim() || "",
      analysisResult: parsed,
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

export { analyzeResume };