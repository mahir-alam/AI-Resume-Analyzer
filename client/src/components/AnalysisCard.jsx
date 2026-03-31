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
    <div className="space-y-8">
      {/* SCORE + SUMMARY */}
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

        <p className="mt-4 text-sm leading-6 text-slate-300">
          {analysis.summary}
        </p>
      </div>

      {/* STRENGTHS */}
      <AnalysisSection
        title="Key Strengths"
        items={analysis.strengths}
        color="green"
      />

      {/* WEAKNESSES */}
      <AnalysisSection
        title="Areas for Improvement"
        items={analysis.weaknesses}
        color="yellow"
      />

      {/* SUGGESTIONS */}
      <AnalysisSection
        title="Actionable Suggestions"
        items={analysis.suggestions}
        color="blue"
      />
    </div>
  );
}

export default AnalysisCard;