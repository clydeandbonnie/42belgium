import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isValidLanguage, themeConfigs, THEMES, getSlug, type Language, type Theme } from "@/lib/themes";
import statusMap from "@/content/_status.json";

type Status = "draft" | "ready" | "approved";

const homepageText: Record<Language, { banner: string; title: string; subtitle: string; cta: string; statusLabels: Record<Status, string> }> = {
  en: {
    banner: "Internal review · 42 Belgium landing pages",
    title: "Landing pages awaiting your approval",
    subtitle: "Each card below is a landing page ready for client review. Click through to read the page; flag any changes back to the team.",
    cta: "Open →",
    statusLabels: { draft: "Draft", ready: "Ready for review", approved: "Approved" },
  },
  fr: {
    banner: "Revue interne · Landing pages 42 Belgium",
    title: "Landing pages à valider",
    subtitle: "Chaque carte ci-dessous est une landing page prête pour la revue. Clique pour lire la page ; remonte les changements souhaités à l'équipe.",
    cta: "Ouvrir →",
    statusLabels: { draft: "Brouillon", ready: "À relire", approved: "Validé" },
  },
  nl: {
    banner: "Interne review · 42 Belgium landing pages",
    title: "Landing pages te valideren",
    subtitle: "Elke kaart hieronder is een landing page klaar voor jouw beoordeling. Klik om de pagina te lezen; bezorg eventuele aanpassingen aan het team.",
    cta: "Openen →",
    statusLabels: { draft: "Concept", ready: "Te beoordelen", approved: "Goedgekeurd" },
  },
};

const statusStyles: Record<Status, string> = {
  draft: "bg-zinc-800 text-zinc-400",
  ready: "bg-[var(--color-primary)]/15 text-[var(--color-primary)]",
  approved: "bg-emerald-500/15 text-emerald-400",
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function getStatus(theme: Theme, lang: Language): Status {
  const key = `${theme}-${lang}`;
  const value = (statusMap as Record<string, string>)[key];
  if (value === "ready" || value === "approved") return value;
  return "draft";
}

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
    <div className="bg-black text-white min-h-screen">
      {/* Internal-review banner */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-6 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
            {t.banner}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-300">
          {t.subtitle}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {THEMES.map((theme) => {
            const config = themeConfigs[theme];
            const status = getStatus(theme, lang);
            return (
              <Link
                key={theme}
                href={`/${lang}/${getSlug(theme, lang)}`}
                className="group flex items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-5 transition-colors hover:border-[var(--color-primary)]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-white">{config.label}</h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        config.priority === "P1"
                          ? "bg-white text-black"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {config.priority}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${statusStyles[status]}`}
                    >
                      {t.statusLabels[status]}
                      {status === "ready" && (
                        <span className="ml-1.5 inline-flex items-center gap-1 font-normal opacity-80">
                          ({(["en", "nl", "fr"] as const).map((l, i) => (
                            <span key={l} className="inline-flex items-center gap-0.5">
                              {i > 0 && <span className="mx-0.5">-</span>}
                              <span>{l.toUpperCase()}</span>
                              {theme === "opportunity" && l === "en" && (
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-emerald-400"
                                  aria-label="Client-validated"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </span>
                          ))})
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">
                    {config.intentSummary}
                  </p>
                </div>
                <span className="shrink-0 text-zinc-500 transition-colors group-hover:text-[var(--color-primary)]">
                  {t.cta}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
