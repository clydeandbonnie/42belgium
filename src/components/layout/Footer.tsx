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

  const contactLabel =
    lang === "fr" ? "Contactez-nous" : lang === "nl" ? "Contacteer ons" : "Contact us";

  return (
    <footer style={{ backgroundColor: "#090909" }}>
      {/* ── Main footer ── */}
      <div className="mx-auto px-6 pt-16 pb-12" style={{ maxWidth: 1200 }}>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo + locations + socials */}
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
                  <p
                    className="text-white"
                    style={{
                      fontFamily: "futura-pt, sans-serif",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {loc.city}
                  </p>
                  <p
                    style={{
                      fontFamily: "futura-pt, sans-serif",
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#E8ECF2",
                      lineHeight: "1.6",
                    }}
                  >
                    {loc.address}
                  </p>
                </div>
              ))}
            </div>
            {/* Social links — icon color #04809F, no bg */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: "#04809F", fontSize: 24 }}
                  aria-label={social.platform}
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p
                className="text-white mb-4"
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-[#00BABC] transition-colors"
                      style={{
                        fontFamily: "futura-pt, sans-serif",
                        fontSize: 18,
                        fontWeight: 400,
                        color: "#E8ECF2",
                      }}
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
        <div
          className="mt-12 flex flex-col sm:flex-row gap-3 sm:items-center pt-8"
          style={{ borderTop: "1px solid rgba(163, 173, 179, 0.2)" }}
        >
          <a
            href={applyUrl}
            className="inline-flex items-center justify-center gap-2.5 text-white hover:shadow-[4px_4px_0px_0px_rgb(237,52,145)] transition-all"
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
            <svg width="14" height="14" viewBox="0 0 108 108" fill="none">
              <path
                d="M16 54L86 54L54 86L57.5 89.5L96 51.3L57.5 13L54 16.5L86 49H16V54Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={`https://42belgium.be/${lang}/contact/`}
            className="inline-flex items-center justify-center text-white hover:text-[#00BABC] transition-colors"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              textTransform: "uppercase",
              padding: "16px 20px",
              border: "1px solid rgba(163, 173, 179, 0.3)",
            }}
          >
            {contactLabel}
          </a>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(163, 173, 179, 0.2)" }}>
        <div
          className="mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ maxWidth: 1200 }}
        >
          <p
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "rgba(232, 236, 242, 0.5)",
            }}
          >
            © 42 Belgium — All rights reserved
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00BABC] transition-colors"
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(232, 236, 242, 0.5)",
                }}
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
