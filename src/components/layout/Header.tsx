"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/lib/themes";
import { getNavItems, getApplyUrl, getApplyLabel } from "@/lib/navigation";
import { LANGUAGES } from "@/lib/themes";

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navItems = getNavItems(lang);
  const applyUrl = getApplyUrl(lang);
  const applyLabel = getApplyLabel(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[999] transition-colors duration-500 ease-in-out"
      style={{
        height: 100,
        backgroundColor: scrolled ? "#ffffff" : "transparent",
      }}
    >
      {/* Main bar — 3-column grid matching Elementor: logo | nav | actions */}
      <div
        className="mx-auto grid h-full items-center px-4"
        style={{
          maxWidth: 1470,
          gridTemplateColumns: "1fr 3fr 1fr",
          borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(163, 173, 179, 0.5)",
        }}
      >
        {/* ── Logo ── */}
        <Link href={`https://42belgium.be/${lang}/`} className="flex items-center">
          <Image
            src="/assets/logo-42-white.svg"
            alt="42 Belgium"
            width={140}
            height={26}
            priority
            className="transition-all duration-500"
            style={{ filter: scrolled ? "invert(1)" : "none" }}
          />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center justify-center gap-0">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className={`flex items-center gap-1 ${scrolled ? "text-black" : "text-white"} hover:text-[#00BABC] transition-colors`}
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "13px 5px",
                  lineHeight: "20px",
                }}
              >
                {item.label}
                {item.children && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="currentColor"
                    className="ml-1 opacity-60"
                  >
                    <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </a>

              {/* Dropdown — white bg + pink box-shadow */}
              {item.children && openDropdown === item.label && (
                <div
                  className="absolute top-full left-0 bg-white"
                  style={{
                    minWidth: 220,
                    boxShadow: "rgb(237, 52, 145) 6px 6px 0px 0px",
                    padding: 0,
                  }}
                >
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block text-black hover:text-white hover:bg-[#ED3491] transition-colors"
                      style={{
                        fontFamily: "futura-pt, sans-serif",
                        fontSize: 18,
                        fontWeight: 400,
                        padding: "13px 10px",
                        lineHeight: "20px",
                      }}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ── Right: lang + Apply ── */}
        <div className="hidden lg:flex items-center justify-end gap-4">
          {/* Language switcher */}
          <div className="flex items-center">
            {LANGUAGES.map((l) => (
              <a
                key={l}
                href={`https://42belgium.be/${l}/`}
                className={`transition-colors ${
                  l === lang
                    ? scrolled ? "text-black" : "text-white"
                    : scrolled ? "text-zinc-400 hover:text-black" : "text-zinc-400 hover:text-white"
                }`}
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0 4px",
                }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Apply CTA — gradient teal→purple with arrow */}
          <a
            href={applyUrl}
            className="inline-flex items-center gap-2.5 text-white hover:shadow-[4px_4px_0px_0px_rgb(237,52,145)] transition-all"
            style={{
              background: "linear-gradient(90deg, #00BABC 0%, #7D8EE9 100%)",
              fontFamily: "futura-pt, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              textTransform: "uppercase",
              padding: "16px 20px",
              lineHeight: "1",
            }}
          >
            {applyLabel}
            {/* Arrow SVG matching the site */}
            <svg width="14" height="14" viewBox="0 0 108 108" fill="none">
              <path
                d="M16 54L86 54L54 86L57.5 89.5L96 51.3L57.5 13L54 16.5L86 49H16V54Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 justify-self-end transition-colors duration-500 ${scrolled ? "text-black" : "text-white"}`}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-xl`} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#090909] border-t border-zinc-800 max-h-[80vh] overflow-y-auto">
          <nav className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="block py-3 text-white border-b border-zinc-800"
                  style={{
                    fontFamily: "futura-pt, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block py-2 text-[#E8ECF2] hover:text-[#00BABC]"
                        style={{
                          fontFamily: "futura-pt, sans-serif",
                          fontSize: 18,
                          fontWeight: 400,
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile Apply */}
            <a
              href={applyUrl}
              className="block mt-4 text-center text-white"
              style={{
                background: "linear-gradient(90deg, #00BABC 0%, #7D8EE9 100%)",
                fontFamily: "futura-pt, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                textTransform: "uppercase",
                padding: "16px 20px",
              }}
            >
              {applyLabel}
            </a>
            {/* Mobile lang */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800 mt-4">
              {LANGUAGES.map((l) => (
                <a
                  key={l}
                  href={`https://42belgium.be/${l}/`}
                  className={`uppercase ${
                    l === lang ? "text-white font-bold" : "text-zinc-400"
                  }`}
                  style={{
                    fontFamily: "futura-pt, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
