import Link from "next/link";
import type { Language } from "@/lib/themes";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href={`/${lang}`}
          className="text-xl font-bold tracking-tight text-black dark:text-white"
        >
          42 Belgium
        </Link>
        <LanguageSwitcher currentLang={lang} />
      </div>
    </header>
  );
}
