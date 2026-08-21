"use client";

import { useCallback, useEffect, useState } from "react";
import { dealRound, scorePicks } from "@/lib/quiz/deal";
import type { QuizOption } from "@/lib/quiz/options";
import { AttractScreen } from "./attract-screen";
import { FlipStage } from "./flip-stage";
import { QuizBoard } from "./quiz-board";
import { ResultsScreen } from "./results-screen";

type Phase = "attract" | "play";

export function QuizApp({ embed, kiosk }: { embed: boolean; kiosk: boolean }) {
  const [phase, setPhase] = useState<Phase>("attract");
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);

  const source = kiosk ? "kiosk" : embed ? "embed" : "web";

  const reset = useCallback(() => {
    setPhase("attract");
    setOptions([]);
    setSelectedIds([]);
    setFlipped(false);
    setScore(0);
  }, []);

  useEffect(() => {
    if (phase === "attract") return;
    let timer = window.setTimeout(reset, 90_000);
    const bump = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(reset, 90_000);
    };
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    for (const event of events) {
      window.addEventListener(event, bump, { passive: true });
    }
    return () => {
      window.clearTimeout(timer);
      for (const event of events) {
        window.removeEventListener(event, bump);
      }
    };
  }, [phase, reset]);

  function play() {
    setOptions(dealRound());
    setSelectedIds([]);
    setFlipped(false);
    setScore(0);
    setPhase("play");
  }

  function toggle(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  }

  function submit() {
    if (selectedIds.length !== 3) return;
    setScore(scorePicks(selectedIds));
    requestAnimationFrame(() => setFlipped(true));
  }

  if (phase === "attract") {
    return <AttractScreen onPlay={play} kiosk={kiosk} embed={embed} />;
  }

  return (
    <FlipStage
      flipped={flipped}
      front={
        <QuizBoard
          options={options}
          selectedIds={selectedIds}
          onToggle={toggle}
          onSubmit={submit}
        />
      }
      back={
        <ResultsScreen
          score={score}
          selectedIds={selectedIds}
          optionIds={options.map((o) => o.id)}
          source={source}
          onRestart={reset}
        />
      }
    />
  );
}
