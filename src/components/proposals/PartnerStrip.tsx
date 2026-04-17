"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/**
 * Horizontal partner logo carousel with arrow navigation.
 * - No auto-scroll. User controls via prev/next arrows.
 * - Scroll-snap for a clean snap-to-item experience.
 * - Logos are greyscale by default, full colour on hover.
 * - Arrows disable when at the start/end of the track.
 */

interface Partner {
  name: string;
  src: string;
}

const PARTNERS: Partner[] = [
  { name: "Belfius", src: "/assets/partners/Belfius.png" },
  { name: "Deloitte", src: "/assets/partners/Deloitte.png" },
  { name: "Proximus", src: "/assets/partners/Proximus.png" },
  { name: "DPG Media", src: "/assets/partners/DPG.png" },
  { name: "Securex", src: "/assets/partners/Securex.png" },
  { name: "GBL", src: "/assets/partners/GBL.png" },
  { name: "Euroclear", src: "/assets/partners/Euroclear.png" },
  { name: "Digipolis", src: "/assets/partners/Digipolis.png" },
  { name: "Duvel", src: "/assets/partners/Duvel.png" },
  { name: "HUBO", src: "/assets/partners/HUBO.png" },
  { name: "Interparking", src: "/assets/partners/Interparking.png" },
  { name: "CLDNC", src: "/assets/partners/CLDNC.png" },
  { name: "Port of Antwerp-Bruges", src: "/assets/partners/Port-of-Antwerp-and-Bruges.png" },
];

const SCROLL_STEP = 480; // pixels per arrow click

export function PartnerStrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  // Suppress the prev arrow until the user has actually scrolled forward at least once.
  const [hasMoved, setHasMoved] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      // Only mark as "moved" once the user has actually advanced past the start —
      // avoids scroll-snap noise or sub-pixel micro-scrolls flipping the flag.
      if (el.scrollLeft > 4) setHasMoved(true);
      updateArrows();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const onNext = () => {
    setHasMoved(true);
    scrollBy(SCROLL_STEP);
  };

  return (
    <section className="bg-white border-y border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">
          They work with us
        </p>

        <div className="relative">
          {/* Prev arrow - only once the user has actually scrolled forward */}
          {hasMoved && canPrev && (
            <button
              type="button"
              onClick={() => scrollBy(-SCROLL_STEP)}
              aria-label="Previous partners"
              className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center text-zinc-600 hover:text-[var(--color-primary)] transition-colors"
            >
              <i className="fa-solid fa-chevron-left text-base" />
            </button>
          )}

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="flex gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory px-14 no-scrollbar"
          >
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="shrink-0 flex items-center justify-center w-32 h-20 snap-start"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={128}
                  height={80}
                  className="max-h-full w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Next arrow - only when scroll-forward is possible */}
          {canNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next partners"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center text-zinc-600 hover:text-[var(--color-primary)] transition-colors"
            >
              <i className="fa-solid fa-chevron-right text-base" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
