import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LANGUAGES,
  THEMES,
  isValidLanguage,
  isValidTheme,
  type Language,
  type Theme,
} from "@/lib/themes";
import { getPageContent } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { WhatYouLearn } from "@/components/sections/WhatYouLearn";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { SocialProof } from "@/components/sections/SocialProof";
import { CtaSection } from "@/components/sections/CtaSection";

interface PageParams {
  lang: string;
  theme: string;
}

export function generateStaticParams() {
  const params: PageParams[] = [];
  for (const lang of LANGUAGES) {
    for (const theme of THEMES) {
      params.push({ lang, theme });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { lang, theme } = await params;

  if (!isValidLanguage(lang) || !isValidTheme(theme)) {
    return {};
  }

  try {
    const content = await getPageContent(theme as Theme, lang as Language);
    return {
      title: content.meta.title,
      description: content.meta.description,
      alternates: {
        languages: Object.fromEntries(
          LANGUAGES.map((l) => [l, `/${l}/${theme}`])
        ),
      },
      openGraph: {
        title: content.meta.title,
        description: content.meta.description,
        locale: lang,
        type: "website",
      },
    };
  } catch {
    return {};
  }
}

export default async function ThemePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { lang, theme } = await params;

  if (!isValidLanguage(lang) || !isValidTheme(theme)) {
    notFound();
  }

  let content;
  try {
    content = await getPageContent(theme as Theme, lang as Language);
  } catch {
    notFound();
  }

  return (
    <>
      <Hero
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        cta={content.hero.cta}
      />
      <WhatYouLearn
        title={content.whatYouLearn.title}
        outcomes={content.whatYouLearn.outcomes}
      />
      <WhoItsFor
        title={content.whoItsFor.title}
        description={content.whoItsFor.description}
      />
      <SocialProof
        title={content.socialProof.title}
        stats={content.socialProof.stats}
      />
      <CtaSection
        title={content.ctaSection.title}
        description={content.ctaSection.description}
        cta={content.ctaSection.cta}
      />
    </>
  );
}
