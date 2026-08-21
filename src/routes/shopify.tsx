import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChiefMark } from "@/components/quiz/chief-mark";
import { getKlaviyoStatus } from "@/lib/quiz/actions";

export const Route = createFileRoute("/shopify")({ component: ShopifyGuide });

function ShopifyGuide() {
  const [origin, setOrigin] = useState("https://your-app.example");
  const [klaviyo, setKlaviyo] = useState<boolean | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
    void getKlaviyoStatus().then((s) => setKlaviyo(s.configured));
  }, []);

  const iframe = `<div style="width:100%;max-width:720px;margin:0 auto;">
  <div style="position:relative;width:100%;padding-top:160%;border-radius:24px;overflow:hidden;background:#16110D;">
    <iframe
      src="${origin}/?embed=1"
      title="Chief Spot the Junk"
      style="position:absolute;inset:0;width:100%;height:100%;border:0;"
      loading="lazy"
      allow="fullscreen"
    ></iframe>
  </div>
</div>`;

  const tv = `${origin}/?kiosk=1`;

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 py-10">
      <ChiefMark />
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream">
        Embed Spot the Junk
      </h1>
      <p className="mt-3 text-pretty text-muted">
        Drop this iframe into a Shopify custom liquid section, or load the kiosk
        URL full-screen on an event TV.
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="font-display text-lg uppercase tracking-ui text-accent">
          Shopify liquid
        </h2>
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs leading-relaxed text-fg">
          {iframe}
        </pre>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="font-display text-lg uppercase tracking-ui text-accent">
          Event TV
        </h2>
        <p className="text-sm text-muted">
          Open this URL in Chrome, then tap the fullscreen icon in the corner.
          The board auto-resets after 90 seconds of idle.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs text-fg">
          {tv}
        </pre>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-lg uppercase tracking-ui text-accent">
          Klaviyo
        </h2>
        <p className="text-sm text-muted">
          Prize emails fire from a Klaviyo list. Create a list (for example Spot
          the Junk Prize), then a private API key with profiles:write,
          lists:write, and subscriptions:write. Set these environment variables
          on the app:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs text-fg">
          {`KLAVIYO_API_KEY=pk_...
KLAVIYO_LIST_ID=XXXXXX`}
        </pre>
        <p className="text-sm text-muted">
          Build a Klaviyo flow: when someone is added to that list, send the
          prize email. We also send quiz_score (0–3) and quiz_source (web /
          embed / kiosk) as profile properties.
        </p>
        <p className="text-sm text-muted">
          Status:{" "}
          {klaviyo === null
            ? "checking…"
            : klaviyo
              ? "Klaviyo is connected. Prize signups will sync to your list."
              : "Klaviyo is not connected yet. Signups still save, but the prize email will not send until the keys are set."}
        </p>
      </section>
    </main>
  );
}
