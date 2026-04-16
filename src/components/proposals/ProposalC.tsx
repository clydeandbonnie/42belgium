/**
 * PROPOSITION C — Proof-Led / Data design variant
 *
 * Reads the SAME canonical content as Proposals A and B. Design signatures:
 *   - Data-driven visual language, but with PUBLIC stats only
 *     (employment, registrations, campuses, curriculum counts, employer logos)
 *   - Split hero: narrative left, credibility card right
 *   - Employer logo strip for instant trust
 *   - Each section uses numeric framing without ad-campaign data
 *   - Enterprise/credible feel — muted palette with bold stat highlights
 *
 * Explicitly NOT used: internal Ads metrics (CTR, CVR, impression share,
 * keyword converting rates). Those stay in the matrix v3, not on the page.
 */

import Link from "next/link";
import type { PageContent } from "@/lib/i18n";
import { YouTubeEmbed } from "./YouTubeEmbed";

export function ProposalC({ content }: { content: PageContent }) {
  const { hero, clusters, afterForty, whatYouBuild, realStories, howToApply, faq, stats, ctaFinal } = content;

  return (
    <>
      {/* ─── HERO + credibility card ─── */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-28 sm:pt-36">
          <div className="grid gap-12 sm:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-6">
                <i className="fa-solid fa-shield-halved mr-2" />
                Proven program. Real outcomes.
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {hero.headline.split("\n").map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{line}</span>
                ))}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-zinc-300">
                {hero.subheadline}
              </p>
              <div className="mt-8">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
                >
                  {hero.cta}
                </Link>
              </div>
              {hero.reassurance && (
                <p className="mt-6 text-xs uppercase tracking-widest text-zinc-500">
                  {hero.reassurance}
                </p>
              )}
            </div>
            {/* Credibility card — public, prospect-relevant stats */}
            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
                <i className="fa-solid fa-award mr-2 text-[var(--color-primary)]" />
                By the numbers
              </p>
              <div className="space-y-6">
                {[
                  { value: "98%", label: "of advanced grads secure a job" },
                  { value: "100%", label: "free — no tuition, ever" },
                  { value: "42", label: "campuses across the world" },
                  { value: "0", label: "prerequisites — no degree, no CV" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <p className="text-3xl font-bold text-[var(--color-primary)] w-24">
                      {stat.value}
                    </p>
                    <p className="text-xs text-zinc-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mt-12" />
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-8">
            42 Belgium graduates work at
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 items-center">
            {["Belfius", "Deloitte", "Proximus", "Euroclear", "DPG Media", "Securex"].map((name) => (
              <div key={name} className="text-center">
                <p className="text-sm font-bold text-zinc-400">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLUSTERS — clean two-column with numbered accent ─── */}
      {clusters.map((cluster, i) => (
        <section key={cluster.name} className="bg-white border-b border-zinc-200">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="grid gap-12 sm:grid-cols-[auto_1fr] items-start">
              <div className="sm:pr-6 sm:border-r sm:border-zinc-200 sm:w-32">
                <p className="text-6xl font-bold text-[var(--color-primary)] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  {cluster.name}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black max-w-3xl">
                  {cluster.heading}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-zinc-700 max-w-3xl">
                  {cluster.body}
                </p>

                {/* Comparison block — spec sheet / data table */}
                {cluster.comparison && (
                  <div className="mt-10 border border-zinc-300 overflow-hidden">
                    {/* Column headers */}
                    <div className="grid grid-cols-[160px_1fr_1fr] bg-zinc-50 border-b border-zinc-300">
                      <div className="p-4 border-r border-zinc-300">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          Criterion
                        </p>
                      </div>
                      <div className="p-4 border-r border-zinc-300">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
                          <i className="fa-solid fa-xmark mr-2" />
                          Elsewhere
                        </p>
                        <p className="text-sm font-bold text-zinc-700">
                          {cluster.comparison.leftLabel}
                        </p>
                      </div>
                      <div className="p-4 bg-[var(--color-primary)]/5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-1">
                          <i className="fa-solid fa-check mr-2" />
                          Here at
                        </p>
                        <p className="text-sm font-bold text-black">
                          {cluster.comparison.rightLabel}
                        </p>
                      </div>
                    </div>
                    {/* Rows */}
                    {cluster.comparison.rows.map((row, ri) => {
                      const criteria = [
                        "Structure",
                        "Certification",
                        "Feedback",
                        "Support",
                        "Retention",
                      ];
                      return (
                        <div
                          key={ri}
                          className={`grid grid-cols-[160px_1fr_1fr] ${ri !== cluster.comparison!.rows.length - 1 ? "border-b border-zinc-200" : ""}`}
                        >
                          <div className="p-4 bg-zinc-50 border-r border-zinc-200 flex items-center">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                              {criteria[ri] || `Criterion ${ri + 1}`}
                            </p>
                          </div>
                          <div className="p-4 border-r border-zinc-200 text-sm text-zinc-500 flex items-start gap-3">
                            <i className="fa-solid fa-xmark text-red-500/70 mt-1 text-xs" />
                            <span className="line-through decoration-zinc-400">{row.left}</span>
                          </div>
                          <div className="p-4 bg-[var(--color-primary)]/5 text-sm text-black font-semibold flex items-start gap-3">
                            <i className="fa-solid fa-check text-[var(--color-primary)] mt-1 text-xs" />
                            <span>{row.right}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {cluster.bullets && cluster.bullets.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {cluster.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-3 text-sm text-zinc-800">
                        <i className="fa-solid fa-chevron-right text-[var(--color-primary)] mt-1 text-xs" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── AFTER 42 — stat hero ─── */}
      {afterForty && (
        <section className="bg-zinc-950 text-white">
          <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
            <div className="grid gap-12 sm:grid-cols-2 items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                  The outcome
                </p>
                <p className="text-8xl font-bold text-[var(--color-primary)] leading-none">
                  {afterForty.stat.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-wider text-zinc-400">
                  {afterForty.stat.label}
                </p>
                <h2 className="mt-10 text-3xl font-bold tracking-tight sm:text-4xl">
                  {afterForty.heading}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-zinc-300">
                  {afterForty.description}
                </p>
              </div>
              <div className="grid gap-px bg-zinc-800">
                {afterForty.careers.map((career) => (
                  <div key={career.label} className="bg-zinc-950 p-4 flex items-center gap-4">
                    <i className={`${career.icon} text-[var(--color-primary)] text-lg w-6`} />
                    <span className="text-sm">{career.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {afterForty.communityNote && (
              <p className="mt-12 text-sm text-zinc-500 italic leading-relaxed max-w-3xl">
                {afterForty.communityNote}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── WHAT YOU'LL BUILD — grid with counts ─── */}
      {whatYouBuild && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              The means
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black max-w-3xl">
              {whatYouBuild.heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-700 max-w-3xl">
              {whatYouBuild.intro}
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {/* Core */}
              <div className="border border-zinc-200 p-8">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                      Phase 1
                    </p>
                    <h3 className="text-lg font-bold text-black mt-1">
                      {whatYouBuild.coreLabel}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-black">{whatYouBuild.coreTopics.length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">topics</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-700 mb-5">{whatYouBuild.coreBlurb}</p>
                <ul className="grid gap-2">
                  {whatYouBuild.coreTopics.map((topic) => (
                    <li key={topic} className="flex gap-3 text-sm">
                      <i className="fa-solid fa-check text-[var(--color-primary)] mt-1 text-xs" />
                      <span className="text-zinc-800">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Advanced */}
              <div className="border border-zinc-200 p-8">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                      Phase 3
                    </p>
                    <h3 className="text-lg font-bold text-black mt-1">
                      {whatYouBuild.advancedLabel}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-black">{whatYouBuild.advancedTracks.length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">tracks</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-700 mb-5">{whatYouBuild.advancedBlurb}</p>
                <ul className="grid gap-3">
                  {whatYouBuild.advancedTracks.map((track) => (
                    <li key={track} className="flex gap-3">
                      <i className="fa-solid fa-diamond text-[var(--color-primary)] mt-1.5 text-xs" />
                      <span className="text-sm text-zinc-900 font-semibold">{track}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {whatYouBuild.plusNote && (
              <p className="mt-8 text-sm text-zinc-600 italic leading-relaxed max-w-3xl">
                {whatYouBuild.plusNote}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── REAL STORIES ─── */}
      {realStories && (
        <section className="bg-zinc-50 border-y border-zinc-200">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
              Real students
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black max-w-3xl">
              {realStories.heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-700 max-w-3xl">
              {realStories.description}
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {realStories.videos.map((video) => (
                <div key={video.youtubeId} className="bg-white border border-zinc-200">
                  <YouTubeEmbed youtubeId={video.youtubeId} title={`${video.name} — ${video.subtitle}`} />
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-black">{video.name}</p>
                      <p className="text-xs text-zinc-600">{video.subtitle}</p>
                    </div>
                    <i className="fa-solid fa-play text-[var(--color-primary)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW TO APPLY — grid with numbers ─── */}
      {howToApply && (
        <section className="bg-white" id="apply">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              The path
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black max-w-3xl">
              {howToApply.heading}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {howToApply.steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-zinc-50 border border-zinc-200 p-8 hover:border-[var(--color-primary)] transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-5xl font-bold text-[var(--color-primary)] leading-none">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-black">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-700">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-950 text-white p-8">
              <div>
                <p className="text-lg font-bold">Ready to start?</p>
                {howToApply.microcopy && (
                  <p className="text-sm text-zinc-400 mt-1">{howToApply.microcopy}</p>
                )}
              </div>
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all shrink-0"
              >
                {howToApply.ctaLabel}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ — dense 2-col ─── */}
      {faq && faq.length > 0 && (
        <section className="bg-zinc-50 border-y border-zinc-200">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
              Every question
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black mb-12">
              Answered honestly.
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {faq.map((item, i) => (
                <div key={i} className="bg-white border border-zinc-200 p-6">
                  <h3 className="text-sm font-bold mb-2 text-black">{item.question}</h3>
                  <p className="text-sm leading-relaxed text-zinc-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── STATS BAR ─── */}
      {stats && stats.length > 0 && (
        <section className="bg-white border-t border-zinc-200">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={i} className="border-l-4 border-[var(--color-primary)] pl-4">
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

      {/* ─── FINAL CTA — with mini-stats ─── */}
      {ctaFinal && (
        <section className="bg-[var(--color-primary)] text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="grid gap-8 sm:grid-cols-2 items-center">
              <div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {ctaFinal.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white">
                  {ctaFinal.description}
                </p>
                <div className="mt-8">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center bg-white text-black font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-zinc-100 transition-all"
                  >
                    {ctaFinal.cta}
                  </Link>
                </div>
              </div>
              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white/15 p-6 text-center">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs uppercase tracking-wider text-white mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
