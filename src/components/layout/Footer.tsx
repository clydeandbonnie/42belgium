import Image from "next/image";
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
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col gap-3">
            <Image
              src="/assets/logo-42-white.svg"
              alt="42 Belgium"
              width={120}
              height={23}
            />
            <p className="text-sm text-zinc-400">{t.tagline}</p>
          </div>
          <p className="text-sm text-zinc-500">
            © {year} 42 Belgium. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
