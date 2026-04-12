import type { Language } from "./themes";

const BASE = "https://42belgium.be";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface FooterLocation {
  city: string;
  address: string;
}

export function getNavItems(lang: Language): NavItem[] {
  const l = lang === "en" ? "en" : lang === "fr" ? "fr" : "nl";
  return [
    {
      label: lang === "fr" ? "Comment postuler ?" : lang === "nl" ? "Hoe solliciteren?" : "How to apply?",
      href: `${BASE}/${l}/our-process/`,
      children: [
        { label: lang === "fr" ? "Notre processus" : lang === "nl" ? "Ons proces" : "Our process", href: `${BASE}/${l}/our-process/` },
        { label: lang === "fr" ? "Admissions" : lang === "nl" ? "Toelatingen" : "Admissions", href: `${BASE}/${l}/admission/` },
      ],
    },
    {
      label: lang === "fr" ? "Quand & Où" : lang === "nl" ? "Wanneer & Waar" : "When & Where",
      href: `${BASE}/${l}/calendar/`,
    },
    {
      label: lang === "fr" ? "Pourquoi 42" : lang === "nl" ? "Waarom 42" : "Why 42",
      href: `${BASE}/${l}/the-concept/`,
      children: [
        { label: lang === "fr" ? "Le concept 42" : lang === "nl" ? "Het concept 42" : "The concept 42", href: `${BASE}/${l}/the-concept/` },
        { label: lang === "fr" ? "Le programme" : lang === "nl" ? "Het programma" : "The program", href: `${BASE}/${l}/the-learning-experience/` },
        { label: lang === "fr" ? "La vie après 42 & alumni" : lang === "nl" ? "Leven na 42 & alumni" : "Life after 42 & alumni", href: `${BASE}/${l}/life-after-42-alumni/` },
        { label: lang === "fr" ? "Le réseau 42" : lang === "nl" ? "Het 42-netwerk" : "The 42 network", href: `${BASE}/${l}/the-42-network/` },
        { label: lang === "fr" ? "L'équipe" : lang === "nl" ? "Ontmoet het team" : "Meet the team", href: `${BASE}/${l}/meet-the-team/` },
      ],
    },
    {
      label: lang === "fr" ? "Partenaires" : lang === "nl" ? "Partners" : "Partners",
      href: `${BASE}/${l}/partners/`,
      children: [
        { label: lang === "fr" ? "Amis de 42 Belgium" : lang === "nl" ? "Vrienden van 42 Belgium" : "Friends of 42 Belgium", href: `${BASE}/${l}/friends-of-42/` },
        { label: lang === "fr" ? "Nos partenaires" : lang === "nl" ? "Onze partners" : "Our partners", href: `${BASE}/${l}/partners/` },
      ],
    },
    {
      label: "FAQ",
      href: `${BASE}/${l}/faqs/`,
    },
  ];
}

export function getApplyUrl(lang: Language): string {
  const l = lang === "en" ? "en" : lang === "fr" ? "fr" : "nl";
  return `https://admission.42belgium.be/${l}/users/sign_up`;
}

export function getApplyLabel(lang: Language): string {
  return lang === "fr" ? "Postuler" : lang === "nl" ? "Solliciteren" : "Apply";
}

export function getFooterLocations(): FooterLocation[] {
  return [
    { city: "Brussels", address: "Cantersteen 12, 1000 Brussels, Belgium" },
    { city: "Antwerp", address: "Mediaplein 1, 2018 Antwerp, Belgium" },
  ];
}

export function getFooterColumns(lang: Language): FooterColumn[] {
  const l = lang === "en" ? "en" : lang === "fr" ? "fr" : "nl";
  return [
    {
      heading: "42 Belgium",
      links: [
        { label: lang === "fr" ? "Notre processus" : lang === "nl" ? "Ons proces" : "Our process", href: `${BASE}/${l}/our-process/` },
        { label: lang === "fr" ? "Admissions" : lang === "nl" ? "Toelatingen" : "Admissions", href: `${BASE}/${l}/admission/` },
        { label: lang === "fr" ? "Quand & Où" : lang === "nl" ? "Wanneer & Waar" : "When & Where", href: `${BASE}/${l}/calendar/` },
        { label: lang === "fr" ? "Le concept 42" : lang === "nl" ? "Het concept 42" : "The concept 42", href: `${BASE}/${l}/the-concept/` },
        { label: lang === "fr" ? "Le programme" : lang === "nl" ? "Het programma" : "The program", href: `${BASE}/${l}/the-learning-experience/` },
        { label: lang === "fr" ? "La vie après 42" : lang === "nl" ? "Leven na 42" : "Life after 42", href: `${BASE}/${l}/life-after-42-alumni/` },
        { label: lang === "fr" ? "Le réseau 42" : lang === "nl" ? "Het 42-netwerk" : "The 42 network", href: `${BASE}/${l}/the-42-network/` },
        { label: lang === "fr" ? "L'équipe" : lang === "nl" ? "Het team" : "Meet the team", href: `${BASE}/${l}/meet-the-team/` },
        { label: lang === "fr" ? "Partenaires" : lang === "nl" ? "Partners" : "Partners", href: `${BASE}/${l}/partners/` },
        { label: "FAQ", href: `${BASE}/${l}/faqs/` },
      ],
    },
    {
      heading: lang === "fr" ? "Travailler chez 42" : lang === "nl" ? "Werken bij 42" : "Work at 42 Belgium",
      links: [
        { label: lang === "fr" ? "Opportunités d'emploi" : lang === "nl" ? "Vacatures" : "Job opportunities", href: `${BASE}/${l}/job-opportunities/` },
      ],
    },
    {
      heading: lang === "fr" ? "Contact" : lang === "nl" ? "Contact" : "Contact",
      links: [
        { label: lang === "fr" ? "Contactez-nous" : lang === "nl" ? "Contacteer ons" : "Contact us", href: `${BASE}/${l}/contact/` },
      ],
    },
  ];
}

export function getSocialLinks(): SocialLink[] {
  return [
    { platform: "LinkedIn", href: "https://www.linkedin.com/school/42belgium/", icon: "fa-brands fa-linkedin-in" },
    { platform: "YouTube", href: "https://www.youtube.com/channel/UCrfjJDPZSNiBf-KxafuJiNA", icon: "fa-brands fa-youtube" },
    { platform: "Facebook", href: "https://www.facebook.com/42Belgium/", icon: "fa-brands fa-facebook-f" },
    { platform: "Instagram", href: "https://www.instagram.com/42belgium/", icon: "fa-brands fa-instagram" },
  ];
}

export function getLegalLinks(): { label: string; href: string }[] {
  return [
    { label: "Privacy policy", href: "https://admission.42belgium.be/legal/terms/4" },
    { label: "Cookies", href: "https://admission.42belgium.be/legal/terms/2" },
    { label: "Terms of use", href: "https://admission.42belgium.be/legal/terms/5" },
  ];
}
