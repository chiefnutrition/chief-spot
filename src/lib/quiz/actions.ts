import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { scorePicks } from "./deal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const prizeSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().max(200),
  selectedIds: z.array(z.string().min(1)).length(3),
  optionIds: z.array(z.string().min(1)).length(9),
  source: z.enum(["web", "embed", "kiosk"]),
  website: z.string().optional(),
});

export const getKlaviyoStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { isKlaviyoConfigured } = await import("@/lib/klaviyo.server");
  return { configured: isKlaviyoConfigured() };
});

export const claimPrize = createServerFn({ method: "POST" })
  .validator((input: unknown) => prizeSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website && data.website.trim()) {
      return { ok: true as const, score: 0, synced: false };
    }
    if (!EMAIL_RE.test(data.email)) {
      throw new Error("Enter a valid email address.");
    }

    const score = scorePicks(data.selectedIds);

    const { isKlaviyoConfigured, subscribeToKlaviyo } = await import("@/lib/klaviyo.server");
    if (!isKlaviyoConfigured()) {
      throw new Error("Prize list is not connected. Add KLAVIYO_API_KEY and KLAVIYO_LIST_ID in Vercel.");
    }

    let synced = false;
    try {
      synced = await subscribeToKlaviyo({
        email: data.email,
        firstName: data.firstName,
        score,
        source: data.source,
      });
    } catch (err) {
      console.error("[klaviyo] threw", err);
    }
    if (!synced) {
      throw new Error("Could not add you to the prize list. Check the Klaviyo key and list ID, then try again.");
    }

    try {
      const { getSql } = await import("@/lib/db");
      const sql = await getSql();
      await sql`
        insert into prize_entries
          (first_name, email, score, selected_ids, option_ids, source, klaviyo_synced)
        values
          (
            ${data.firstName},
            ${data.email},
            ${score},
            ${JSON.stringify(data.selectedIds)},
            ${JSON.stringify(data.optionIds)},
            ${data.source},
            ${synced}
          )
      `;
    } catch (err) {
      console.error("[prize] database insert skipped", err);
      if (!synced) {
        throw new Error("Could not save your entry. Try again in a moment.");
      }
    }

    return { ok: true as const, score, synced };
  });
