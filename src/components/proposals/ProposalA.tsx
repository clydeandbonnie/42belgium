/**
 * PROPOSITION A — Bold / Story design variant
 *
 * Reads the SAME canonical content as Proposals B and C — only the design
 * differs. Design signatures of this variant:
 *   - Dark dominant palette (black + teal accent)
 *   - Large, confident typography (7xl hero)
 *   - Numbered section markers ("01 / 02 / 03") creating a narrative flow
 *   - Alternating sections (black → white → zinc-100) for visual rhythm
 *   - Story-first: 98% stat hero, MOOC comparison as visual moment
 */

import Link from "next/link";
import Image from "next/image";
import type { PageContent } from "@/lib/i18n";
import { YouTubeEmbed } from "./YouTubeEmbed";

export function ProposalA({ content }: { content: PageContent }) {
  const { hero, clusters, afterForty, whatYouBuild, realStories, howToApply, faq, stats, ctaFinal } = content;

  return (
    <>
      {/* ─── HERO — text left, image right (full section height) ─── */}
      <section className="relative bg-black text-white overflow-hidden">
        {/* Image — absolute, pinned to right half, full section height */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 hidden sm:block">
          <Image
            src="/assets/gallery/42Belgium-Antwerp3.png"
            alt="Students coding at 42 Belgium Antwerp campus"
            fill
            className="object-cover object-center"
            priority
            quality={85}
          />
        </div>
        {/* Text — left half, padded */}
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-24">
          <div className="sm:w-1/2 sm:pr-12">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-6">
              <i className="fa-solid fa-rocket mr-2" />
              Free structured training
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {hero.headline.split("\n").map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-zinc-300 max-w-lg">
              {hero.subheadline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="#apply"
                className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
              >
                {hero.cta}
              </Link>
              <Link
                href="#after"
                className="inline-flex items-center justify-center border-2 border-zinc-400 text-zinc-300 font-bold uppercase tracking-wider px-10 py-4 text-base hover:border-white hover:text-white transition-all"
              >
                See the outcomes
              </Link>
            </div>
            {hero.reassurance && (
              <p className="mt-6 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {hero.reassurance}
              </p>
            )}
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
      </section>

      {/* ─── CLUSTERS ─── */}
      {clusters.map((cluster, i) => {
        const isEven = i % 2 === 0;
        const bgClass = isEven ? "bg-white text-black" : "bg-zinc-100 text-black";
        return (
          <section key={cluster.name} className={bgClass}>
            <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                {String(i + 1).padStart(2, "0")} · {cluster.name}
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-3xl">
                {cluster.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-zinc-700 max-w-3xl">
                {cluster.body}
              </p>

              {/* Comparison block — versus table, dark dramatic */}
              {cluster.comparison && (
                <div className="mt-12 bg-black text-white overflow-hidden">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-stretch">
                    <div className="p-6 bg-zinc-900 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">
                        <i className="fa-solid fa-xmark mr-2" />
                        Them
                      </p>
                      <p className="text-sm font-bold text-zinc-400">{cluster.comparison.leftLabel}</p>
                    </div>
                    <div className="flex items-center justify-center bg-black px-4">
                      <span className="text-2xl font-bold text-[var(--color-secondary)]">VS</span>
                    </div>
                    <div className="p-6 bg-[var(--color-primary)] text-white text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-2">
                        <i className="fa-solid fa-check mr-2" />
                        Us
                      </p>
                      <p className="text-sm font-bold">{cluster.comparison.rightLabel}</p>
                    </div>
                  </div>
                  {cluster.comparison.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className="grid grid-cols-[1fr_auto_1fr] items-stretch border-t border-zinc-800"
                    >
                      <div className="p-6 bg-zinc-950 text-zinc-400 text-sm">
                        <i className="fa-solid fa-xmark text-red-500 mr-3" />
                        <span className="line-through decoration-zinc-700">{row.left}</span>
                      </div>
                      <div className="bg-zinc-800 w-px" />
                      <div className="p-6 bg-zinc-900 text-white text-sm font-semibold">
                        <i className="fa-solid fa-check text-[var(--color-primary)] mr-3" />
                        {row.right}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cluster.bullets && cluster.bullets.length > 0 && (
                <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                  {cluster.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-4">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--color-primary)] text-white text-xs font-bold">
                        <i className="fa-solid fa-check text-xs" />
                      </span>
                      <p className="text-base leading-relaxed text-zinc-700">{bullet}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      {/* ─── AFTER 42 ─── */}
      {afterForty && (
        <section id="after" className="bg-black text-white">
          <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              The outcome
            </p>
            <div className="grid gap-12 sm:grid-cols-2 items-start">
              <div>
                <p className="text-7xl sm:text-8xl font-bold text-[var(--color-primary)] leading-none">
                  {afterForty.stat.value}
                </p>
                <p className="mt-3 text-base uppercase tracking-wider text-zinc-400">
                  {afterForty.stat.label}
                </p>
                <h2 className="mt-10 text-3xl font-bold tracking-tight sm:text-4xl">
                  {afterForty.heading}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300">
                  {afterForty.description}
                </p>
              </div>
              <div className="grid gap-3">
                {afterForty.careers.map((career) => (
                  <div
                    key={career.label}
                    className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4"
                  >
                    <i className={`${career.icon} text-[var(--color-primary)] text-xl w-6`} />
                    <span className="text-base">{career.label}</span>
                  </div>
                ))}
                {afterForty.communityNote && (
                  <p className="mt-4 text-sm text-zinc-500 italic leading-relaxed">
                    {afterForty.communityNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── WHAT YOU'LL BUILD ─── */}
      {whatYouBuild && (
        <section className="bg-white text-black">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              The means
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-3xl">
              {whatYouBuild.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-700 max-w-3xl">
              {whatYouBuild.intro}
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {/* Core */}
              <div className="border-2 border-black p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">
                  Phase 1
                </p>
                <h3 className="text-xl font-bold mb-3">{whatYouBuild.coreLabel}</h3>
                <p className="text-sm text-zinc-700 mb-6">{whatYouBuild.coreBlurb}</p>
                <ul className="space-y-2">
                  {whatYouBuild.coreTopics.map((topic) => (
                    <li key={topic} className="flex gap-3 text-sm">
                      <i className="fa-solid fa-angle-right text-[var(--color-primary)] mt-1" />
                      <span className="text-zinc-800">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Advanced */}
              <div className="bg-black text-white p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">
                  Phase 3
                </p>
                <h3 className="text-xl font-bold mb-3">{whatYouBuild.advancedLabel}</h3>
                <p className="text-sm text-zinc-400 mb-6">{whatYouBuild.advancedBlurb}</p>
                <ul className="space-y-3">
                  {whatYouBuild.advancedTracks.map((track) => (
                    <li key={track} className="flex gap-3">
                      <i className="fa-solid fa-diamond text-[var(--color-primary)] mt-1.5 text-xs" />
                      <span className="text-base">{track}</span>
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

      {/* ─── REAL STORIES (video embeds) ─── */}
      {realStories && (
        <section className="bg-zinc-100">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4">
              Real students
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-3xl text-black">
              {realStories.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-700 max-w-3xl">
              {realStories.description}
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {realStories.videos.map((video) => (
                <div key={video.youtubeId}>
                  <YouTubeEmbed youtubeId={video.youtubeId} title={`${video.name} — ${video.subtitle}`} />
                  <p className="mt-4 text-lg font-bold text-black">{video.name}</p>
                  <p className="text-xs uppercase tracking-wider text-zinc-600">{video.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW TO APPLY ─── */}
      {howToApply && (
        <section className="bg-white text-black" id="apply">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              The path
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-3xl">
              {howToApply.heading}
            </h2>
            <div className="mt-12 space-y-6">
              {howToApply.steps.map((step) => (
                <div
                  key={step.number}
                  className="grid gap-6 sm:grid-cols-[auto_1fr] items-start border-l-4 border-[var(--color-primary)] pl-8 py-2"
                >
                  <span className="text-6xl font-bold text-zinc-200 leading-none sm:w-24">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-base text-zinc-700 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:brightness-110 transition-all"
              >
                {howToApply.ctaLabel}
              </Link>
              {howToApply.microcopy && (
                <p className="text-sm text-zinc-600">{howToApply.microcopy}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      {faq && faq.length > 0 && (
        <section className="bg-black text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              Questions
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
              Every question. Answered honestly.
            </h2>
            <div className="grid gap-px bg-zinc-800 sm:grid-cols-2">
              {faq.map((item, i) => (
                <div key={i} className="bg-black p-8">
                  <h3 className="text-base font-bold mb-3 text-[var(--color-primary)]">
                    {item.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── STATS BAR ─── */}
      {stats && stats.length > 0 && (
        <section className="bg-zinc-950 text-white border-y border-zinc-800">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold sm:text-5xl text-[var(--color-primary)]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-zinc-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FINAL CTA ─── */}
      {ctaFinal && (
        <section className="bg-[var(--color-primary)] text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {ctaFinal.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white">
                {ctaFinal.description}
              </p>
              <div className="mt-10">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center border-2 border-white text-white font-bold uppercase tracking-wider px-10 py-4 text-base hover:bg-white hover:text-black transition-all"
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
