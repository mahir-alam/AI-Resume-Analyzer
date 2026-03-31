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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        <div className="mb-10 rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <div className="max-w-3xl">
            <p className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              AI-Powered Resume Review
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Improve your resume with structured, actionable feedback.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Paste your resume content and receive a professional evaluation
              with strengths, improvement areas, and recruiter-style
              suggestions designed to help you present your experience more
              effectively.
            </p>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  Resume Input
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Analyze your resume draft
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  Paste your resume text below to generate a structured review.
                  This will later support job-specific analysis, ATS feedback,
                  and tailored suggestions.
                </p>
              </div>

              <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right sm:block">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Current Mode
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Placeholder Analysis
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="min-h-[360px] w-full resize-none rounded-2xl border-0 bg-white p-5 text-sm leading-6 text-slate-700 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Tip: Include projects, technical skills, experience, and
                measurable achievements for stronger feedback.
              </p>

              <button
                onClick={handleAnalyze}
                disabled={loading || !resumeText.trim()}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyzing Resume..." : "Analyze Resume"}
              </button>
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Analysis Result
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Resume evaluation output
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Review the generated feedback to understand how your resume is
                currently positioned and where it can be improved.
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