import { cn } from "@/lib/utils";

export function ChiefMark({ className }: { className?: string }) {
  return (
    <img
      src="/chief-logo.svg"
      alt="Chief"
      className={cn("block h-7 w-auto sm:h-8", className)}
    />
  );
}
