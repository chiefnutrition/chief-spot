import { createFileRoute } from "@tanstack/react-router";
import { QuizApp } from "@/components/quiz/quiz-app";

type Search = {
  embed?: boolean;
  kiosk?: boolean;
};

function flag(value: unknown): true | undefined {
  if (value === true || value === "1" || value === "true") return true;
  return undefined;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    embed: flag(search.embed),
    kiosk: flag(search.kiosk),
  }),
  component: Home,
});

function Home() {
  const { embed, kiosk } = Route.useSearch();
  return <QuizApp embed={Boolean(embed)} kiosk={Boolean(kiosk)} />;
}
