"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/lib/themes";
import { getNavItems, getApplyUrl, getApplyLabel } from "@/lib/navigation";
import { languageNames } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/themes";

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navItems = getNavItems(lang);
  const applyUrl = getApplyUrl(lang);
  const applyLabel = getApplyLabel(lang);

  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href={`https://42belgium.be/${lang}/`} className="flex items-center shrink-0">
          <Image
            src="/assets/logo-42-white.svg"
            alt="42 Belgium"
            width={140}
            height={26}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm text-white hover:text-[var(--color-primary)] transition-colors"
              >
                {item.label}
                {item.children && (
                  <i className="fa-solid fa-chevron-down text-[10px] ml-1 opacity-60" />
                )}
              </a>
              {/* Dropdown */}
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 bg-zinc-900 border border-zinc-800 py-2 min-w-[220px] shadow-xl">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side: lang switcher + CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="hidden sm:flex items-center gap-0 text-sm">
            {LANGUAGES.map((l) => (
              <a
                key={l}
                href={`https://42belgium.be/${l}/`}
                className={`px-2 py-1 uppercase text-xs tracking-wider transition-colors ${
                  l === lang
                    ? "font-bold text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Apply CTA */}
          <a
            href={applyUrl}
            className="hidden sm:inline-flex items-center justify-center bg-[var(--color-primary)] text-white text-sm font-bold uppercase tracking-wider px-5 py-2 hover:brightness-110 transition-all"
          >
            {applyLabel}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-800 max-h-[80vh] overflow-y-auto">
          <nav className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="block py-3 text-sm font-bold text-white border-b border-zinc-800"
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block py-2 text-sm text-zinc-400 hover:text-white"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile CTA */}
            <a
              href={applyUrl}
              className="block mt-4 text-center bg-[var(--color-primary)] text-white text-sm font-bold uppercase tracking-wider px-5 py-3"
            >
              {applyLabel}
            </a>
            {/* Mobile lang switcher */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800 mt-4">
              {LANGUAGES.map((l) => (
                <a
                  key={l}
                  href={`https://42belgium.be/${l}/`}
                  className={`uppercase text-sm tracking-wider ${
                    l === lang ? "font-bold text-white" : "text-zinc-500"
                  }`}
                >
                  {languageNames[l]}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
