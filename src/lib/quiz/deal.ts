import {
  JUNK_OPTIONS,
  QUIZ_OPTIONS,
  REAL_OPTIONS,
  type QuizOption,
} from "./options";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = copy[i];
    const b = copy[j];
    if (a === undefined || b === undefined) continue;
    copy[i] = b;
    copy[j] = a;
  }
  return copy;
}

export function dealRound(): QuizOption[] {
  const junk = shuffle(JUNK_OPTIONS).slice(0, 3);
  const real = shuffle(REAL_OPTIONS).slice(0, 6);
  return shuffle([...junk, ...real]);
}

export function scorePicks(selectedIds: string[]): number {
  const junkIds = new Set(JUNK_OPTIONS.map((o) => o.id));
  return selectedIds.filter((id) => junkIds.has(id)).length;
}

export function optionsById(ids: string[]): QuizOption[] {
  const map = new Map(QUIZ_OPTIONS.map((o) => [o.id, o]));
  return ids.flatMap((id) => {
    const option = map.get(id);
    return option ? [option] : [];
  });
}

export type ResultKey = "all" | "two" | "one" | "none";

export function resultKey(score: number): ResultKey {
  if (score >= 3) return "all";
  if (score === 2) return "two";
  if (score === 1) return "one";
  return "none";
}

export const RESULT_COPY: Record<
  ResultKey,
  { kicker: string; title: string; body: string }
> = {
  all: {
    kicker: "3 of 3",
    title: "Clean sweep.",
    body: "You spotted every bit of junk. That's Chief thinking — real food, no ultra-processed anything.",
  },
  two: {
    kicker: "2 of 3",
    title: "Almost legendary.",
    body: "Two out of three. The pack-flipper in you is waking up.",
  },
  one: {
    kicker: "1 of 3",
    title: "One for the real food.",
    body: "You caught one. Flip more packs — the junk hides in plain sight.",
  },
  none: {
    kicker: "0 of 3",
    title: "The junk almost won.",
    body: "No stress. That's why we exist — extraordinarily clean snacks, nothing to hide.",
  },
};
