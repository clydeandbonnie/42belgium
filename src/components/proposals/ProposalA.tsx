/**
 * PROPOSITION A — "Career Outcome"
 *
 * Design direction: Bold, ambitious, transformation-focused.
 * Leads with the career result (remote tech job), training comes second.
 * Dark, high-contrast palette. Large typography. Stat-heavy.
 *
 * Copy angle: "You will land a remote tech job" — not "you will learn to code".
 * Key terms used: remote jobs, tech career, IT career change, job opportunities,
 * career switch, work from anywhere.
 * Terms excluded: free course, university degree, master's program.
 *
 * Contrast rules:
 * - Black bg: text-zinc-300 (13:1), text-zinc-400 (6.8:1), primary #00babc (8.8:1)
 * - White bg: text-zinc-600 (5.7:1), text-black for body/headings
 * - Teal bg: text-white only (4.6:1 large text)
 * - zinc-100 bg: text-zinc-700 (7.2:1), text-black for headings
 * - Brand colors on light bg: only for short accent labels (1-2 words), not body text
 */

import Link from "next/link";

export function ProposalA() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 sm:pb-32 sm:pt-36">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-6">
            <i className="fa-solid fa-rocket mr-2" />
            Your career starts here
          </p>
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl max-w-4xl">
            Land a remote tech job
            <span className="text-[var(--color-primary)]"> — no CS degree required</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-zinc-300 max-w-2xl">
            Career changers and job seekers: 42 Belgium&apos;s free, peer-to-peer
            program gives you the skills to break into tech and work from anywhere.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="#apply"
              className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
            >
              Start your tech career <i className="fa-solid fa-arrow-right ml-3" />
            </Link>
            <Link
              href="#learn"
              className="inline-flex items-center justify-center border-2 border-zinc-400 text-zinc-300 font-bold uppercase tracking-wider px-10 py-4 text-base hover:border-white hover:text-white transition-all"
            >
              See what you&apos;ll gain
            </Link>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-zinc-950 text-white border-b border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: "100%", label: "Free — zero tuition", icon: "fa-solid fa-gift" },
              { value: "973", label: "Registrations in 4 months", icon: "fa-solid fa-users" },
              { value: "42", label: "Campuses worldwide", icon: "fa-solid fa-globe" },
              { value: "24/7", label: "Campus access", icon: "fa-solid fa-clock" },
            ].map((stat, i) => (
              <div key={i}>
                <i className={`${stat.icon} text-[var(--color-primary)] text-lg mb-3 block`} />
                <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU'LL GAIN ─── */}
      <section className="bg-white text-black" id="learn">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
            Skills that get you hired
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-2xl">
            From career switch to job-ready — here&apos;s what you&apos;ll gain
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "fa-solid fa-laptop-code",
                title: "Real programming skills",
                desc: "Learn by building real projects — not watching lectures. Hands-on from day one.",
              },
              {
                icon: "fa-solid fa-briefcase",
                title: "A job-ready portfolio",
                desc: "Graduate with proof of your abilities that employers actually want to see.",
              },
              {
                icon: "fa-solid fa-wifi",
                title: "Remote job opportunities",
                desc: "Gain the skills that unlock remote jobs across Belgium and Europe. Work from anywhere.",
              },
              {
                icon: "fa-solid fa-people-group",
                title: "Team collaboration",
                desc: "Peer-to-peer learning mirrors real tech teams. Collaborate, review, ship together.",
              },
              {
                icon: "fa-solid fa-route",
                title: "A clear career path",
                desc: "Go from career switch decision to your first tech role. We connect you with job opportunities.",
              },
              {
                icon: "fa-solid fa-graduation-cap",
                title: "Industry recognition",
                desc: "42's network is trusted by top employers. Your training carries weight in the IT job market.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group border border-zinc-200 p-6 hover:border-[var(--color-primary)] transition-colors"
              >
                <i className={`${item.icon} text-2xl text-[var(--color-primary)] mb-4 block`} />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─── */}
      <section className="bg-zinc-100">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 sm:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
                Is this for you?
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                You don&apos;t need a tech background. Just the drive to change.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-zinc-700">
                You&apos;re considering an IT career change but have zero coding
                experience. Maybe you&apos;re exploring remote jobs, or you&apos;re
                ready for a complete career switch. Whatever brought you here — this
                program meets you where you are.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: "fa-solid fa-check", text: "No technical background needed" },
                { icon: "fa-solid fa-check", text: "No age limit — adult learners welcome" },
                { icon: "fa-solid fa-check", text: "Completely free — no hidden costs" },
                { icon: "fa-solid fa-check", text: "Career changers from any field" },
                { icon: "fa-solid fa-check", text: "Looking for remote job opportunities" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white p-4 border border-zinc-200"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--color-primary)] text-white">
                    <i className={item.icon} />
                  </span>
                  <p className="font-bold text-sm text-black">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── JOURNEY ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
            Your path
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
            From here to your first tech job
          </h2>
          <div className="grid gap-0 sm:grid-cols-4">
            {[
              { step: "01", title: "Apply", desc: "Take the online test. No CV, no diploma required.", icon: "fa-solid fa-pen-to-square" },
              { step: "02", title: "Piscine", desc: "4-week immersive selection — discover if coding is for you.", icon: "fa-solid fa-water" },
              { step: "03", title: "Learn", desc: "12-18 months of hands-on, peer-to-peer projects at your pace.", icon: "fa-solid fa-code" },
              { step: "04", title: "Launch", desc: "Graduate job-ready. Access our employer network and land your role.", icon: "fa-solid fa-rocket" },
            ].map((item, i) => (
              <div key={i} className="relative p-6 border-l-2 border-[var(--color-primary)] sm:border-l-0 sm:border-t-2">
                <span className="text-4xl font-bold text-zinc-300">{item.step}</span>
                <i className={`${item.icon} text-[var(--color-primary)] text-lg mt-2 block`} />
                <h3 className="text-lg font-bold mt-2">{item.title}</h3>
                <p className="text-sm text-zinc-700 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-[var(--color-primary)] text-white" id="apply">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to start your tech career?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white">
              Join thousands of career changers who found new job opportunities
              through 42 Belgium. No degree required. No fees. Just your determination.
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="inline-flex items-center justify-center border-2 border-white text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-white hover:text-black transition-all"
              >
                Start your tech career <i className="fa-solid fa-arrow-right ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
