import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              AI-Powered Resume Review
            </p>
            <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              AI Resume Analyzer
            </h1>
          </div>

            <div className="flex gap-3">
              {!token ? (
                <>
                  <Link
                    to="/demo"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Try Demo
                  </Link>

                  <Link
                    to="/login"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
        </div>
      </header>

      <main>
        <section className="border-b border-white/10">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Resume feedback built for real job applications
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Analyze your resume, improve ATS match, and save tailored reviews in one place.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                AI Resume Analyzer helps students and job seekers review resume
                quality, compare against job descriptions, identify missing
                keywords, and keep a history of saved analyses for future
                improvement.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/demo"
                  className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Try Demo
                </Link>

                <Link
                  to="/signup"
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Create Account
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">AI</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Structured resume feedback powered by intelligent analysis.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">ATS</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Compare against job descriptions and surface missing keywords.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">History</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Save, review, and manage previous analyses in one dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      Sample Analysis
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Software Developer Resume
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-300">
                      ATS Match
                    </p>
                    <p className="mt-1 text-sm font-semibold text-emerald-300">
                      8/10
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-300">
                      Strengths
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      <li>Strong project relevance</li>
                      <li>Good React and Node.js alignment</li>
                      <li>Clear technical stack</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-red-300">
                      Missing Keywords
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      <li>AWS</li>
                      <li>CI/CD</li>
                      <li>Scalability</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    Summary
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    This resume shows solid full-stack fundamentals and relevant
                    project work, but could improve ATS alignment by including
                    missing cloud and deployment-related keywords.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Features
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Built like a modern career tool, not a class demo
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-400">
                Designed to simulate a real-world product experience with resume
                review, ATS matching, user history, labels, and analysis
                management workflows.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-semibold text-white">
                  AI Resume Review
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Receive structured feedback with strengths, weaknesses,
                  summaries, and actionable suggestions.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-semibold text-white">
                  ATS Keyword Matching
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Compare resumes against job descriptions and identify matched
                  and missing keywords.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-semibold text-white">
                  Saved Analysis History
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Keep track of previous analyses with custom labels, timestamps,
                  previews, and history management.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-semibold text-white">
                  Explore the demo
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Public demo mode allows quick product exploration without
                  requiring account setup.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                How it works
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Simple flow, practical results
              </h3>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="rounded-[28px] border border-white/10 bg-slate-900 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Step 1
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  Paste or upload your resume
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Provide resume text directly or upload a PDF for parsing and
                  analysis.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Step 2
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  Add a target job description
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Improve ATS alignment by matching your resume against a real
                  job posting.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Step 3
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  Review, improve, and save
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Analyze the results, refine your resume, and save important
                  versions in your account history.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
            <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-500/5 p-8 text-center sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Get started
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Try the product instantly or create your account
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-400">
                Explore the analyzer in demo mode, or sign up to unlock saved
                history, labels, and account-based resume management.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/demo"
                  className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Try Demo
                </Link>

                <Link
                  to="/signup"
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-900/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-medium text-white">AI Resume Analyzer</p>
            <p className="mt-1">
              Built as a modern SaaS-style resume and ATS optimization platform.
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="font-medium text-white">Built by Mahir Alam</p>
            <p className="mt-1">
              Computer Science Student, University of Calgary
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;