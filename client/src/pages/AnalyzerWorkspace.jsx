import { Link } from "react-router-dom";
import { useState } from "react";
import AnalysisCard from "../components/AnalysisCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AnalyzerWorkspace({ demoMode = false }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resumeLabel, setResumeLabel] = useState("");
  const [jobLabel, setJobLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleAnalyze = async () => {
    const trimmedResumeText = resumeText.trim();

    if (!trimmedResumeText && !resumeFile) {
      setError("Please paste resume or upload PDF.");
      setAnalysis(null);
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("resumeText", trimmedResumeText);
      formData.append("jobDescription", jobDescription.trim());
      formData.append("resumeLabel", resumeLabel.trim());
      formData.append("jobLabel", jobLabel.trim());

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }

      const token = localStorage.getItem("token");

      const headers = demoMode
        ? {}
        : {
            Authorization: `Bearer ${token}`,
          };

      const response = await fetch(`${API_BASE_URL}/api/analyzer`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setAnalysis({
        analysisResult: data.analysis,
        resumeText: data.resumeText,
        jobDescription: data.jobDescription,
        resumeLabel: data.resumeLabel,
        jobLabel: data.jobLabel,
        originalFileName: data.originalFileName,
      });

      setSaved(false);
    } catch (err) {
      setError(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (!analysis || demoMode) return;

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/analyzer/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeText: analysis.resumeText,
          jobDescription: analysis.jobDescription,
          analysisResult: analysis.analysisResult,
          resumeLabel: analysis.resumeLabel,
          jobLabel: analysis.jobLabel,
          originalFileName: analysis.originalFileName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save analysis.");
      }

      setSaved(true);
    } catch (err) {
      console.error("Save error:", err);
      alert(err.message || "Failed to save analysis.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900/90 backdrop-blur">
        <div className="w-full px-6 py-5 sm:px-8 xl:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                {demoMode ? "Public Demo Mode" : "AI-Powered Resume Review"}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                AI Resume Analyzer
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                {demoMode
                  ? "Try the analyzer instantly without creating an account. Saving and history are available in full account mode."
                  : "Structured feedback, clearer strengths and weaknesses, and recruiter-style suggestions."}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Mode
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {demoMode ? "Demo" : "AI Analysis"}
                </p>
              </div>

              {demoMode ? (
                <>
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Back Home
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/history"
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    View History
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-6 sm:px-8 xl:px-10">
        <div className="grid items-start gap-6 2xl:grid-cols-[1.03fr_0.97fr]">
          <section className="rounded-[28px] border border-white/10 bg-white text-slate-900 shadow-2xl 2xl:sticky 2xl:top-6 2xl:h-[calc(100vh-150px)]">
            <div className="flex h-full flex-col p-5 sm:p-6 xl:p-7">
              <div className="mb-5 flex-shrink-0">
                <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                      Resume Input
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                      Analyze your resume draft
                    </h2>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      Paste your resume below to receive structured feedback. You
                      can also upload a PDF and add a job description for ATS
                      matching.
                    </p>
                  </div>

                  <div className="w-fit rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      Current Mode
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      Manual Paste + PDF
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                <div className="mb-5 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Resume Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={resumeLabel}
                      onChange={(e) => setResumeLabel(e.target.value)}
                      placeholder="Example: SWE Resume v2"
                      className="w-full rounded-[18px] border-0 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Job Label (Optional)
                    </label>
                    <input
                      type="text"
                      value={jobLabel}
                      onChange={(e) => setJobLabel(e.target.value)}
                      placeholder="Example: Software Developer Intern"
                      className="w-full rounded-[18px] border-0 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume here..."
                    className="min-h-[220px] w-full resize-none rounded-[22px] border-0 bg-white p-5 text-[15px] leading-7 text-slate-700 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500 lg:min-h-[240px]"
                  />
                </div>

                <div className="mt-5 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Upload Resume PDF (Optional)
                  </label>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResumeFile(e.target.files[0] || null)}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  />

                  {resumeFile && (
                    <p className="mt-3 text-sm text-slate-500">
                      Selected file: {resumeFile.name}
                    </p>
                  )}
                </div>

                <div className="mt-5 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Job Description (Optional)
                  </label>

                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here for ATS matching..."
                    className="min-h-[130px] w-full resize-none rounded-[22px] border-0 bg-white p-5 text-[15px] leading-7 text-slate-700 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {error && (
                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </div>

              <div className="mt-4 flex-shrink-0 border-t border-slate-200 pt-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-medium text-slate-700">
                      Best results come from resumes that include projects,
                      technical skills, experience, and measurable impact.
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Example: technologies used, your contributions, and
                      quantified outcomes.
                    </p>
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={loading || (!resumeText.trim() && !resumeFile)}
                    className="inline-flex min-w-[190px] items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Analyzing Resume..." : "Analyze Resume"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl 2xl:sticky 2xl:top-6 2xl:h-[calc(100vh-150px)]">
            <div className="flex h-full flex-col p-5 sm:p-6 xl:p-7">
              <div className="mb-5 flex-shrink-0">
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

              <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                <AnalysisCard
                  analysis={analysis?.analysisResult || null}
                  loading={loading}
                />
              </div>

              {analysis && (
                <div className="mt-4 flex-shrink-0 border-t border-white/10 pt-4">
                  {demoMode ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                      Save, history, and deletion are available in full account mode.
                    </div>
                  ) : (
                    <button
                      onClick={handleSaveAnalysis}
                      disabled={saving || saved}
                      className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saved ? "Saved ✔" : saving ? "Saving..." : "Save Analysis"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default AnalyzerWorkspace;