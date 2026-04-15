import type { Language, Theme } from "./themes";

/**
 * Content schema aligned with brief v2 (April 2026) and lexical matrix v3.
 * Every landing page follows this shape. Optional sections (faq, schemaOrg)
 * can be omitted per page.
 */

export interface PageMeta {
  /** <title> — 50 to 60 chars, must include Primary Query + "42 Belgium". */
  title: string;
  /** <meta description> — 140 to 160 chars, 1–2 Cluster 1 keywords inside. */
  description: string;
  /** SEO URL slug — lowercase, hyphens, no accents, 3–5 words. */
  slug: string;
  /** Primary Query from the matrix — the dominant converting keyword. */
  primaryQuery: string;
  /** All converting keywords from the matrix — each MUST appear in body. */
  convertingKeywords: string[];
}

export interface HeroContent {
  /** Single H1 containing Primary Query or close variant. */
  headline: string;
  /** Sub-headline, typically the LP Angle (Classic or Bold). */
  subheadline: string;
  /** Reassurance microcopy shown under CTA — e.g. "No fees · No degree · …". */
  reassurance?: string;
  /** CTA button label — exact text from matrix CTA column. */
  cta: string;
}

export interface ComparisonRow {
  /** Left column cell — typically the "bad" or competing option. */
  left: string;
  /** Right column cell — typically "42 Belgium" / the winning option. */
  right: string;
}

export interface ClusterComparison {
  leftLabel: string;
  rightLabel: string;
  rows: ComparisonRow[];
}

export interface Cluster {
  /** Cluster name from matrix — uppercase label. */
  name: string;
  /** H2 reformulated in copywriting (not verbatim cluster name). */
  heading: string;
  /** 100–150 words of copy for this section. All cluster keywords must appear naturally. */
  body: string;
  /** Keywords from the matrix cluster — referenced for validation. */
  keywords: string[];
  /** Optional bullet points rendered under the body. */
  bullets?: string[];
  /** Optional side-by-side comparison (e.g. MOOC vs 42). */
  comparison?: ClusterComparison;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SchemaOrgCourse {
  name: string;
  description: string;
  provider: string;
  url: string;
  courseMode?: string;
  educationalLevel?: string;
}

export interface AfterFortySection {
  heading: string;
  description: string;
  stat: { value: string; label: string };
  careers: { icon: string; label: string }[];
  communityNote?: string;
}

export interface WhatYouBuildSection {
  heading: string;
  intro: string;
  coreLabel: string;
  coreBlurb: string;
  coreTopics: string[];
  advancedLabel: string;
  advancedBlurb: string;
  advancedTracks: string[];
  plusNote?: string;
}

export interface VideoTestimonial {
  name: string;
  subtitle: string;
  youtubeId: string;
}

export interface RealStoriesSection {
  heading: string;
  description: string;
  videos: VideoTestimonial[];
}

export interface ApplicationStep {
  number: string;
  title: string;
  description: string;
}

export interface HowToApplySection {
  heading: string;
  steps: ApplicationStep[];
  ctaLabel: string;
  microcopy?: string;
}

export interface PageContent {
  meta: PageMeta;
  hero: HeroContent;
  clusters: Cluster[];
  afterForty?: AfterFortySection;
  whatYouBuild?: WhatYouBuildSection;
  realStories?: RealStoriesSection;
  howToApply?: HowToApplySection;
  faq?: FaqItem[];
  stats?: Stat[];
  ctaFinal?: {
    title: string;
    description: string;
    cta: string;
  };
  schemaOrg?: {
    course?: SchemaOrgCourse;
  };
}

const contentCache: Partial<Record<string, PageContent>> = {};

export async function getPageContent(
  theme: Theme,
  lang: Language
): Promise<PageContent> {
  const key = `${theme}-${lang}`;
  if (contentCache[key]) return contentCache[key];

  const content = (await import(`@/content/${theme}/${lang}.json`)) as {
    default: PageContent;
  };
  contentCache[key] = content.default;
  return content.default;
}

export const languageNames: Record<Language, string> = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
};

export const uiStrings: Record<Language, { learnMore: string; nav: { home: string } }> = {
  en: { learnMore: "Learn more", nav: { home: "Home" } },
  fr: { learnMore: "En savoir plus", nav: { home: "Accueil" } },
  nl: { learnMore: "Meer informatie", nav: { home: "Home" } },
};

/**
 * Count words in plain text, stripping HTML/Markdown artefacts.
 * Used by the validator to enforce the 600–1000 word target per page.
 */
export function countWords(text: string): number {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

/**
 * Count occurrences of a phrase (case-insensitive) in a given text.
 */
export function countOccurrences(text: string, phrase: string): number {
  const re = new RegExp(
    phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "gi"
  );
  return (text.match(re) || []).length;
}

/**
 * Extract all plain-text body copy from a PageContent for validation.
 */
export function extractBodyText(content: PageContent): string {
  const parts: string[] = [
    content.hero.headline,
    content.hero.subheadline,
    content.hero.reassurance || "",
    content.hero.cta,
    ...content.clusters.flatMap((c) => [
      c.heading,
      c.body,
      ...(c.bullets || []),
      ...(c.comparison
        ? [
            c.comparison.leftLabel,
            c.comparison.rightLabel,
            ...c.comparison.rows.flatMap((r) => [r.left, r.right]),
          ]
        : []),
    ]),
    content.afterForty?.heading || "",
    content.afterForty?.description || "",
    ...(content.afterForty?.careers || []).map((c) => c.label),
    content.afterForty?.communityNote || "",
    content.whatYouBuild?.heading || "",
    content.whatYouBuild?.intro || "",
    content.whatYouBuild?.coreBlurb || "",
    ...(content.whatYouBuild?.coreTopics || []),
    content.whatYouBuild?.advancedBlurb || "",
    ...(content.whatYouBuild?.advancedTracks || []),
    content.whatYouBuild?.plusNote || "",
    content.realStories?.heading || "",
    content.realStories?.description || "",
    content.howToApply?.heading || "",
    ...(content.howToApply?.steps || []).flatMap((s) => [s.title, s.description]),
    content.howToApply?.microcopy || "",
    ...(content.faq || []).flatMap((f) => [f.question, f.answer]),
    ...(content.stats || []).flatMap((s) => [s.value, s.label]),
    content.ctaFinal?.title || "",
    content.ctaFinal?.description || "",
    content.ctaFinal?.cta || "",
  ];
  return parts.join(" ");
}
