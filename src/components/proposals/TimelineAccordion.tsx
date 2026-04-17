"use client";

import { useState, useEffect, useRef } from "react";
import type { CurriculumPhase } from "@/lib/i18n";

interface Props {
  phases: CurriculumPhase[];
}

export function TimelineAccordion({ phases }: Props) {
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set([0]));
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Auto-deploy on scroll via Intersection Observer.
  // Skip phases already in view at mount — user must scroll to trigger.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const raf = requestAnimationFrame(() => {
      phaseRefs.current.forEach((el, i) => {
        if (!el || i === 0) return; // Phase 0 is open by default
        const rect = el.getBoundingClientRect();
        const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (alreadyVisible) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setOpenPhases((prev) => new Set(prev).add(i));
              observer.disconnect();
            }
          },
          { threshold: 0.6 }
        );
        observer.observe(el);
        observers.push(observer);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-300" />

      <div className="space-y-0">
        {phases.map((phase, i) => {
          const isOpen = openPhases.has(i);
          return (
            <div
              key={phase.number}
              ref={(el) => { phaseRefs.current[i] = el; }}
            >
              {/* Header — always visible, clickable */}
              <button
                type="button"
                onClick={() => toggle(i)}
                className="relative w-full flex items-center gap-5 py-5 text-left group"
              >
                {/* Timeline dot */}
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center text-sm font-bold transition-all duration-400 ${
                    isOpen
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-white border-2 border-zinc-300 text-zinc-500 group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)]"
                  }`}
                >
                  {phase.number}
                </span>

                {/* Title + duration */}
                <div className="flex-1 flex items-baseline justify-between gap-4 min-w-0">
                  <h3
                    className={`text-lg font-bold transition-colors duration-300 ${
                      isOpen ? "text-black" : "text-zinc-600 group-hover:text-black"
                    }`}
                  >
                    {phase.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] shrink-0">
                    {phase.duration}
                  </span>
                </div>

                {/* Chevron */}
                <i
                  className={`fa-solid fa-chevron-down text-zinc-400 text-sm transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Content — collapsible */}
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  isOpen ? "max-h-[1600px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-[60px] pb-8 pr-4">
                  {phase.description.split("\n\n").map((para, pi) => {
                    const match = para.match(/^\*\*(.+?)\*\*(.*)$/);
                    const head = match ? match[1] : null;
                    const rest = match ? match[2] : para;
                    return (
                      <p key={pi} className="text-base leading-relaxed text-zinc-700 mb-6">
                        {head && <strong className="font-bold text-black">{head}</strong>}
                        {rest}
                      </p>
                    );
                  })}
                  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {phase.items.map((item) => {
                      const match = item.match(/^\*\*(.+?)\*\*(.*)$/);
                      const head = match ? match[1] : null;
                      const tail = match ? match[2] : item;
                      return (
                        <li key={item} className="flex gap-3 text-sm">
                          <i className="fa-solid fa-chevron-right text-[var(--color-primary)] mt-1 text-xs shrink-0" />
                          <span className="text-zinc-800">
                            {head && <strong className="font-bold text-black">{head}</strong>}
                            {tail}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {phase.flexibility && phase.flexibility.length > 0 && (
                    <div className="mt-8">
                      <p className="text-base font-bold text-black mb-3">Flexibility:</p>
                      <ul className="space-y-2 list-disc pl-5">
                        {phase.flexibility.map((item, i) => (
                          <li key={i} className="text-sm text-zinc-800 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {phase.globalMobility && (
                    <p className="mt-6 text-sm text-zinc-800 leading-relaxed">
                      <strong className="font-bold text-black">Global mobility:</strong>{" "}
                      {phase.globalMobility}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
