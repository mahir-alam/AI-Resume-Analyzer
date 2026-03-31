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
              disabled={loading}
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

            {!analysis && !loading && (
              <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center text-sm text-slate-500">
                No analysis yet. Submit resume text to generate feedback.
              </div>
            )}

            {loading && (
              <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
                Generating analysis...
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-700">
                    Overall Resume Score
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900">
                    {analysis.overallScore}/100
                  </h3>
                </div>

                <Section title="Key Strengths" items={analysis.strengths} />
                <Section
                  title="Areas for Improvement"
                  items={analysis.weaknesses}
                />
                <Section
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;