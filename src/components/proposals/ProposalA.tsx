/**
 * PROPOSITION A — "Bold / Story" angle (matrix v3 LP Angle Bold)
 *
 * Design direction: ambitious, transformation-focused, dark & high-contrast.
 * The visitor is invited on a narrative journey: from stuck to shipping.
 *
 * Copy contract (brief v2):
 *   - Primary Query (remote jobs / work from home / free online courses)
 *     appears in the H1, first 100 words, and meta title.
 *   - CTA text reused verbatim from matrix: "Find your training →".
 *   - Pattern B "free course" defused with "not a MOOC" signal in hero.
 *   - Three H2 sections mirror the three matrix clusters in order:
 *       FLEXIBILITY & REMOTE WORK → ACCESSIBLE FREE TRAINING → LOW BARRIER.
 *   - All ten ✓ converting keywords distributed across the page body.
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
            Free structured training — not a MOOC
          </p>
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl max-w-4xl">
            Free Digital Skills Training
            <span className="text-[var(--color-primary)]"> — Get a Remote Tech Job</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-zinc-300 max-w-2xl">
            Remote jobs, online work, work from home — the modern labour market
            rewards those who ship. 42 Belgium builds the skills that take you
            there. No degree. No fees.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="#apply"
              className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
            >
              Find your training <i className="fa-solid fa-arrow-right ml-3" />
            </Link>
            <Link
              href="#flexibility"
              className="inline-flex items-center justify-center border-2 border-zinc-400 text-zinc-300 font-bold uppercase tracking-wider px-10 py-4 text-base hover:border-white hover:text-white transition-all"
            >
              See what you&apos;ll build
            </Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-widest text-zinc-500">
            No fees · No degree required · No experience required · Brussels &amp; Antwerp
          </p>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-zinc-950 text-white border-b border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: "100%", label: "Free — no tuition", icon: "fa-solid fa-gift" },
              { value: "973", label: "Registrations in 4 months", icon: "fa-solid fa-users" },
              { value: "42", label: "Campuses worldwide", icon: "fa-solid fa-globe" },
              { value: "0", label: "Prerequisites", icon: "fa-solid fa-ban" },
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

      {/* ─── CLUSTER 1 — FLEXIBILITY & REMOTE WORK ─── */}
      <section className="bg-white text-black" id="flexibility">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
            Cluster 1 · Flexibility &amp; Remote Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-2xl">
            Work flexibility. Tech skills that travel.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-700 max-w-3xl">
            Remote jobs are the dominant reason people start learning tech —
            and the data proves it. 42 Belgium builds the exact skills that
            unlock remote jobs, online work, and work from home roles across
            Europe. You learn the tools distributed engineering teams actually
            use: version control, pair programming, code review, continuous
            deployment.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "fa-solid fa-wifi",
                title: "Remote jobs ready",
                desc: "Graduate with a portfolio you can review from anywhere. Apply for remote jobs with confidence.",
              },
              {
                icon: "fa-solid fa-briefcase",
                title: "Online work toolkit",
                desc: "The exact workflows used by distributed teams — async collab, code review, shipping in parallel.",
              },
              {
                icon: "fa-solid fa-house-laptop",
                title: "Work from home life",
                desc: "Online jobs work from home roles are the outcome, not a wishful extra. Build the skills that make it real.",
              },
              {
                icon: "fa-solid fa-people-group",
                title: "Peer-to-peer teams",
                desc: "Team collaboration mirrors real tech teams. Ship together, review together, grow together.",
              },
              {
                icon: "fa-solid fa-route",
                title: "Pathway to hiring",
                desc: "Direct links to tech employers hiring for remote and hybrid roles across Belgium and Europe.",
              },
              {
                icon: "fa-solid fa-graduation-cap",
                title: "Real recognition",
                desc: "42's network is trusted by top employers — your training carries weight in the IT job market.",
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

      {/* ─── CLUSTER 2 — ACCESSIBLE FREE TRAINING (Pattern B defuser) ─── */}
      <section className="bg-zinc-100">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
            Cluster 2 · Accessible Free Training
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-3xl text-black">
            Free structured training — not a MOOC.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-700 max-w-3xl">
            Let us be blunt. This is not a free online course you scroll
            through at midnight and forget by morning. Unlike free online
            courses or online classes free that everybody starts and nobody
            finishes, 42 Belgium is a complete peer-to-peer program with
            physical campuses, shared projects, and real feedback.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {/* Comparison card — MOOC */}
            <div className="border border-zinc-300 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                <i className="fa-solid fa-xmark mr-2" />
                A typical MOOC or free online course
              </p>
              <ul className="space-y-3 text-sm text-zinc-700">
                <li className="flex gap-3">
                  <i className="fa-solid fa-circle-minus text-zinc-400 mt-1" />
                  You start alone. You finish alone.
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-circle-minus text-zinc-400 mt-1" />
                  A PDF certificate nobody checks
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-circle-minus text-zinc-400 mt-1" />
                  No feedback on your code
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-circle-minus text-zinc-400 mt-1" />
                  Stuck the first time you hit a bug
                </li>
              </ul>
            </div>

            {/* Comparison card — 42 */}
            <div className="border-2 border-[var(--color-primary)] bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-4">
                <i className="fa-solid fa-check mr-2" />
                42 Belgium
              </p>
              <ul className="space-y-3 text-sm text-zinc-900 font-semibold">
                <li className="flex gap-3">
                  <i className="fa-solid fa-check text-[var(--color-primary)] mt-1" />
                  Peer-to-peer learning, real teams
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check text-[var(--color-primary)] mt-1" />
                  Portfolio of shipped projects
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check text-[var(--color-primary)] mt-1" />
                  Campus open 24/7 in Brussels &amp; Antwerp
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check text-[var(--color-primary)] mt-1" />
                  100% free, fully funded, no strings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLUSTER 3 — LOW BARRIER TO ENTRY ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
            Cluster 3 · Low Barrier to Entry
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
            No CV. No degree. No experience required.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-700 max-w-3xl">
            If you&apos;ve searched for online jobs no experience, you know the
            problem. Every entry-level role asks for two years of experience.
            42 Belgium is the bridge. We welcome career changers from every
            possible background — retail, hospitality, teaching, admin — with
            real motivation to build a new path.
          </p>

          <div className="mt-12 grid gap-0 sm:grid-cols-4">
            {[
              { step: "01", title: "Apply", desc: "Take the online logic test. No CV, no diploma required.", icon: "fa-solid fa-pen-to-square" },
              { step: "02", title: "Piscine", desc: "4 immersive weeks. Discover if coding is for you.", icon: "fa-solid fa-water" },
              { step: "03", title: "Learn", desc: "12–18 months of hands-on, peer-to-peer projects.", icon: "fa-solid fa-code" },
              { step: "04", title: "Launch", desc: "Graduate job-ready. Hit the remote job market.", icon: "fa-solid fa-rocket" },
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
              Ready to find your training?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white">
              Free structured training. Real remote job opportunities. No
              degree required. No MOOC. Start with our online test — no
              experience needed.
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="inline-flex items-center justify-center border-2 border-white text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-white hover:text-black transition-all"
              >
                Find your training <i className="fa-solid fa-arrow-right ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
