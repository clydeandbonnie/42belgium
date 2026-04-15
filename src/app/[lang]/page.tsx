import { notFound } from "next/navigation";
import Link from "next/link";
import { isValidLanguage, themeConfigs, THEMES, getSlug, type Language } from "@/lib/themes";

const homepageText: Record<Language, { title: string; subtitle: string; cta: string }> = {
  en: {
    title: "Choose your path",
    subtitle: "42 Belgium offers free, peer-to-peer tech training across 10 specialisations. Find the one that matches your ambition.",
    cta: "Explore →",
  },
  fr: {
    title: "Choisissez votre parcours",
    subtitle: "42 Belgium propose des formations tech gratuites en peer-to-peer dans 10 spécialisations. Trouvez celle qui correspond à votre ambition.",
    cta: "Explorer →",
  },
  nl: {
    title: "Kies je pad",
    subtitle: "42 Belgium biedt gratis peer-to-peer tech opleidingen in 10 specialisaties. Vind degene die past bij jouw ambitie.",
    cta: "Ontdekken →",
  },
};

export default async function LangHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const t = homepageText[lang];

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
        {t.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        {t.subtitle}
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {THEMES.map((theme) => {
          const config = themeConfigs[theme];
          return (
            <Link
              key={theme}
              href={`/${lang}/${getSlug(theme, lang)}`}
              className="group flex items-center justify-between rounded-xl border border-zinc-200 p-5 transition-all hover:border-black hover:shadow-sm dark:border-zinc-800 dark:hover:border-white"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-black dark:text-white">
                    {config.label}
                  </h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      config.priority === "P1"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {config.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-600">
                  {config.intentSummary}
                </p>
              </div>
              <span className="text-zinc-300 transition-colors group-hover:text-black dark:group-hover:text-white">
                {t.cta}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
