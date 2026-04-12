export const LANGUAGES = ["en", "fr", "nl"] as const;
export type Language = (typeof LANGUAGES)[number];

export const THEMES = [
  "opportunity",
  "itgen",
  "cyber",
  "aiengineering",
  "scienceeng",
  "analystbi",
  "python",
  "webfullstack",
  "infra",
  "genai",
] as const;
export type Theme = (typeof THEMES)[number];

export type Priority = "P1" | "P2";

export interface ThemeConfig {
  slug: Theme;
  label: string;
  priority: Priority;
  intentSummary: string;
}

export const themeConfigs: Record<Theme, ThemeConfig> = {
  opportunity: {
    slug: "opportunity",
    label: "Opportunity",
    priority: "P1",
    intentSummary: "IT career change / adult learner with no tech background",
  },
  itgen: {
    slug: "itgen",
    label: "IT General",
    priority: "P1",
    intentSummary: "General IT training / Coding bootcamp",
  },
  cyber: {
    slug: "cyber",
    label: "Cybersecurity",
    priority: "P1",
    intentSummary: "Cybersecurity specialisation",
  },
  aiengineering: {
    slug: "aiengineering",
    label: "AI Engineering",
    priority: "P1",
    intentSummary: "AI / Machine Learning engineering",
  },
  scienceeng: {
    slug: "scienceeng",
    label: "Data Science",
    priority: "P1",
    intentSummary: "Data Science / ML engineering",
  },
  analystbi: {
    slug: "analystbi",
    label: "Data Analyst / BI",
    priority: "P2",
    intentSummary: "Data Analyst / BI tools (Power BI, SQL, Tableau)",
  },
  python: {
    slug: "python",
    label: "Python",
    priority: "P2",
    intentSummary: "Python programming",
  },
  webfullstack: {
    slug: "webfullstack",
    label: "Web Fullstack",
    priority: "P2",
    intentSummary: "Fullstack web development",
  },
  infra: {
    slug: "infra",
    label: "Infrastructure",
    priority: "P2",
    intentSummary: "DevOps / Sysadmin / Networking",
  },
  genai: {
    slug: "genai",
    label: "Generative AI",
    priority: "P2",
    intentSummary: "Generative AI / Prompt Engineering",
  },
};

export function isValidTheme(value: string): value is Theme {
  return THEMES.includes(value as Theme);
}

export function isValidLanguage(value: string): value is Language {
  return LANGUAGES.includes(value as Language);
}
