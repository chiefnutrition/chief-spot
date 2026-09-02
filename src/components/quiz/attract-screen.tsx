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
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-10">
      <GhostGrid />
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <ChiefMark className="mb-16 h-7 sm:mb-20 sm:h-8" />
        <h1 className="splash-headline font-display text-splash leading-display tracking-[-0.028em] text-cream">
          Spot the
          <br />
          junk.
        </h1>
        <p className="mt-6 max-w-md text-pretty text-base text-muted sm:text-lg">
          Nine ingredients. Spot the junk, win a prize!
        </p>
        <Button
          type="button"
          size="xl"
          className="mt-10 min-w-60"
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
