interface SocialProofProps {
  title: string;
  stats: { value: string; label: string }[];
}

export function SocialProof({ title, stats }: SocialProofProps) {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-white">
          {title}
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <p className="text-4xl font-bold text-black sm:text-5xl dark:text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
