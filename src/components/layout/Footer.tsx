import type { Language } from "@/lib/themes";

const footerText: Record<Language, { tagline: string; rights: string }> = {
  en: {
    tagline: "Free, peer-to-peer tech education in Belgium.",
    rights: "All rights reserved.",
  },
  fr: {
    tagline: "Formation tech gratuite et peer-to-peer en Belgique.",
    rights: "Tous droits réservés.",
  },
  nl: {
    tagline: "Gratis peer-to-peer tech opleiding in België.",
    rights: "Alle rechten voorbehouden.",
  },
};

export function Footer({ lang }: { lang: Language }) {
  const t = footerText[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-bold text-black dark:text-white">
              42 Belgium
            </p>
            <p className="mt-1 text-sm text-zinc-500">{t.tagline}</p>
          </div>
          <p className="text-sm text-zinc-400">
            © {year} 42 Belgium. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
