"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/**
 * Horizontal partner logo carousel with arrow navigation.
 * - No auto-scroll. User controls via prev/next arrows.
 * - Scroll-snap for a clean snap-to-item experience.
 * - Logos are greyscale by default, full colour on hover.
 * - Prev arrow appears once the FIRST logo has scrolled out of view.
 * - Next arrow hides when the end of the track is reached.
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
  const firstLogoRef = useRef<HTMLDivElement>(null);
  const [canNext, setCanNext] = useState(true);
  // Prev arrow shows only once the FIRST logo has scrolled out of the viewport.
  const [firstVisible, setFirstVisible] = useState(true);

  const updateNext = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateNext();
    const el = scrollerRef.current;
    const first = firstLogoRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateNext, { passive: true });
    window.addEventListener("resize", updateNext);

    let observer: IntersectionObserver | undefined;
    if (first) {
      observer = new IntersectionObserver(
        ([entry]) => setFirstVisible(entry.isIntersecting),
        { root: el, threshold: 0.01 }
      );
      observer.observe(first);
    }

    return () => {
      el.removeEventListener("scroll", updateNext);
      window.removeEventListener("resize", updateNext);
      observer?.disconnect();
    };
  }, []);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="bg-white border-y border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">
          They work with us
        </p>

        <div className="relative">
          {/* Prev arrow - only when the first logo is no longer visible */}
          {!firstVisible && (
            <button
              type="button"
              onClick={() => scrollBy(-SCROLL_STEP)}
              aria-label="Previous partners"
              className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center text-zinc-500 opacity-40 hover:opacity-100 hover:text-[var(--color-primary)] transition-all"
            >
              <i className="fa-solid fa-chevron-left text-base" />
            </button>
          )}

          {/* Right fade mask - hides any partial logo peeking at the right edge (arrow stays above via z-10) */}
          {canNext && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/90 to-transparent z-[5]"
            />
          )}
          {/* Left fade mask - mirror effect once the user has scrolled past the start */}
          {!firstVisible && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/90 to-transparent z-[5]"
            />
          )}

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="flex gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 no-scrollbar"
          >
            {PARTNERS.map((partner, i) => (
              <div
                key={partner.name}
                ref={i === 0 ? firstLogoRef : undefined}
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
              onClick={() => scrollBy(SCROLL_STEP)}
              aria-label="Next partners"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center text-zinc-500 opacity-40 hover:opacity-100 hover:text-[var(--color-primary)] transition-all"
            >
              <i className="fa-solid fa-chevron-right text-base" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
