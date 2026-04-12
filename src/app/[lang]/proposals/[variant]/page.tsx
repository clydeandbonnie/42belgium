import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLanguage } from "@/lib/themes";
import { ProposalA } from "@/components/proposals/ProposalA";
import { ProposalB } from "@/components/proposals/ProposalB";
import { ProposalC } from "@/components/proposals/ProposalC";

const VARIANTS = ["a", "b", "c"] as const;
type Variant = (typeof VARIANTS)[number];

const variantTitles: Record<Variant, string> = {
  a: "Proposition A — Career Outcome",
  b: "Proposition B — No Barriers",
  c: "Proposition C — Proof-Led",
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
    description: "42 Belgium — Opportunity Landing Page Proposal",
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

  return (
    <>
      {variant === "a" && <ProposalA />}
      {variant === "b" && <ProposalB />}
      {variant === "c" && <ProposalC />}
    </>
  );
}
