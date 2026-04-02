import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
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
                  className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
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
        {/* HERO */}
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

              {/* ✅ FIXED CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                {!token ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/demo"
                      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Try Demo
                    </Link>
                  </>
                )}
              </div>

              {/* FEATURES */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">AI</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Structured resume feedback powered by intelligent analysis.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">ATS</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Compare against job descriptions and surface missing keywords.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">History</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Save, review, and manage previous analyses in one dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* SAMPLE CARD */}
            <div className="rounded-[32px] border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
                <p className="text-sm text-slate-400">Sample analysis preview</p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section>
          <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 text-center">
            <h3 className="text-3xl font-semibold text-white">
              Try the product instantly or create your account
            </h3>

            {/* ✅ FIXED CTA */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {!token ? (
                <>
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
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Go to Dashboard
                  </Link>

                  <Link
                    to="/demo"
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Try Demo
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-900/70">
        <div className="mx-auto flex w-full max-w-7xl justify-between px-6 py-8 text-sm text-slate-400">
          <p>AI Resume Analyzer</p>
          <p>Built by Mahir Alam</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;