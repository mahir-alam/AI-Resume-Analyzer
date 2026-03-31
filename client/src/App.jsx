import { useState } from "react";
import AnalysisCard from "./components/AnalysisCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    const trimmedResumeText = resumeText.trim();

    if (!trimmedResumeText) {
      setError("Please paste your resume text before starting the analysis.");
      setAnalysis(null);
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyzer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText: trimmedResumeText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
            AI-Powered Resume Review
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            AI Resume Analyzer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Paste your resume content below and receive a structured evaluation
            with strengths, improvement areas, and actionable suggestions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Resume Input</h2>
              <p className="mt-1 text-sm text-slate-500">
                Paste resume text to generate a professional analysis summary.
              </p>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="min-h-[300px] w-full rounded-xl border border-slate-300 bg-white p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading || !resumeText.trim()}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Analyzing Resume..." : "Analyze Resume"}
            </button>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Analysis Result</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your analysis will appear here after submission.
              </p>
            </div>

            <AnalysisCard analysis={analysis} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;