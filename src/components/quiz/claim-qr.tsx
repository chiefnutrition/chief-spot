"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function ClaimQr({ url, caption }: { url: string; caption: string }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let alive = true;
    void QRCode.toDataURL(url, {
      width: 520,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: "#1d1d1d",
        light: "#F5F2EC",
      },
    }).then((dataUrl) => {
      if (alive) setSrc(dataUrl);
    });
    return () => {
      alive = false;
    };
  }, [url]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-2xl bg-cream p-3">
        {src ? (
          <img
            src={src}
            alt={caption}
            className="size-[min(58vw,17rem)] sm:size-64"
          />
        ) : (
          <div className="size-[min(58vw,17rem)] bg-cream sm:size-64" />
        )}
      </div>
      <p className="text-center font-brand text-sm font-bold uppercase tracking-[0.16em] text-cream">
        Scan to register
      </p>
    </div>
  );
}
