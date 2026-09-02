"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizOption } from "@/lib/quiz/options";
import { QUESTION } from "@/lib/quiz/options";
import { ChiefMark } from "./chief-mark";
import { OPTION_ICONS } from "./icons";

export function QuizBoard({
  options,
  selectedIds,
  onToggle,
  onSubmit,
}: {
  options: QuizOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSubmit: () => void;
}) {
  const remaining = 3 - selectedIds.length;
  const ready = selectedIds.length === 3;

  return (
    <div className="flex h-dvh flex-col overflow-hidden px-3 py-3 sm:px-5 sm:py-4">
      <header className="flex shrink-0 items-end justify-between gap-3 px-1">
        <div>
          <ChiefMark className="h-6 sm:h-7" />
          <h1 className="mt-4 max-w-xl font-display text-question font-bold leading-tight tracking-[-0.02em] text-cream sm:mt-5">
            {QUESTION}
          </h1>
        </div>
        <p className="shrink-0 font-callout text-score tracking-kicker text-cream tabular-nums">
          {selectedIds.length}/3
        </p>
      </header>

      <div className="mt-3 grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-2 sm:mt-4 sm:gap-3">
        {options.map((option) => {
          const selectedIndex = selectedIds.indexOf(option.id);
          const selected = selectedIndex >= 0;
          const locked = ready && !selected;
          const Icon = OPTION_ICONS[option.icon];
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              disabled={locked}
              onClick={() => onToggle(option.id)}
              className={cn(
                "relative flex min-h-0 flex-col items-center justify-center gap-1 rounded-pill border px-2 text-center transition-[transform,background-color,border-color,color,opacity] duration-150 ease-out sm:gap-2 sm:px-3",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/70",
                "active:enabled:scale-96",
                selected
                  ? "border-cream bg-cream text-ink shadow-tile"
                  : "border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-2",
                locked && "opacity-40",
              )}
            >
              {selected && (
                <span className="absolute left-1.5 top-1.5 flex size-6 items-center justify-center rounded-pill bg-ink text-xs font-semibold text-cream tabular-nums sm:left-2 sm:top-2">
                  {selectedIndex + 1}
                </span>
              )}
              {selected && (
                <Check
                  className="absolute right-1.5 top-1.5 size-4 text-ink sm:right-2 sm:top-2"
                  strokeWidth={2.5}
                />
              )}
              <Icon className="size-5 text-brand sm:size-8" strokeWidth={1.75} />
              <span
                className={cn(
                  "font-sans font-semibold leading-tight tracking-normal tabular-nums",
                  option.label.length > 24 ? "text-ingredient-long" : "text-ingredient",
                )}
                style={{ hyphens: "none", overflowWrap: "break-word" }}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex h-16 shrink-0 items-center justify-center sm:mt-4 sm:h-18">
        {ready ? (
          <Button
            type="button"
            size="xl"
            className="w-full max-w-md"
            onClick={onSubmit}
          >
            Submit
          </Button>
        ) : (
          <p className="text-sm tracking-normal text-subtle">
            {remaining === 3
              ? "Tap three to lock in"
              : remaining === 1
                ? "One more"
                : "Two more"}
          </p>
        )}
      </div>
    </div>
  );
}
