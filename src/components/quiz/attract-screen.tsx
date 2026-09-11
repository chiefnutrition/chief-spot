"use client";

import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChiefMark } from "./chief-mark";

export function AttractScreen({
  onPlay,
  kiosk,
  embed,
}: {
  onPlay: () => void;
  kiosk: boolean;
  embed: boolean;
}) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10 sm:px-10">
      <GhostGrid />
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <ChiefMark className="h-10 sm:h-14" />
        <p className="mt-5 font-brand text-sm font-bold uppercase tracking-[0.2em] text-cream sm:mt-6 sm:text-base">
          Real feels better
        </p>
        <h1 className="splash-headline mt-14 font-display text-splash leading-display tracking-[-0.028em] text-cream sm:mt-16">
          <span className="splash-line">Win an</span>
          <br />
          <span className="splash-junk">instant prize!</span>
        </h1>
        <p className="splash-sub mt-10 max-w-4xl font-display text-[clamp(1.35rem,4.4vmin,2.6rem)] font-bold leading-tight tracking-tight text-cream sm:mt-12">
          Spot the junk, win a free product!
        </p>
        <Button
          type="button"
          size="xl"
          className="attract-play mt-14 sm:mt-16"
          onClick={onPlay}
        >
          Play
        </Button>
      </div>
      {(kiosk || !embed) && (
        <button
          type="button"
          className="absolute right-4 top-4 z-10 rounded-pill p-3 text-subtle transition-colors hover:text-fg"
          aria-label="Enter fullscreen"
          onClick={() => {
            if (!document.fullscreenElement) {
              void document.documentElement.requestFullscreen().catch(() => {});
            } else {
              void document.exitFullscreen().catch(() => {});
            }
          }}
        >
          <Maximize2 className="size-5" />
        </button>
      )}
    </main>
  );
}

function GhostGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-4 opacity-10 sm:gap-5 sm:p-8"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="rounded-pill border border-cream" />
      ))}
    </div>
  );
}
