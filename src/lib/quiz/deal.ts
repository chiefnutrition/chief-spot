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
    body: "You spotted every bit of junk. That's Chief thinking. Real food, no ultra-processed anything.",
  },
  two: {
    kicker: "2 of 3",
    title: "Almost legendary.",
    body: "Two out of three. The pack-flipper in you is waking up.",
  },
  one: {
    kicker: "1 of 3",
    title: "One for the real food.",
    body: "You caught one. Flip more packs. The junk hides in plain sight.",
  },
  none: {
    kicker: "0 of 3",
    title: "The junk almost won.",
    body: "No stress. That's why we exist. Extraordinarily clean snacks, nothing to hide.",
  },
};

const SPEED_LINES = {
  lightning: [
    "Sheesh, you know your ingredients!",
    "Label nerd. We like you already.",
    "That was a blur. Pack-flipper certified.",
    "Blink and you junk-spotted.",
    "Fastest flip in the aisle.",
  ],
  quick: [
    "Clean and decisive. The junk didn't stand a chance.",
    "That's a confident shopper.",
    "No second-guessing. Respect.",
    "You read labels like a menu.",
    "Quick eyes. Chief energy.",
  ],
  steady: [
    "Thoughtful. That's how the good stuff gets found.",
    "A proper look. That's the move.",
    "Not rushed, not lost. Solid pack-flip.",
    "You gave the fine print a fair go.",
  ],
  slow: [
    "Took your time there, pack flipper.",
    "The ingredients weren't going anywhere.",
    "Slow flip. We still love a careful reader.",
    "Studying the label like it's literature.",
  ],
  glacial: [
    "Did you write a thesis on maltitol?",
    "We've aged. The junk's still junk.",
    "That was a meditation. Namaste, pack flipper.",
    "Take a seat. You earned it.",
  ],
} as const;

const MISS_LINES = {
  lightning: [
    "Slow down, legend. Speed isn't a food group.",
    "Sheesh. Hit the brakes. The junk is still in there.",
    "Fast hands, fuzzy labels. Slow the flip.",
    "Easy. The pack isn't a race.",
  ],
  quick: [
    "Slow down a beat. You almost had it.",
    "Quick, but the junk snuck through. Look twice.",
    "Easy tiger. Give the fine print a second.",
    "Slow the cart. One of those is ultra processed.",
  ],
  steady: [
    "Close. Another second on the pack wouldn't hurt.",
    "Slow it down next time. The junk hides in the middle.",
    "You looked. Look once more.",
    "Not a sprint, not quite a win. Flip it slower.",
  ],
  slow: [
    "You took your time and still let junk through. Brutal.",
    "Slow was the move. Suspicion was the missing bit.",
    "Plenty of time. Not enough “what's that doing in a bar?”",
    "Careful reader, messy picks. Slow down and doubt harder.",
  ],
  glacial: [
    "Long think, still a miss. Maybe even slower next time.",
    "We waited. The junk still won.",
    "Thesis complete. Next draft: actually spot the junk.",
    "That was a sit-down exam. The junk still graduated.",
  ],
} as const;

export type SpeedBand = keyof typeof SPEED_LINES;

export function speedBand(elapsedMs: number): SpeedBand {
  if (elapsedMs < 5_000) return "lightning";
  if (elapsedMs < 10_000) return "quick";
  if (elapsedMs < 15_000) return "steady";
  if (elapsedMs < 25_000) return "slow";
  return "glacial";
}

export function formatElapsed(elapsedMs: number): string {
  const seconds = Math.max(0, elapsedMs) / 1000;
  if (seconds < 10) return `${seconds.toFixed(1)}s`;
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return `${minutes}m ${rest}s`;
}

/** Perfect score keeps the speed praise. Any miss tells them to slow down. */
export function speedLine(elapsedMs: number, score: number): string {
  const band = speedBand(elapsedMs);
  const lines = score >= 3 ? SPEED_LINES[band] : MISS_LINES[band];
  const index = Math.abs(Math.floor(elapsedMs)) % lines.length;
  return lines[index] ?? lines[0];
}
