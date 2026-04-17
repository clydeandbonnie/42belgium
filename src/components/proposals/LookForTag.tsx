"use client";

import { useEffect, useState } from "react";
import { ApplyLink } from "./ApplyLink";

interface Props {
  children: React.ReactNode;
}

export function LookForTag({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-secondary)] bg-white text-[var(--color-secondary)] text-sm font-bold uppercase tracking-wider hover:bg-[var(--color-secondary)] hover:text-white transition-colors cursor-pointer"
      >
        {children}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="You already have what it takes"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
          />

          {/* Panel */}
          <div className="relative bg-white max-w-md w-full p-8 sm:p-10 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center text-zinc-500 hover:text-black transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>

            <h3 className="text-2xl font-bold tracking-tight text-black pr-8">
              You already have what it takes.
            </h3>
            <p className="mt-5 text-base leading-relaxed text-zinc-700">
              Potential, drive, willingness to start — the rest we teach on campus.
            </p>
            <p className="mt-3 text-base leading-relaxed text-zinc-700">
              Next step: a one-hour online logic test. Free, from home, at your own pace.
            </p>

            <div className="mt-8">
              <ApplyLink className="group inline-flex items-center gap-3 bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider px-8 py-3.5 text-sm hover:brightness-110 transition-all">
                Start your application
                <i className="fa-solid fa-arrow-right text-sm transition-transform duration-200 group-hover:translate-x-1" />
              </ApplyLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
