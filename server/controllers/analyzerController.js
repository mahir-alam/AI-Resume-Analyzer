const analyzeResume = (req, res) => {
  const { resumeText } = req.body;

  // Validate input
  if (!resumeText || resumeText.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Resume text is required.",
    });
  }

  // Placeholder analysis for now
  // Later this will be replaced with real OpenAI-based analysis
  const analysis = {
    overallScore: 74,
    strengths: [
      "Demonstrates relevant technical exposure through hands-on project work.",
      "Includes core technologies that are commonly expected in software development roles.",
      "Shows a clear interest in building practical, career-focused projects.",
    ],
    weaknesses: [
      "Some experience statements may be too broad and do not clearly show individual impact.",
      "The resume could better highlight measurable outcomes and technical contributions.",
      "Role-specific keywords may need stronger alignment with target job descriptions for ATS performance.",
    ],
    suggestions: [
      "Rewrite experience and project bullet points using stronger action verbs and clearer ownership.",
      "Add quantified results where possible, such as performance improvements, time savings, or scale of impact.",
      "Tailor technical skills and project wording to better match the requirements of the job being targeted.",
    ],
    summary:
      "This resume shows solid foundational potential for entry-level software roles, but could be strengthened with more measurable achievements, sharper bullet points, and better ATS alignment.",
  };

  return res.status(200).json({
    success: true,
    message: "Resume analyzed successfully.",
    analysis,
  });
};

module.exports = { analyzeResume };