"use client";

import Image from "next/image";

/**
 * Horizontal infinite scrolling logo strip.
 * - Logos rendered greyscale by default, colour on hover
 * - Infinite marquee via duplicated list + CSS animation
 * - Pauses on hover so the user can click through
 */

interface Partner {
  name: string;
  src: string;
}

const PARTNERS: Partner[] = [
  { name: "Belfius", src: "/assets/partners/Belfius.png" },
  { name: "Deloitte", src: "/assets/partners/Deloitte.png" },
  { name: "Proximus", src: "/assets/partners/Proximus.png" },
  { name: "Euroclear", src: "/assets/partners/Euroclear.png" },
  { name: "DPG Media", src: "/assets/partners/DPG.png" },
  { name: "Securex", src: "/assets/partners/Securex.png" },
  { name: "GBL", src: "/assets/partners/GBL.png" },
  { name: "Digipolis", src: "/assets/partners/Digipolis.png" },
  { name: "Duvel", src: "/assets/partners/Duvel.png" },
  { name: "HUBO", src: "/assets/partners/HUBO.png" },
  { name: "Interparking", src: "/assets/partners/Interparking.png" },
  { name: "CLDNC", src: "/assets/partners/CLDNC.png" },
  { name: "Port of Antwerp-Bruges", src: "/assets/partners/Port-of-Antwerp-and-Bruges.png" },
];

export function PartnerStrip() {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-white border-y border-zinc-200 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-2">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">
          They work with us
        </p>
      </div>
      <div
        className="relative py-8"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex gap-16 animate-marquee hover:[animation-play-state:paused]">
          {loop.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="shrink-0 flex items-center justify-center w-32 h-20"
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
      </div>
    </section>
  );
}
