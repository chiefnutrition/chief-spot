"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINE_ONE = "Win an";
const LINE_TWO = "instant prize!";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?";
const STRIP = 12;

function reelChars(target: string, seed: number): string[] {
  const chars: string[] = [];
  let x = (seed * 1103515245 + 12345) >>> 0;
  for (let i = 0; i < STRIP - 1; i += 1) {
    x = (x * 1664525 + 1013904223) >>> 0;
    chars.push(GLYPHS[x % GLYPHS.length] ?? "X");
  }
  chars.push(target);
  return chars;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function Reel({
  char,
  index,
  round,
}: {
  char: string;
  index: number;
  round: number;
}) {
  if (char === " ") {
    return <span className="slot-space" aria-hidden="true" />;
  }
  const strip = reelChars(char, round * 97 + index * 13 + char.charCodeAt(0));
  return (
    <span
      className="slot-reel"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <span
        className="slot-strip"
        style={{
          animationDelay: `${index * 55}ms`,
          ["--slot-steps" as string]: String(strip.length - 1),
        }}
      >
        {strip.map((glyph, i) => (
          <span key={`${round}-${i}`} className="slot-glyph">
            {glyph}
          </span>
        ))}
      </span>
    </span>
  );
}

export function SlotHeadline() {
  const reduced = usePrefersReducedMotion();
  const [round, setRound] = useState(0);
  const [jackpot, setJackpot] = useState(false);

  useEffect(() => {
    if (reduced) return;
    setJackpot(false);
    const lastIndex = LINE_ONE.replaceAll(" ", "").length + LINE_TWO.replaceAll(" ", "").length - 1;
    const lockMs = lastIndex * 55 + 900;
    const jack = window.setTimeout(() => setJackpot(true), lockMs);
    const next = window.setTimeout(() => setRound((n) => n + 1), lockMs + 4200);
    return () => {
      window.clearTimeout(jack);
      window.clearTimeout(next);
    };
  }, [round, reduced]);

  if (reduced) {
    return (
      <h1 className="splash-headline font-display text-splash leading-display tracking-[-0.028em] text-cream">
        Win an
        <br />
        instant prize!
      </h1>
    );
  }

  let reel = 0;
  const row = (text: string, prize?: boolean) => (
    <span className={cn("slot-row", prize && "slot-row-prize")} aria-hidden="true">
      {Array.from(text).map((char, i) => {
        const index = reel;
        if (char !== " ") reel += 1;
        return <Reel key={`${text}-${i}-${round}`} char={char} index={index} round={round} />;
      })}
    </span>
  );

  return (
    <h1
      className={cn(
        "slot-headline splash-headline font-display text-splash leading-none tracking-[-0.028em] text-cream",
        jackpot && "is-jackpot",
      )}
      aria-label="Win an instant prize!"
    >
      {row(LINE_ONE)}
      {row(LINE_TWO, true)}
    </h1>
  );
}
