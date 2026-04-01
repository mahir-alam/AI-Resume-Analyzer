import { useState } from "react";
import AnalysisCard from "./components/AnalysisCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
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
        body: JSON.stringify({
          resumeText: trimmedResumeText,
          jobDescription: jobDescription.trim(),
        }),
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
      <header className="border-b border-white/10 bg-slate-900/90 backdrop-blur">
        <div className="w-full px-6 py-5 sm:px-8 xl:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                AI-Powered Resume Review
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                AI Resume Analyzer
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                Structured feedback, clearer strengths and weaknesses, and
                recruiter-style suggestions.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Mode
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Placeholder Analysis
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Status
                </p>
                <p className="mt-1 text-sm font-semibold text-cyan-300">
                  Ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-6 sm:px-8 xl:px-10">
        <div className="grid gap-6 2xl:grid-cols-[1fr_0.95fr]">
          <section className="rounded-[28px] border border-white/10 bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                  Resume Input
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  Analyze your resume draft
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Paste your resume below to receive structured feedback. Later,
                  this workspace will support ATS matching, PDF upload, and
                  job-description comparison.
                </p>
              </div>

              <div className="w-fit rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Current Mode
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Manual Paste
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume here..."
                className="min-h-[320px] w-full resize-none rounded-[22px] border-0 bg-white p-6 text-[15px] leading-7 text-slate-700 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Job Description (Optional)
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here for ATS matching..."
                className="min-h-[180px] w-full resize-none rounded-[22px] border-0 bg-white p-6 text-[15px] leading-7 text-slate-700 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-slate-700">
                  Best results come from resumes that include projects,
                  technical skills, experience, and measurable impact.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Example: technologies used, your contributions, and quantified
                  outcomes.
                </p>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading || !resumeText.trim()}
                className="inline-flex min-w-[190px] items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyzing Resume..." : "Analyze Resume"}
              </button>
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </section>

          <aside className="rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Analysis Result
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Resume evaluation output
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-400">
                Review the generated feedback to understand how your resume is
                currently positioned and where it can be improved.
              </p>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pr-2">
              <AnalysisCard analysis={analysis} loading={loading} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;