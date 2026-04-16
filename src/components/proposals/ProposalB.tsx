/**
 * PROPOSITION B — Classic / Welcoming design variant
 *
 * Reads the SAME canonical content as Proposals A and C. Design signatures:
 *   - Light dominant palette (white + soft gradient tints)
 *   - Centered layouts, generous whitespace, approachable rhythm
 *   - Cards with soft borders, rounded accents
 *   - FAQ treated as the VISUAL centerpiece — larger, prominent, inviting
 *   - Horizontal timeline for process (less imposing than the left-bar variant)
 */

import Link from "next/link";
import type { PageContent } from "@/lib/i18n";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { TimelineAccordion } from "./TimelineAccordion";

export function ProposalB({ content }: { content: PageContent }) {
  const { hero, clusters, afterForty, whatYouBuild, realStories, howToApply, faq, stats, ctaFinal } = content;

  return (
    <>
      {/* ─── HERO — black bg, centered, welcoming glow ─── */}
      <section className="relative bg-black text-white overflow-hidden">
        {/* Soft radial glow, anchored centre, evokes openness */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,186,188,0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(237,52,145,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 sm:pb-32 sm:pt-36">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider px-4 py-2 mb-8">
              <i className="fa-solid fa-door-open" />
              Free structured training
            </div>
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              {hero.headline.split("\n").map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-zinc-300 max-w-2xl mx-auto">
              {hero.subheadline}
            </p>
            <div className="mt-10">
              <Link
                href="https://admission.42belgium.be/users/sign_up"
                className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
              >
                {hero.cta}
              </Link>
            </div>
            {hero.reassurance && (
              <p className="mt-6 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {hero.reassurance}
              </p>
            )}
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent" />
      </section>

      {/* ─── CLUSTERS ─── */}
      {clusters.map((cluster, i) => (
        <section key={cluster.name} className={i % 2 === 0 ? "bg-white" : "bg-zinc-50 border-y border-zinc-200"}>
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
                {cluster.name}
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                {cluster.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-700">
                {cluster.body}
              </p>
              {cluster.subheading && (
                <h3 className="mt-8 text-xl font-bold tracking-tight text-black">
                  {cluster.subheading}
                </h3>
              )}
              {cluster.bodyPart2 && (
                <p className="mt-4 text-base leading-relaxed text-zinc-700">
                  {cluster.bodyPart2}
                </p>
              )}
            </div>

            {/* Comparison block — two facing cards with centered VS badge */}
            {cluster.comparison && (
              <div className="relative max-w-4xl mx-auto">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* LEFT — MOOC */}
                  <div className="bg-white border border-zinc-300 p-8">
                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-zinc-200">
                      <span className="flex h-10 w-10 items-center justify-center bg-zinc-100 text-zinc-500">
                        <i className="fa-solid fa-xmark text-lg" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          Elsewhere
                        </p>
                        <p className="text-sm font-bold text-zinc-700">
                          {cluster.comparison.leftLabel}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {cluster.comparison.rows.map((row, ri) => (
                        <li key={ri} className="flex gap-3 text-sm text-zinc-500">
                          <i className="fa-solid fa-minus text-zinc-400 mt-1" />
                          <span>{row.left}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* RIGHT — 42 */}
                  <div className="bg-white border-2 border-[var(--color-primary)] p-8 relative">
                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-zinc-200">
                      <span className="flex h-10 w-10 items-center justify-center bg-[var(--color-primary)] text-white">
                        <i className="fa-solid fa-check text-lg" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                          Here at
                        </p>
                        <p className="text-sm font-bold text-black">
                          {cluster.comparison.rightLabel}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {cluster.comparison.rows.map((row, ri) => (
                        <li key={ri} className="flex gap-3 text-sm text-zinc-900 font-semibold">
                          <i className="fa-solid fa-circle-check text-[var(--color-primary)] mt-0.5" />
                          <span>{row.right}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Centered VS badge */}
                <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="flex h-14 w-14 items-center justify-center bg-black text-white text-sm font-bold tracking-wider rounded-full shadow-lg">
                    VS
                  </span>
                </div>
              </div>
            )}

            {cluster.bullets && cluster.bullets.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
                {cluster.bullets.map((bullet, bi) => (
                  <div key={bi} className="bg-white p-5 border border-zinc-200 flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      <i className="fa-solid fa-check" />
                    </span>
                    <p className="text-sm leading-relaxed text-zinc-800">{bullet}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ─── AFTER 42 ─── */}
      {afterForty && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                The outcome
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                {afterForty.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-700">
                {afterForty.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
              {afterForty.careers.map((career) => (
                <div
                  key={career.label}
                  className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 border border-zinc-200 p-6 text-center hover:border-[var(--color-primary)] transition-colors"
                >
                  <i className={`${career.icon} text-[var(--color-primary)] text-2xl mb-3 block`} />
                  <p className="text-sm font-bold text-black">{career.label}</p>
                </div>
              ))}
            </div>
            {afterForty.communityNote && (
              <p className="mt-10 text-center text-base text-zinc-600 italic leading-relaxed max-w-2xl mx-auto">
                {afterForty.communityNote}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── WHAT YOU'LL BUILD — timeline accordion ─── */}
      {whatYouBuild && whatYouBuild.phases && (
        <section className="bg-zinc-50 border-y border-zinc-200">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                The program
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                {whatYouBuild.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-700">
                {whatYouBuild.intro}
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <TimelineAccordion phases={whatYouBuild.phases} />
            </div>
            {whatYouBuild.plusNote && (
              <p className="mt-8 text-center text-sm text-zinc-600 italic leading-relaxed max-w-2xl mx-auto">
                {whatYouBuild.plusNote}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── REAL STORIES ─── */}
      {realStories && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
                Real students
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                {realStories.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-700">
                {realStories.description}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {realStories.videos.map((video) => (
                <div key={video.youtubeId} className="bg-white border border-zinc-200 overflow-hidden">
                  <YouTubeEmbed youtubeId={video.youtubeId} title={`${video.name} — ${video.subtitle}`} />
                  <div className="p-4 text-center">
                    <p className="text-base font-bold text-black">{video.name}</p>
                    <p className="text-xs text-zinc-600">{video.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW TO APPLY ─── horizontal timeline */}
      {howToApply && (
        <section className="bg-zinc-50 border-y border-zinc-200" id="apply">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                The path
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                {howToApply.heading}
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-4">
              {howToApply.steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center bg-[var(--color-primary)] text-white text-2xl font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-base font-bold mb-3 text-black">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-700">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="https://admission.42belgium.be/users/sign_up"
                className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
              >
                {howToApply.ctaLabel}
              </Link>
              {howToApply.microcopy && (
                <p className="mt-4 text-sm text-zinc-600">{howToApply.microcopy}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ — visual centerpiece ─── */}
      {faq && faq.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
                Every question
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                Answered honestly.
              </h2>
            </div>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-50 border border-zinc-200 p-8 hover:border-[var(--color-primary)] transition-colors"
                >
                  <h3 className="text-lg font-bold mb-3 text-black">
                    <i className="fa-solid fa-circle-question text-[var(--color-primary)] mr-3" />
                    {item.question}
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-700 pl-7">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── STATS BAR ─── */}
      {stats && stats.length > 0 && (
        <section className="bg-zinc-50 border-t border-zinc-200">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
              {stats.map((stat, i) => (
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
      )}

      {/* ─── FINAL CTA — gradient warm ─── */}
      {ctaFinal && (
        <section className="bg-gradient-to-r from-[var(--color-primary)] to-[#7D8EE9] text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <i className="fa-solid fa-heart text-3xl mb-6 block" />
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {ctaFinal.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white max-w-xl mx-auto">
                {ctaFinal.description}
              </p>
              <div className="mt-10">
                <Link
                  href="https://admission.42belgium.be/users/sign_up"
                  className="inline-flex items-center justify-center bg-white text-black font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-zinc-100 transition-all"
                >
                  {ctaFinal.cta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
