import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/api/analyzer/history`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch history.");
        }

        setAnalyses(data);
      } catch (err) {
        console.error("History fetch error:", err);
        setError(err.message || "Failed to load analysis history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getFallbackResumeTitle = (analysis, index) => {
    const resumeText = analysis.resumeText || "";

    const lines = resumeText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return (
      analysis.resumeLabel ||
      analysis.originalFileName ||
      lines[0] ||
      `Resume Analysis #${analyses.length - index}`
    );
  };

  const getFallbackJobTitle = (analysis) => {
    const jobDescription = analysis.jobDescription || "";

    const lines = jobDescription
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return analysis.jobLabel || lines[0] || "No Job Label";
  };

  const getResumePreview = (resumeText) => {
    if (!resumeText || typeof resumeText !== "string") {
      return "No resume preview available.";
    }

    const cleaned = resumeText.replace(/\s+/g, " ").trim();

    if (!cleaned) {
      return "No resume preview available.";
    }

    if (cleaned.length > 160) {
      return `${cleaned.slice(0, 160)}...`;
    }

    return cleaned;
  };

  const getJobDescriptionPreview = (jobDescription) => {
    if (!jobDescription || typeof jobDescription !== "string") {
      return "";
    }

    const cleaned = jobDescription.replace(/\s+/g, " ").trim();

    if (!cleaned) {
      return "";
    }

    if (cleaned.length > 140) {
      return `${cleaned.slice(0, 140)}...`;
    }

    return cleaned;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900/90 backdrop-blur">
        <div className="w-full px-6 py-5 sm:px-8 xl:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Saved Resume Analyses
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Analysis History
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                Review previous resume evaluations, compare ATS results, and
                track how your resume improves over time.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Records
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {loading ? "Loading..." : analyses.length}
                </p>
              </div>

              <Link
                to="/dashboard"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-6 sm:px-8 xl:px-10">
        {loading && (
          <div className="rounded-[28px] border border-white/10 bg-slate-900 p-6 text-slate-300 shadow-2xl">
            Loading your saved analyses...
          </div>
        )}

        {error && (
          <div className="rounded-[28px] border border-red-400/20 bg-red-500/10 p-6 text-red-300 shadow-2xl">
            {error}
          </div>
        )}

        {!loading && !error && analyses.length === 0 && (
          <div className="rounded-[28px] border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <p className="text-lg font-semibold text-white">
              No analysis history yet
            </p>
            <p className="mt-2 text-slate-400">
              Once you analyze a resume, your saved results will appear here.
            </p>

            <Link
              to="/dashboard"
              className="mt-5 inline-flex rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Analyze a Resume
            </Link>
          </div>
        )}

        {!loading && !error && analyses.length > 0 && (
          <div className="grid gap-6">
            {analyses.map((analysis, index) => {
              const overallScore =
                analysis.analysisResult?.overallScore ??
                analysis.analysisResult?.score ??
                null;

              const atsScore =
                analysis.analysisResult?.atsMatchScore ??
                analysis.analysisResult?.atsScore ??
                null;

              const matchedKeywords =
                analysis.analysisResult?.matchedKeywords ??
                analysis.analysisResult?.keywordMatches ??
                analysis.analysisResult?.matched_terms ??
                [];

              const missingKeywords =
                analysis.analysisResult?.missingKeywords ??
                analysis.analysisResult?.keywordGaps ??
                analysis.analysisResult?.missing_terms ??
                [];

              const atsSuggestions =
                analysis.analysisResult?.atsSuggestions ??
                analysis.analysisResult?.keywordSuggestions ??
                analysis.analysisResult?.atsImprovements ??
                [];

              const resumeTitle = getFallbackResumeTitle(analysis, index);
              const jobTitle = getFallbackJobTitle(analysis);
              const resumePreview = getResumePreview(analysis.resumeText);
              const jobPreview = getJobDescriptionPreview(
                analysis.jobDescription
              );

              return (
                <section
                  key={analysis._id}
                  className="rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8"
                >
                  <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-4xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                        Saved Analysis #{analyses.length - index}
                      </p>

                      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                        {resumeTitle}
                      </h2>

                      <p className="mt-2 text-sm text-slate-400">
                        {new Date(analysis.createdAt).toLocaleString()}
                      </p>

                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-[20px] border border-white/10 bg-slate-950/60 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Resume Identifier
                          </p>
                          <p className="mt-2 text-sm font-medium text-white">
                            {resumeTitle}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {resumePreview}
                          </p>
                        </div>

                        <div className="rounded-[20px] border border-white/10 bg-slate-950/60 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Job Identifier
                          </p>
                          <p className="mt-2 text-sm font-medium text-white">
                            {jobTitle}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {jobPreview || "No job description was used."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="w-fit rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                          Overall Score
                        </p>
                        <p className="mt-1 text-lg font-semibold text-cyan-300">
                          {overallScore !== null ? `${overallScore}/10` : "N/A"}
                        </p>
                      </div>

                      {atsScore !== null && atsScore !== undefined && (
                        <div className="w-fit rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-300">
                            ATS Match
                          </p>
                          <p className="mt-1 text-lg font-semibold text-emerald-300">
                            {atsScore}/10
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {analysis.analysisResult?.summary && (
                    <div className="mb-6 rounded-[24px] border border-white/10 bg-slate-950/60 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                        Summary
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {analysis.analysisResult.summary}
                      </p>
                    </div>
                  )}

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/5 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        Strengths
                      </p>

                      {analysis.analysisResult?.strengths?.length > 0 ? (
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                          {analysis.analysisResult.strengths.map((item, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-sm text-slate-400">
                          No strengths recorded.
                        </p>
                      )}
                    </div>

                    <div className="rounded-[24px] border border-red-400/20 bg-red-500/5 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300">
                        Weaknesses
                      </p>

                      {analysis.analysisResult?.weaknesses?.length > 0 ? (
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                          {analysis.analysisResult.weaknesses.map((item, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-red-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-sm text-slate-400">
                          No weaknesses recorded.
                        </p>
                      )}
                    </div>
                  </div>

                  {analysis.analysisResult?.suggestions?.length > 0 && (
                    <div className="mt-6 rounded-[24px] border border-cyan-400/20 bg-cyan-500/5 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                        Suggestions
                      </p>

                      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                        {analysis.analysisResult.suggestions.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(atsScore !== null ||
                    matchedKeywords.length > 0 ||
                    missingKeywords.length > 0 ||
                    atsSuggestions.length > 0) && (
                    <div className="mt-6 rounded-[24px] border border-emerald-400/20 bg-emerald-500/5 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        ATS Details
                      </p>

                      {atsScore !== null && atsScore !== undefined && (
                        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                            ATS Match Score
                          </p>
                          <p className="mt-1 text-base font-semibold text-emerald-300">
                            {atsScore}/10
                          </p>
                        </div>
                      )}

                      <div className="mt-4 grid gap-5 lg:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Matched Keywords
                          </p>

                          {matchedKeywords.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {matchedKeywords.map((keyword, i) => (
                                <span
                                  key={i}
                                  className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-sm text-slate-400">
                              No matched keywords were saved for this analysis.
                            </p>
                          )}
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Missing Keywords
                          </p>

                          {missingKeywords.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {missingKeywords.map((keyword, i) => (
                                <span
                                  key={i}
                                  className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-sm text-slate-400">
                              No missing keywords were saved for this analysis.
                            </p>
                          )}
                        </div>
                      </div>

                      {atsSuggestions.length > 0 && (
                        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            ATS Improvement Notes
                          </p>

                          <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
                            {atsSuggestions.map((item, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-300" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default History;