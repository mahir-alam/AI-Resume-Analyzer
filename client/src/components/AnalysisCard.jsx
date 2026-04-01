import AnalysisSection from "./AnalysisSection";

function AnalysisCard({ analysis, loading }) {
  if (!analysis && !loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-white/5 px-6 text-center text-sm leading-6 text-slate-400">
        No analysis yet. Submit resume text to generate structured feedback.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-white/10 bg-white/5 text-sm text-slate-400">
        Generating analysis...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Resume Score
          </p>

          <div className="mt-3 flex items-end gap-3">
            <h3 className="text-5xl font-semibold text-white">
              {analysis.overallScore}
            </h3>
            <span className="pb-2 text-sm text-slate-300">/ 100</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-purple-400/20 bg-purple-400/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
            ATS Match Score
          </p>

          <div className="mt-3 flex items-end gap-3">
            <h3 className="text-5xl font-semibold text-white">
              {analysis.atsMatchScore ?? "N/A"}
            </h3>
            {analysis.atsMatchScore !== undefined && (
              <span className="pb-2 text-sm text-slate-300">/ 100</span>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Summary
        </h3>
        <p className="text-sm leading-7 text-slate-300">{analysis.summary}</p>
      </div>

      {analysis.matchedKeywords?.length > 0 && (
        <div className="rounded-[24px] border border-green-400/20 bg-green-400/10 p-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-green-300">
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.matchedKeywords.map((word, index) => (
              <span
                key={index}
                className="rounded-full border border-green-400/20 bg-green-500/20 px-3 py-1 text-sm text-green-200"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {analysis.missingKeywords?.length > 0 && (
        <div className="rounded-[24px] border border-yellow-400/20 bg-yellow-400/10 p-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((word, index) => (
              <span
                key={index}
                className="rounded-full border border-yellow-400/20 bg-yellow-500/20 px-3 py-1 text-sm text-yellow-200"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      <AnalysisSection
        title="Key Strengths"
        items={analysis.strengths}
        color="green"
      />

      <AnalysisSection
        title="Areas for Improvement"
        items={analysis.weaknesses}
        color="yellow"
      />

      <AnalysisSection
        title="Actionable Suggestions"
        items={analysis.suggestions}
        color="blue"
      />
    </div>
  );
}

export default AnalysisCard;