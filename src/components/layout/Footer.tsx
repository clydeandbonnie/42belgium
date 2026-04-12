import Image from "next/image";
import type { Language } from "@/lib/themes";
import {
  getFooterLocations,
  getFooterColumns,
  getSocialLinks,
  getLegalLinks,
  getApplyUrl,
  getApplyLabel,
} from "@/lib/navigation";

export function Footer({ lang }: { lang: Language }) {
  const locations = getFooterLocations();
  const columns = getFooterColumns(lang);
  const socialLinks = getSocialLinks();
  const legalLinks = getLegalLinks();
  const applyUrl = getApplyUrl(lang);
  const applyLabel = getApplyLabel(lang);

  const contactLabel = lang === "fr" ? "Contactez-nous" : lang === "nl" ? "Contacteer ons" : "Contact us";

  return (
    <footer className="bg-black text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo + locations */}
          <div>
            <Image
              src="/assets/logo-42-white.svg"
              alt="42 Belgium"
              width={140}
              height={26}
            />
            <div className="mt-6 space-y-4">
              {locations.map((loc) => (
                <div key={loc.city}>
                  <p className="text-sm font-bold">{loc.city}</p>
                  <p className="text-sm text-zinc-400">{loc.address}</p>
                </div>
              ))}
            </div>
            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center bg-zinc-900 text-zinc-400 hover:bg-[var(--color-primary)] hover:text-white transition-all"
                  aria-label={social.platform}
                >
                  <i className={`${social.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-bold uppercase tracking-wider mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between border-t border-zinc-800 pt-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={applyUrl}
              className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:brightness-110 transition-all"
            >
              {applyLabel}
            </a>
            <a
              href={`https://42belgium.be/${lang}/contact/`}
              className="inline-flex items-center justify-center border border-zinc-700 text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:border-white transition-all"
            >
              {contactLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © 42 Belgium — All rights reserved
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
