import type { Language, Theme } from "./themes";

export interface PageContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  whatYouLearn: {
    title: string;
    outcomes: string[];
  };
  whoItsFor: {
    title: string;
    description: string;
  };
  socialProof: {
    title: string;
    stats: { value: string; label: string }[];
  };
  ctaSection: {
    title: string;
    description: string;
    cta: string;
  };
}

const contentCache: Partial<Record<string, PageContent>> = {};

export async function getPageContent(
  theme: Theme,
  lang: Language
): Promise<PageContent> {
  const key = `${theme}-${lang}`;
  if (contentCache[key]) return contentCache[key];

  try {
    const content = (await import(`@/content/${theme}/${lang}.json`)) as {
      default: PageContent;
    };
    contentCache[key] = content.default;
    return content.default;
  } catch {
    throw new Error(`Content not found for theme "${theme}" in language "${lang}"`);
  }
}

export const uiStrings: Record<Language, { learnMore: string; nav: { home: string } }> = {
  en: { learnMore: "Learn more", nav: { home: "Home" } },
  fr: { learnMore: "En savoir plus", nav: { home: "Accueil" } },
  nl: { learnMore: "Meer informatie", nav: { home: "Home" } },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
};
