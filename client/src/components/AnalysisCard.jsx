import AnalysisSection from "./AnalysisSection";

function AnalysisCard({ analysis, loading }) {
  if (!analysis && !loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center text-sm text-slate-500">
        No analysis yet. Submit resume text to generate feedback.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
        Generating analysis...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-700">Overall Resume Score</p>
        <h3 className="mt-2 text-3xl font-bold text-slate-900">
          {analysis.overallScore}/100
        </h3>
      </div>

      <AnalysisSection title="Key Strengths" items={analysis.strengths} />
      <AnalysisSection
        title="Areas for Improvement"
        items={analysis.weaknesses}
      />
      <AnalysisSection
        title="Actionable Suggestions"
        items={analysis.suggestions}
      />

      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Summary
        </h3>
        <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          {analysis.summary}
        </p>
      </div>
    </div>
  );
}

export default AnalysisCard;