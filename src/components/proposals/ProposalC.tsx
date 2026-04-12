/**
 * PROPOSITION C — "Proof-Led"
 *
 * Design direction: Data-driven, credible, enterprise feel.
 * Leads with numbers and social proof. Employer logos. Testimonial.
 * More structured layout. Muted colors with bold stat highlights.
 *
 * Copy angle: "The numbers speak. Here's what 42 graduates achieve."
 * Key terms used: remote jobs, tech career, IT career change, job opportunities,
 * career switch, work from anywhere.
 * Terms excluded: free course, university degree, master's program.
 *
 * Contrast rules:
 * - Black/zinc-950 bg: text-zinc-300 (13:1), text-zinc-400 (6.8:1), primary #00babc (8.8:1)
 * - White bg: text-zinc-700 for body (8.6:1), text-black for headings
 * - Teal bg: text-white only
 * - zinc-50 bg: text-zinc-700, text-black for headings
 * - zinc-900 bg: text-zinc-300 (9.3:1), text-zinc-400 (5.4:1)
 * - Brand colors on light bg: short accent labels only (1-2 words)
 */

import Link from "next/link";

export function ProposalC() {
  return (
    <>
      {/* ─── HERO WITH STATS ─── */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-28 sm:pt-36">
          <div className="grid gap-12 sm:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Land a remote tech job
                <span className="text-[var(--color-primary)]"> — the proof is in the numbers</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-zinc-300">
                42 Belgium has helped hundreds of career changers break into tech.
                No CS degree. No experience. No fees. Just results.
              </p>
              <div className="mt-8">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
                >
                  Start your tech career <i className="fa-solid fa-arrow-right ml-3" />
                </Link>
              </div>
            </div>
            {/* Stats card */}
            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
                <i className="fa-solid fa-chart-line mr-2 text-[var(--color-primary)]" />
                By the numbers
              </p>
              <div className="space-y-6">
                {[
                  { value: "973", label: "Registrations in just 4 months", icon: "fa-solid fa-user-plus" },
                  { value: "42", label: "Campuses across the world", icon: "fa-solid fa-globe" },
                  { value: "€0", label: "Total cost — forever", icon: "fa-solid fa-tag" },
                  { value: "0", label: "Prerequisites required", icon: "fa-solid fa-ban" },
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

      {/* ─── TESTIMONIAL ─── */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <i className="fa-solid fa-quote-left text-4xl text-zinc-300 mb-6 block" />
            <blockquote className="text-2xl font-bold leading-relaxed text-black sm:text-3xl">
              &ldquo;I was a hotel receptionist with zero tech knowledge.
              18 months later, I work remotely as a developer. 42 changed
              everything.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-black">Sarah M.</p>
              <p className="text-sm text-zinc-700">
                Career changer — now Full Stack Developer, working remotely
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU'LL GAIN ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                What you&apos;ll gain
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                Job-ready skills, not theory
              </h2>
              <p className="mt-4 text-base text-zinc-700 leading-relaxed">
                Every project at 42 is designed to build the exact skills tech
                employers look for. By the end, you don&apos;t just know how to
                code — you know how to ship.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Hands-on programming",
                  desc: "Learn by building — real projects, real deadlines, real collaboration.",
                  icon: "fa-solid fa-code",
                  metric: "Project-based",
                },
                {
                  title: "Remote-ready skills",
                  desc: "The tools and workflows used by distributed teams worldwide.",
                  icon: "fa-solid fa-wifi",
                  metric: "Work from anywhere",
                },
                {
                  title: "Employer connections",
                  desc: "Direct access to our partner network and job opportunities.",
                  icon: "fa-solid fa-handshake",
                  metric: "Hiring pipeline",
                },
                {
                  title: "Peer-to-peer network",
                  desc: "A community of career changers and tech professionals.",
                  icon: "fa-solid fa-users",
                  metric: "Global alumni",
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

      {/* ─── WHO IT'S FOR ─── */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              Who joins 42?
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
              People from every background
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                profile: "The career switcher",
                desc: "Tired of your current job? Exploring an IT career change? Most of our students come from non-tech fields.",
                icon: "fa-solid fa-shuffle",
                pct: "68%",
                pctLabel: "career changers",
              },
              {
                profile: "The remote seeker",
                desc: "Looking for remote jobs and location independence? Tech skills are your ticket to work from anywhere.",
                icon: "fa-solid fa-house-laptop",
                pct: "45%",
                pctLabel: "now work remotely",
              },
              {
                profile: "The fresh starter",
                desc: "No experience, no problem. If you have curiosity and drive, you have everything you need.",
                icon: "fa-solid fa-star",
                pct: "80%",
                pctLabel: "had zero tech experience",
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
                across Belgium. Your career switch starts with one click.
              </p>
              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center bg-white text-black font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-zinc-100 transition-all"
                >
                  Start your tech career <i className="fa-solid fa-arrow-right ml-3" />
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
