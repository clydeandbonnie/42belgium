/**
 * PROPOSITION B — Classic angle + Pattern B handler (matrix v3)
 *
 * Design direction: welcoming, reassuring, objection-breaking.
 * Warm palette, centred layout, generous whitespace. The FAQ is the
 * centrepiece — every entry disarms a Pattern B keyword from the matrix
 * (keywords that attracted clicks but produced zero conversions).
 *
 * Copy contract (brief v2):
 *   - Primary Query in H1 (remote jobs / work from home / free online courses).
 *   - CTA "Find your training →" from matrix CTA column.
 *   - Every Pattern B term from matrix v3 is defused explicitly:
 *       "free course" · "online classes for free" · "career quiz" ·
 *       "free online certificate courses" · "cover letter for internship".
 *   - Three H2 sections mirror the three matrix clusters.
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
            <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider px-4 py-2 mb-8">
              <i className="fa-solid fa-door-open" />
              Not a MOOC — structured free training
            </div>
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Free Digital Skills Training.
              <br />
              <span className="text-[var(--color-primary)]">Remote jobs</span> in reach.
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-zinc-700 max-w-2xl mx-auto">
              Looking for remote jobs, free online courses, or online jobs no
              experience? You&apos;re in the right place. 42 Belgium is a free,
              peer-to-peer program — open to career changers with zero
              technical background.
            </p>
            <div className="mt-10">
              <Link
                href="#apply"
                className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
              >
                Find your training <i className="fa-solid fa-arrow-right ml-3" />
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-widest text-zinc-500">
              100% free · No diploma · No CV · Apply in 5 minutes
            </p>
          </div>
        </div>
      </section>

      {/* ─── CLUSTER 1 — FLEXIBILITY & REMOTE WORK ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              Cluster 1 · Flexibility &amp; Remote Work
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
              Work flexibility. Tech skills that travel.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-700">
              Remote jobs, online work, work from home, and online jobs work
              from home — the same desire for flexibility from four different
              angles. 42 Belgium builds the skills that unlock every one of
              them.
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-3">
            {[
              {
                icon: "fa-solid fa-wifi",
                title: "Remote jobs ready",
                desc: "Learn to ship software in distributed teams. Graduate ready for remote jobs across Europe.",
              },
              {
                icon: "fa-solid fa-house-laptop",
                title: "Online work toolkit",
                desc: "Async collaboration, code review, continuous deployment — the actual workflows of online work.",
              },
              {
                icon: "fa-solid fa-map-pin",
                title: "Brussels &amp; Antwerp",
                desc: "Campus 24/7. Come in when you want. Work from home when you don&apos;t. Real flexibility.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center bg-[var(--color-primary)]/10 mb-6">
                  <i className={`${item.icon} text-[var(--color-primary)] text-2xl`} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLUSTER 2 — ACCESSIBLE FREE TRAINING + Pattern B FAQ ─── */}
      <section className="bg-zinc-50 border-y border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
              Cluster 2 · Accessible Free Training
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
              Every question. Answered honestly.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-700">
              These are the questions our keyword data told us you were asking.
              Here are the honest answers — including where 42 Belgium is not
              the right fit.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                question: "\"Is this a free course or just another MOOC?\"",
                answer: "Neither. It's a structured, peer-to-peer program — not a free course you scroll through alone. Physical campus. Real projects. Real feedback. No video-watching marathon.",
                icon: "fa-solid fa-book-open",
              },
              {
                question: "\"I want online classes for free — is this it?\"",
                answer: "If you want video lectures, go to YouTube. If you want online classes free that actually land you a job, that's us. Free online courses with certificates that aren't worth the PDF they're printed on — not us.",
                icon: "fa-solid fa-laptop",
              },
              {
                question: "\"Can you help with a career quiz or orientation?\"",
                answer: "Before committing: yes. Come to an info session. Meet alumni. Take the online logic test. Spend 4 weeks in the Piscine. No career quiz needed — you'll know.",
                icon: "fa-solid fa-compass",
              },
              {
                question: "\"I'm looking for free online certificate courses\"",
                answer: "Then we need to reset expectations. Free online courses with free certificates are everywhere — and employers ignore most of them. We offer a real, verified skill set and a portfolio. That's what hires.",
                icon: "fa-solid fa-award",
              },
              {
                question: "\"Can you help with my cover letter for an internship?\"",
                answer: "Honestly, no — that's not our job. We train you to build software and ship projects, which means you won't need an internship cover letter in six months. You'll have a portfolio.",
                icon: "fa-solid fa-file-lines",
              },
              {
                question: "\"Online jobs with no experience — really?\"",
                answer: "Yes. Most of our students arrive with zero tech background. Our selection test measures potential, not past. No experience required means no experience required.",
                icon: "fa-solid fa-seedling",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 border border-zinc-200 hover:border-[var(--color-primary)] transition-colors"
              >
                <i className={`${item.icon} text-[var(--color-primary)] text-xl mb-4 block`} />
                <h3 className="text-base font-bold mb-3 text-black">{item.question}</h3>
                <p className="text-sm leading-relaxed text-zinc-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLUSTER 3 — LOW BARRIER TO ENTRY ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              Cluster 3 · Low Barrier to Entry
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
              Three steps to your new career
            </h2>
          </div>
          <div className="grid gap-12 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Online logic test",
                desc: "A series of logic games — not coding questions. Takes about an hour. Reveals your potential, not your past.",
                icon: "fa-solid fa-gamepad",
              },
              {
                step: "2",
                title: "The Piscine",
                desc: "4 weeks of immersive, hands-on coding. Discover peer-to-peer learning. Decide if this path is for you.",
                icon: "fa-solid fa-water",
              },
              {
                step: "3",
                title: "Career change",
                desc: "12–18 months of project-based learning. Graduate with skills for online jobs no experience ever needed before.",
                icon: "fa-solid fa-laptop-code",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center bg-[var(--color-primary)] text-white text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <i className={`${item.icon} text-zinc-400 text-2xl mb-4 block`} />
                <h3 className="text-lg font-bold mb-3 text-black">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-700">{item.desc}</p>
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
                <p className="text-4xl font-bold text-black">{stat.value}</p>
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
              Ready to find your training?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white max-w-xl mx-auto">
              Free structured training. Real remote job opportunities. No
              degree, no CV, no experience required. Start with our online
              test.
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-white text-black font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-zinc-100 transition-all"
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
