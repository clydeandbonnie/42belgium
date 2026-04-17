import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLanguage, type Language } from "@/lib/themes";
import { getPageContent } from "@/lib/i18n";
import { ProposalA } from "@/components/proposals/ProposalA";
import { ProposalB } from "@/components/proposals/ProposalB";
import { ProposalC } from "@/components/proposals/ProposalC";

const VARIANTS = ["a", "b", "c"] as const;
type Variant = (typeof VARIANTS)[number];

const variantTitles: Record<Variant, string> = {
  a: "Proposition A - Bold / Story",
  b: "Proposition B - Classic / Welcoming",
  c: "Proposition C - Proof-Led / Data",
};

export function generateStaticParams() {
  return VARIANTS.flatMap((variant) =>
    ["en", "fr", "nl"].map((lang) => ({ lang, variant }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  const v = variant as Variant;
  return {
    title: variantTitles[v] || "Proposal",
    description: "42 Belgium - Opportunity Landing Page Proposal",
  };
}

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ lang: string; variant: string }>;
}) {
  const { lang, variant } = await params;

  if (!isValidLanguage(lang)) notFound();
  if (!VARIANTS.includes(variant as Variant)) notFound();

  // All three proposals read the SAME canonical content for Opportunity.
  // Design is what differs between A, B and C - never the copy.
  const content = await getPageContent("opportunity", lang as Language);

  return (
    <>
      {variant === "a" && <ProposalA content={content} />}
      {variant === "b" && <ProposalB content={content} />}
      {variant === "c" && <ProposalC content={content} />}
    </>
  );
}
