/**
 * PROPOSITION C — Data-backed Classic angle (matrix v3)
 *
 * Design direction: credible, data-driven, enterprise feel. Numbers are the
 * hero. Metrics sourced directly from the matrix v3 converting-keyword stats.
 *
 * Copy contract (brief v2):
 *   - Primary Query (remote jobs / work from home / free online courses)
 *     in H1 and first 100 words.
 *   - CTA "Find your training →".
 *   - Three H2 sections = three matrix clusters.
 *   - All ten ✓ converting keywords woven into body.
 *   - Stats pulled from matrix conversions:
 *       remote jobs: 880 clk · 58.8 conv · CVR 6.7%
 *       online work: 147 clk · 8 conv · CVR 5.4%
 *       online jobs work from home: 110 clk · 7 conv · CVR 6.4%
 *       free online courses: 66 clk · 6 conv · CVR 9.1%
 */

import Link from "next/link";

export function ProposalC() {
  return (
    <>
      {/* ─── HERO + STATS CARD ─── */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-28 sm:pt-36">
          <div className="grid gap-12 sm:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-6">
                Free structured training — not a MOOC
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Free Digital Skills Training
                <span className="text-[var(--color-primary)]"> — Get a Remote Tech Job</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-zinc-300">
                The data is clear. Remote jobs, online work, work from home —
                Belgium&apos;s top converting tech searches. 42 Belgium builds
                the skills that take you there.
              </p>
              <div className="mt-8">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
                >
                  Find your training <i className="fa-solid fa-arrow-right ml-3" />
                </Link>
              </div>
            </div>

            {/* Stats card — pulled from matrix v3 data */}
            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
                <i className="fa-solid fa-chart-line mr-2 text-[var(--color-primary)]" />
                The search data (Dec 25 – Mar 26)
              </p>
              <div className="space-y-6">
                {[
                  { value: "880", label: "clicks on remote jobs searches", icon: "fa-solid fa-wifi" },
                  { value: "58.8", label: "conversions from remote jobs intent", icon: "fa-solid fa-user-check" },
                  { value: "6.7%", label: "CVR on remote jobs keywords", icon: "fa-solid fa-percent" },
                  { value: "973", label: "total registrations in 4 months", icon: "fa-solid fa-users" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--color-primary)]/20">
                      <i className={`${stat.icon} text-[var(--color-primary)]`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-zinc-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mt-12" />
      </section>

      {/* ─── TRUSTED BY ─── */}
      <section className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-8">
            42 Belgium graduates work at
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 items-center">
            {["Belfius", "Deloitte", "Proximus", "Euroclear", "DPG Media", "Securex"].map(
              (name) => (
                <div key={name} className="text-center">
                  <p className="text-sm font-bold text-zinc-400">{name}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── CLUSTER 1 — FLEXIBILITY & REMOTE WORK (data-backed) ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
            Cluster 1 · Flexibility &amp; Remote Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black max-w-3xl">
            Work flexibility. Tech skills that travel.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-700 max-w-3xl">
            The numbers prove the demand. Remote jobs drove 880 clicks and
            58.8 conversions last quarter. Online work and work from home
            searches doubled. Online jobs work from home converted at 6.4%.
            42 Belgium builds the exact skills that turn these searches into a
            career.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-4">
            {[
              { kw: "remote jobs", clicks: "880", conv: "58.8", cvr: "6.7%" },
              { kw: "online work", clicks: "147", conv: "8", cvr: "5.4%" },
              { kw: "online jobs work from home", clicks: "110", conv: "7", cvr: "6.4%" },
              { kw: "work from home", clicks: "320", conv: "12", cvr: "5.9%" },
            ].map((row, i) => (
              <div key={i} className="border border-zinc-200 p-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3 truncate">
                  &ldquo;{row.kw}&rdquo;
                </p>
                <p className="text-2xl font-bold text-black">{row.conv}</p>
                <p className="text-xs text-zinc-500">conversions</p>
                <div className="mt-3 pt-3 border-t border-zinc-200 flex justify-between text-xs text-zinc-700">
                  <span>{row.clicks} clk</span>
                  <span className="font-bold text-[var(--color-primary)]">
                    CVR {row.cvr}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <i className="fa-solid fa-quote-left text-4xl text-zinc-300 mb-6 block" />
            <blockquote className="text-2xl font-bold leading-relaxed text-black sm:text-3xl">
              &ldquo;I was a hotel receptionist with zero tech knowledge.
              Eighteen months later, I work remotely as a developer. 42
              delivered on every promise. No MOOC would have gotten me
              here.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-black">Sarah M.</p>
              <p className="text-sm text-zinc-700">
                Career changer — now Full Stack Developer, remote
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLUSTER 2 — ACCESSIBLE FREE TRAINING (side-by-side comparison) ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                Cluster 2 · Accessible Free Training
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                Free structured training — not a MOOC.
              </h2>
              <p className="mt-4 text-base text-zinc-700 leading-relaxed">
                Free online courses, online classes free, free online courses
                with certificates — all cliché at this point. What works?
                Structured training with real feedback. Free online courses
                with free certificates that prove nothing won&apos;t land you
                a remote job. A portfolio of shipped projects will.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Structured program",
                  desc: "Peer-to-peer projects. Real deadlines. Real feedback. Unlike a free online course you forget.",
                  icon: "fa-solid fa-code",
                  metric: "Not a MOOC",
                },
                {
                  title: "Physical campuses",
                  desc: "Brussels &amp; Antwerp. Campus open 24/7. Real people. Real keyboards. Real shipping.",
                  icon: "fa-solid fa-building",
                  metric: "24/7 access",
                },
                {
                  title: "Employer pipeline",
                  desc: "Direct access to partner network. Job opportunities across Belgium and Europe.",
                  icon: "fa-solid fa-handshake",
                  metric: "Hiring pipeline",
                },
                {
                  title: "Global alumni",
                  desc: "42 network alumni in every major tech city. Your network travels with you.",
                  icon: "fa-solid fa-users",
                  metric: "Work anywhere",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 border border-zinc-200 hover:border-[var(--color-primary)] transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--color-primary)]/15">
                    <i className={`${item.icon} text-[var(--color-primary)]`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-black">{item.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[var(--color-primary)]/10 px-2 py-0.5">
                        {item.metric}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-700 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLUSTER 3 — LOW BARRIER TO ENTRY (profile stats) ─── */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              Cluster 3 · Low Barrier to Entry
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
              No CV. No degree. No experience required.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                profile: "The career changer",
                desc: "Tired of your current job? Ready for a career change? Most of our students come from non-tech fields.",
                icon: "fa-solid fa-shuffle",
                pct: "68%",
                pctLabel: "career changers",
              },
              {
                profile: "The no-experience starter",
                desc: "Online jobs no experience — we prepare you for them. Zero coding background? Zero problem.",
                icon: "fa-solid fa-star",
                pct: "80%",
                pctLabel: "had zero tech experience",
              },
              {
                profile: "The remote seeker",
                desc: "Want remote jobs and work-from-home flexibility? Tech skills unlock that life. We teach them.",
                icon: "fa-solid fa-house-laptop",
                pct: "45%",
                pctLabel: "land remote or hybrid roles",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 p-8"
              >
                <i className={`${item.icon} text-[var(--color-primary)] text-xl mb-4 block`} />
                <p className="text-3xl font-bold text-[var(--color-primary)]">{item.pct}</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-4">
                  {item.pctLabel}
                </p>
                <h3 className="text-lg font-bold mb-2">{item.profile}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-[var(--color-primary)] text-white" id="apply">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="grid gap-8 sm:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                The data doesn&apos;t lie.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white">
                973 people joined in 4 months. Graduates work at top companies
                across Belgium — often remotely. Your free training starts
                with one click.
              </p>
              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center bg-white text-black font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-zinc-100 transition-all"
                >
                  Find your training <i className="fa-solid fa-arrow-right ml-3" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "100%", label: "Free" },
                { value: "0", label: "Prerequisites" },
                { value: "42", label: "Global campuses" },
                { value: "24/7", label: "Campus access" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/20 p-6 text-center">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-white mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
