/**
 * PROPOSITION B — "No Barriers"
 *
 * Design direction: Warm, welcoming, reassuring. Lighter palette.
 * Breaks down objections: "no experience? no problem."
 * Step-by-step approach. FAQ / objection-handling section.
 * More whitespace, softer edges, approachable.
 *
 * Copy angle: "Everyone starts somewhere — we built this for people like you."
 * Key terms used: remote jobs, tech career, IT career change, job opportunities,
 * career switch, work from anywhere.
 * Terms excluded: free course, university degree, master's program.
 *
 * Contrast audit:
 * - White bg: primary-accessible (5.1:1), secondary-accessible (5.5:1), zinc-600 (5.7:1)
 * - Black bg: text-zinc-300 (13:1), primary (8.8:1)
 * - Teal bg: white only
 * - zinc-50 bg: zinc-600 (5.3:1)
 */

import Link from "next/link";

export function ProposalB() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-white text-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-secondary)]/5 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 sm:pb-32 sm:pt-36">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary-accessible)] text-sm font-bold uppercase tracking-wider px-4 py-2 mb-8">
              <i className="fa-solid fa-door-open" />
              Open to everyone
            </div>
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Your tech career starts here.
              <br />
              <span className="text-[var(--color-primary-accessible)]">No experience needed.</span>
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-zinc-600 max-w-2xl mx-auto">
              Thinking about an IT career change? 42 Belgium is a free training
              program designed for people with zero tech background. Learn at your
              own pace. Work from anywhere after.
            </p>
            <div className="mt-10">
              <Link
                href="#apply"
                className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
              >
                Start your tech career <i className="fa-solid fa-arrow-right ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── "WHAT IF I..." OBJECTION BREAKER ─── */}
      <section className="bg-zinc-50 border-y border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-secondary-accessible)] mb-4">
              We get it
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
              You probably have questions
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                question: "\"I have zero tech experience\"",
                answer: "Perfect. 42 was built for exactly this. Most of our students come from completely different fields — retail, hospitality, admin, you name it.",
                icon: "fa-solid fa-seedling",
              },
              {
                question: "\"I can't afford training\"",
                answer: "42 Belgium is 100% free. No tuition fees, no hidden costs. Ever. We believe talent shouldn't depend on your bank account.",
                icon: "fa-solid fa-hand-holding-heart",
              },
              {
                question: "\"I'm too old to start\"",
                answer: "There's no age limit. Career changers in their 30s, 40s, and beyond thrive here. Your life experience is an asset, not a limitation.",
                icon: "fa-solid fa-infinity",
              },
              {
                question: "\"I don't have a degree\"",
                answer: "We don't ask for one. No diploma, no CV, no prerequisites. Just an online test and your motivation.",
                icon: "fa-solid fa-ban",
              },
              {
                question: "\"Will I actually find a job?\"",
                answer: "Our graduates work at companies across Belgium and Europe. Many land remote jobs. The tech industry is hiring — and it values skills over diplomas.",
                icon: "fa-solid fa-briefcase",
              },
              {
                question: "\"I don't know if I'll like coding\"",
                answer: "That's what the Piscine is for — a 4-week immersive trial. No commitment until you're sure. Think of it as a free test drive.",
                icon: "fa-solid fa-flask",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 border border-zinc-200 hover:border-[var(--color-primary)] transition-colors"
              >
                <i className={`${item.icon} text-[var(--color-primary-accessible)] text-xl mb-4 block`} />
                <h3 className="text-base font-bold mb-3 text-black">{item.question}</h3>
                <p className="text-sm leading-relaxed text-zinc-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary-accessible)] mb-4">
              Simple process
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
              Three steps to your new career
            </h2>
          </div>
          <div className="grid gap-12 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Take the online test",
                desc: "A series of logic games — not coding questions. It takes about an hour and reveals your potential, not your past.",
                icon: "fa-solid fa-gamepad",
              },
              {
                step: "2",
                title: "Join the Piscine",
                desc: "4 weeks of immersive, hands-on coding. Discover peer-to-peer learning, find your rhythm, and decide if this path is for you.",
                icon: "fa-solid fa-water",
              },
              {
                step: "3",
                title: "Build your tech career",
                desc: "12-18 months of project-based learning. Graduate with real skills, a portfolio, and access to job opportunities across Belgium.",
                icon: "fa-solid fa-laptop-code",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center bg-[var(--color-primary)] text-white text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <i className={`${item.icon} text-zinc-400 text-2xl mb-4 block`} />
                <h3 className="text-lg font-bold mb-3 text-black">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU'LL LEARN ─── */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              What you&apos;ll gain
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Skills that open doors — to remote jobs and beyond
            </h2>
          </div>
          <div className="grid gap-px bg-zinc-800 sm:grid-cols-2">
            {[
              "Real programming skills through hands-on projects",
              "A portfolio that proves your abilities to employers",
              "The confidence to apply for remote jobs in tech",
              "Peer-to-peer collaboration — like real tech teams",
              "Direct pathways to job opportunities in Belgium",
              "A global network of 42 alumni and partners",
            ].map((outcome, i) => (
              <div key={i} className="bg-black p-6 flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--color-primary)] text-white text-xs font-bold">
                  <i className="fa-solid fa-check text-xs" />
                </span>
                <p className="text-base leading-relaxed text-zinc-300">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="bg-zinc-50 border-t border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: "100%", label: "Free — no tuition" },
              { value: "973", label: "Joined in 4 months" },
              { value: "42", label: "Campuses worldwide" },
              { value: "0", label: "Prerequisites" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-bold text-[var(--color-primary-accessible)]">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-[var(--color-primary)] text-white" id="apply">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <i className="fa-solid fa-heart text-3xl mb-6 block" />
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Everyone starts somewhere.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white max-w-xl mx-auto">
              No tech background? No problem. 42 Belgium was made for career
              changers like you. Take the first step — it&apos;s free, and there&apos;s
              nothing to lose.
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-white text-black font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-zinc-100 transition-all"
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
