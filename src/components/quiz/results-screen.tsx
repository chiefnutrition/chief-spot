"use client";

import { useEffect, useState } from "react";
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
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-10 text-center">
        <ChiefMark />
        <p className="mt-6 font-display text-sm uppercase tracking-kicker text-cream">
          You're in
        </p>
        <h2 className="mt-3 font-display text-hero font-semibold leading-display tracking-tight text-cream">
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
          className="mt-10 uppercase tracking-ui"
          onClick={onRestart}
        >
          Play again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-8 px-5 py-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
      <div>
        <ChiefMark className="h-7 sm:h-8" />
        <p className="mt-8 font-display text-sm uppercase tracking-kicker text-cream tabular-nums">
          {copy.kicker}
        </p>
        <h2 className="mt-2 font-display text-result font-semibold leading-display tracking-tight text-cream">
          {copy.title}
        </h2>
        <p className="mt-3 max-w-md text-pretty text-muted">{copy.body}</p>
        <p className="mt-4 max-w-md text-pretty text-sm text-cream">
          <span className="font-display font-semibold tabular-nums">{formatElapsed(elapsedMs)}</span>
          {" — "}
          {speedLine(elapsedMs, score)}
        </p>

        <ul className="mt-6 space-y-2">
          {selected.map((option) => (
            <PickRow key={option.id} option={option} />
          ))}
        </ul>

        <div className="mt-6 space-y-4">
          {missedJunk.length > 0 ? (
            <>
              <p className="text-xs uppercase tracking-ui text-subtle">Missed junk</p>
              {missedJunk.map((option) => (
                <p
                  key={option.id}
                  className="max-w-md text-pretty text-sm leading-relaxed text-muted"
                >
                  <span className="font-semibold uppercase tracking-wide text-cream">
                    {option.label}:
                  </span>{" "}
                  {option.why}
                </p>
              ))}
            </>
          ) : null}
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-cream">
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
            placeholder="Sam"
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
            placeholder="you@email.com"
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
          className="mt-1 w-full uppercase tracking-ui"
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
          className="font-display text-sm text-muted underline decoration-from-font underline-offset-4 transition-colors hover:text-fg"
        >
          Skip and play again
        </button>
      </form>
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
        <span className="text-sm font-medium text-fg">{option.label}</span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-wider",
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
