import { redirect, notFound } from "next/navigation";
import { isValidLanguage, getSlug, LANGUAGES, type Language } from "@/lib/themes";

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

// The per-language index now sends visitors to that language's opportunity
// landing page. The internal review dashboard lives at /review.
export default async function LangIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLanguage(lang)) notFound();
  redirect(`/${lang}/${getSlug("opportunity", lang as Language)}`);
}
