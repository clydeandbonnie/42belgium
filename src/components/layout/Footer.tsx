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
import styles from "./Footer.module.css";

function ApplyArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 108 108" fill="currentColor" aria-hidden="true">
      <path d="M16 54L86 54L54 86L57.5 89.5L96 51.3L57.5 13L54 16.5L86 49H16V54Z" />
    </svg>
  );
}

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
    <footer className={styles.footer}>
      <div className={styles.container}>
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
                  <p className={styles.cityName}>{loc.city}</p>
                  <p className={styles.address}>{loc.address}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
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
              <p className={styles.columnHeading}>{col.heading}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.columnLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className={styles.ctaRow}>
          <a href={applyUrl} className={styles.applyButton}>
            {applyLabel}
            <ApplyArrow />
          </a>
          <a
            href={`https://42belgium.be/${lang}/contact/`}
            className={styles.contactButton}
          >
            {contactLabel}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            © 42 Belgium - All rights reserved
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.legalLink}
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
