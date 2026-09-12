"use client";

import { encode } from "uqr";

export function ClaimQr({ url, caption }: { url: string; caption: string }) {
  const qr = encode(url, { ecc: "M", border: 2 });
  const cells: string[] = [];
  for (let y = 0; y < qr.size; y += 1) {
    const row = qr.data[y];
    if (!row) continue;
    for (let x = 0; x < qr.size; x += 1) {
      if (row[x]) cells.push(`M${x} ${y}h1v1h-1z`);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-2xl bg-cream p-3">
        <svg
          role="img"
          aria-label={caption}
          viewBox={`0 0 ${qr.size} ${qr.size}`}
          className="size-56 sm:size-64"
          shapeRendering="crispEdges"
        >
          <title>{caption}</title>
          <rect width={qr.size} height={qr.size} fill="#F5F2EC" />
          <path d={cells.join(" ")} fill="#1d1d1d" />
        </svg>
      </div>
      <p className="text-center font-brand text-sm font-bold uppercase tracking-[0.16em] text-cream">
        Scan to register
      </p>
    </div>
  );
}
