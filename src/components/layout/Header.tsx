import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/lib/themes";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src="/assets/logo-42-white.svg"
            alt="42 Belgium"
            width={140}
            height={26}
            priority
          />
        </Link>
        <LanguageSwitcher currentLang={lang} />
      </div>
    </header>
  );
}
