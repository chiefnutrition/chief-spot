import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FlipStage({
  flipped,
  front,
  back,
}: {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
}) {
  return (
    <div className="flip-stage">
      <div className={cn("flip-card", flipped && "is-flipped")}>
        <div className="flip-face flip-face-front">{front}</div>
        <div className="flip-face flip-face-back">{back}</div>
      </div>
    </div>
  );
}
