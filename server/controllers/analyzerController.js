import OpenAI from "openai";

const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({
        message: "Resume text is required.",
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
You are an expert resume reviewer.

Analyze the following resume and return a structured JSON response.

Resume:
${resumeText}

Return ONLY valid JSON in this exact format:
{
  "overallScore": number,
  "strengths": ["point 1", "point 2", "point 3"],
  "weaknesses": ["point 1", "point 2", "point 3"],
  "suggestions": ["point 1", "point 2", "point 3"],
  "summary": "2-3 sentence professional summary"
}
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

    return res.status(200).json({
      message: "Resume analyzed successfully.",
      analysis: parsed,
    });
  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      message: "Error analyzing resume with AI.",
    });
  }
};

export { analyzeResume };