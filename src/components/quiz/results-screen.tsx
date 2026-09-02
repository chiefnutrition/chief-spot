"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { claimPrize } from "@/lib/quiz/actions";
import { optionsById, RESULT_COPY, resultKey, formatElapsed, speedLine } from "@/lib/quiz/deal";
import type { QuizOption } from "@/lib/quiz/options";
import { cn } from "@/lib/utils";
import { ChiefMark } from "./chief-mark";

function useKeyboardInset() {
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const vv = window.visualViewport;
      if (!vv) {
        root.style.setProperty("--keyboard-inset", "0px");
        return;
      }
      const inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      root.style.setProperty("--keyboard-inset", `${Math.round(inset)}px`);
    };
    sync();
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);
    return () => {
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      root.style.setProperty("--keyboard-inset", "0px");
    };
  }, []);
}

function scrollFieldIntoView(el: HTMLElement) {
  const reveal = () => {
    el.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
  };
  requestAnimationFrame(reveal);
  window.setTimeout(reveal, 320);
}

export function ResultsScreen({
  score,
  selectedIds,
  optionIds,
  elapsedMs,
  source,
  onRestart,
}: {
  score: number;
  selectedIds: string[];
  optionIds: string[];
  elapsedMs: number;
  source: "web" | "embed" | "kiosk";
  onRestart: () => void;
}) {
  const copy = RESULT_COPY[resultKey(score)];
  const selected = optionsById(selectedIds);
  const junkOnBoard = optionsById(optionIds).filter((o) => o.kind === "junk");
  const missedJunk = junkOnBoard.filter((o) => !selectedIds.includes(o.id));

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useKeyboardInset();

  useEffect(() => {
    if (!done) return;
    const timer = window.setTimeout(onRestart, 12_000);
    return () => window.clearTimeout(timer);
  }, [done, onRestart]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      await claimPrize({
        data: {
          firstName,
          email,
          selectedIds,
          optionIds,
          source,
          website,
        },
      });
      setDone(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not submit. Try again.";
      toast.error(message);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6 py-10 text-center">
        <ChiefMark />
        <p className="mt-6 font-callout text-score tracking-kicker text-cream">
          You're in
        </p>
        <h2 className="mt-3 font-display text-hero font-bold leading-display tracking-[-0.028em] text-cream">
          Prize
          <br />
          incoming.
        </h2>
        <p className="mt-5 max-w-md text-pretty text-muted">
          Watch your inbox, {firstName.trim() || "chief"}. Real food. No junk. A
          little something from us.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-10"
          onClick={onRestart}
        >
          Play again
        </Button>
      </div>
    );
  }

  return (
    <div
      className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-6 landscape:lg:gap-8 landscape:lg:px-10"
      style={{ paddingBottom: "calc(1.5rem + var(--keyboard-inset, 0px))" }}
    >
      <ChiefMark className="h-7 sm:h-8" />

      <div className="flex flex-col gap-6 landscape:lg:grid landscape:lg:grid-cols-2 landscape:lg:items-start landscape:lg:gap-12">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="order-1 flex scroll-mb-[calc(var(--keyboard-inset,0px)+1.5rem)] scroll-mt-6 flex-col gap-4 rounded-2xl border border-border bg-surface p-6 landscape:lg:order-2 sm:p-8"
        >
          <p className="font-display text-xl font-bold tracking-[-0.018em] text-cream">
            Claim your prize
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              required
              maxLength={80}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
              placeholder="Sam"
              className="scroll-mb-[calc(var(--keyboard-inset,0px)+2rem)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={200}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
              placeholder="you@email.com"
              className="scroll-mb-[calc(var(--keyboard-inset,0px)+2rem)]"
            />
          </div>
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="xl"
            className="mt-1 w-full"
            disabled={pending || !firstName.trim() || !email.trim()}
          >
            {pending ? "Sending…" : "Get my prize"}
          </Button>
          <p className="text-center text-xs leading-relaxed text-subtle">
            By submitting you agree to hear from Chief. Unsubscribe any time. Your
            prize email is on the way after you join the list.
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="font-sans text-sm text-muted underline decoration-from-font underline-offset-4 transition-colors hover:text-fg"
          >
            Skip and play again
          </button>
        </form>

        <div className="order-2 landscape:lg:order-1">
          <p className="font-callout text-score tracking-kicker text-cream tabular-nums">
            {copy.kicker}
          </p>
          <h2 className="mt-2 font-display text-result font-bold leading-[1.08] tracking-[-0.022em] text-cream">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-md text-pretty text-muted">{copy.body}</p>
          <p className="mt-4 max-w-md text-pretty text-sm text-cream">
            <span className="font-callout text-score tabular-nums">{formatElapsed(elapsedMs)}</span>
            {". "}
            {speedLine(elapsedMs, score)}
          </p>

          <ul className="mt-5 space-y-2">
            {selected.map((option) => (
              <PickRow key={option.id} option={option} />
            ))}
          </ul>

          <div className="mt-5 space-y-3">
            {missedJunk.length > 0 ? (
              <>
                <p className="font-callout text-xs tracking-[0.18em] text-subtle">Missed junk</p>
                {missedJunk.map((option) => (
                  <p
                    key={option.id}
                    className="max-w-md text-pretty text-sm leading-relaxed text-muted"
                  >
                    <span className="font-semibold text-cream">
                      {option.label}:
                    </span>{" "}
                    {option.why}
                  </p>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function PickRow({ option }: { option: QuizOption }) {
  const hit = option.kind === "junk";
  return (
    <li
      className={cn(
        "rounded-2xl border px-4 py-3",
        hit ? "border-success/40 bg-success/10" : "border-danger/35 bg-danger/10",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-sans text-sm font-semibold tracking-normal text-fg">
          {option.label}
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 font-callout text-badge tracking-[0.14em]",
            hit ? "text-success" : "text-danger",
          )}
        >
          {hit ? <Check className="size-3.5" /> : <X className="size-3.5" />}
          {hit ? "Junk" : "Not junk"}
        </span>
      </div>
      {option.why ? (
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{option.why}</p>
      ) : null}
    </li>
  );
}
