import { Button } from "@/components/ui/Button";

interface CtaSectionProps {
  title: string;
  description: string;
  cta: string;
  ctaHref?: string;
}

export function CtaSection({
  title,
  description,
  cta,
  ctaHref = "#apply",
}: CtaSectionProps) {
  return (
    <section className="bg-black dark:bg-white" id="apply">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl dark:text-black">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-300 dark:text-zinc-600">
            {description}
          </p>
          <div className="mt-10">
            <Button
              href={ctaHref}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
