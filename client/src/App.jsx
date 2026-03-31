import { useState } from "react";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("http://localhost:5000/api/analyzer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Resume Analyzer</h1>

      <textarea
        rows="10"
        cols="80"
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        style={{ marginTop: "20px", padding: "10px" }}
      />

      <br />

      <button
        onClick={handleAnalyze}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Analyze Resume
      </button>

      {loading && <p>Analyzing resume...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {analysis && (
        <div style={{ marginTop: "30px" }}>
          <h2>Score: {analysis.overallScore}/100</h2>

          <h3>Strengths</h3>
          <ul>
            {analysis.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Weaknesses</h3>
          <ul>
            {analysis.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Suggestions</h3>
          <ul>
            {analysis.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Summary</h3>
          <p>{analysis.summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;