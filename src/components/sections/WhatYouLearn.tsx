interface WhatYouLearnProps {
  title: string;
  outcomes: string[];
}

export function WhatYouLearn({ title, outcomes }: WhatYouLearnProps) {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-white">
          {title}
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {outcomes.map((outcome, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                {i + 1}
              </span>
              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {outcome}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
