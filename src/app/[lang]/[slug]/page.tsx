import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LANGUAGES,
  THEMES,
  isValidLanguage,
  getThemeFromSlug,
  getSlug,
  type Language,
  type Theme,
} from "@/lib/themes";
import { getPageContent } from "@/lib/i18n";
import { buildMetadata, SITE_URL, canonicalUrl } from "@/lib/seo";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Hero } from "@/components/sections/Hero";
import { WhatYouLearn } from "@/components/sections/WhatYouLearn";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { SocialProof } from "@/components/sections/SocialProof";
import { CtaSection } from "@/components/sections/CtaSection";

interface PageParams {
  lang: string;
  slug: string;
}

export function generateStaticParams() {
  const params: PageParams[] = [];
  for (const lang of LANGUAGES) {
    for (const theme of THEMES) {
      params.push({ lang, slug: getSlug(theme, lang) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLanguage(lang)) return {};
  const theme = getThemeFromSlug(lang as Language, slug);
  if (!theme) return {};
  return buildMetadata(theme, lang as Language);
}

export default async function ThemePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { lang, slug } = await params;
  if (!isValidLanguage(lang)) notFound();
  const theme = getThemeFromSlug(lang as Language, slug);
  if (!theme) notFound();

  let content;
  try {
    content = await getPageContent(theme as Theme, lang as Language);
  } catch {
    notFound();
  }

  const canonical = canonicalUrl(theme as Theme, lang as Language);

  return (
    <>
      <SchemaMarkup
        content={content}
        lang={lang as Language}
        canonicalUrl={canonical}
        siteUrl={SITE_URL}
      />
      <Hero
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        cta={content.hero.cta}
      />
      {content.clusters.map((cluster, i) => {
        // First cluster → outcomes grid, second → text block, others → outcomes grid.
        // Design will be refined in Phase 2 - here we just scaffold the structure.
        if (i === 1) {
          return (
            <WhoItsFor
              key={cluster.name}
              title={cluster.heading}
              description={cluster.body}
            />
          );
        }
        return (
          <WhatYouLearn
            key={cluster.name}
            title={cluster.heading}
            outcomes={cluster.bullets && cluster.bullets.length > 0 ? cluster.bullets : [cluster.body]}
          />
        );
      })}
      {content.stats && content.stats.length > 0 && (
        <SocialProof title="" stats={content.stats} />
      )}
      {content.ctaFinal && (
        <CtaSection
          title={content.ctaFinal.title}
          description={content.ctaFinal.description}
          cta={content.ctaFinal.cta}
        />
      )}
    </>
  );
}
