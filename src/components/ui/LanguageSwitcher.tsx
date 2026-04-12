"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGUAGES, type Language } from "@/lib/themes";
import { languageNames } from "@/lib/i18n";

export function LanguageSwitcher({ currentLang }: { currentLang: Language }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-sm">
      {LANGUAGES.map((lang) => {
        const newPath = pathname.replace(`/${currentLang}/`, `/${lang}/`);
        const isActive = lang === currentLang;

        return (
          <Link
            key={lang}
            href={newPath}
            className={`px-2 py-1 rounded transition-colors ${
              isActive
                ? "font-semibold text-black dark:text-white"
                : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {languageNames[lang]}
          </Link>
        );
      })}
    </div>
  );
}
