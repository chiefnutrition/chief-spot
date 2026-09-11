type SubscribeInput = {
  email: string;
  firstName: string;
  score: number;
  source: string;
  prize: "instant_product" | "two_gifts";
};

const KLAVIYO_BASE = "https://a.klaviyo.com/api";
const REVISIONS = ["2026-01-15", "2025-04-15", "2024-10-15"] as const;

function credentials() {
  const apiKey = process.env.KLAVIYO_API_KEY?.trim();
  const listId = process.env.KLAVIYO_LIST_ID?.trim();
  const revision = process.env.KLAVIYO_API_REVISION?.trim() || REVISIONS[0];
  return { apiKey, listId, revision };
}

export function isKlaviyoConfigured(): boolean {
  const { apiKey, listId } = credentials();
  return Boolean(apiKey && listId);
}

async function klaviyoFetch(
  path: string,
  init: RequestInit & { apiKey: string; revision: string },
): Promise<{ ok: boolean; status: number; json: Record<string, unknown> | null; text: string }> {
  const url = `${KLAVIYO_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Klaviyo-API-Key ${init.apiKey}`,
      revision: init.revision,
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      ...(init.headers ?? {}),
    },
  });
  const text = await response.text().catch(() => "");
  let json: Record<string, unknown> | null = null;
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : null;
  } catch {
    json = null;
  }
  if (!response.ok) {
    console.error("[klaviyo]", init.method ?? "GET", path, response.status, text.slice(0, 800));
  }
  return { ok: response.ok, status: response.status, json, text };
}

function profileIdFrom(json: Record<string, unknown> | null): string | null {
  const data = json?.data as { id?: string } | undefined;
  return typeof data?.id === "string" && data.id ? data.id : null;
}

function propertiesOf(input: SubscribeInput) {
  return {
    quiz_score: input.score,
    quiz_source: input.source,
    quiz_prize: input.prize,
  };
}

async function upsertProfile(
  input: SubscribeInput,
  apiKey: string,
  revision: string,
): Promise<string | null> {
  const payload = {
    data: {
      type: "profile",
      attributes: {
        email: input.email,
        first_name: input.firstName,
        properties: propertiesOf(input),
      },
    },
  };
  let created = await klaviyoFetch("/profile-import", {
    method: "POST",
    apiKey,
    revision,
    body: JSON.stringify(payload),
  });
  if (!created.ok && (created.status === 404 || created.status === 405)) {
    created = await klaviyoFetch("/profiles", {
      method: "POST",
      apiKey,
      revision,
      body: JSON.stringify(payload),
    });
  }
  const createdId = profileIdFrom(created.json);
  if (created.ok && createdId) return createdId;

  const filter = encodeURIComponent(`equals(email,"${input.email}")`);
  const existing = await klaviyoFetch(`/profiles/?filter=${filter}`, {
    method: "GET",
    apiKey,
    revision,
  });
  const list = existing.json?.data as { id?: string }[] | undefined;
  const existingId = list?.[0]?.id;
  return typeof existingId === "string" && existingId ? existingId : null;
}

async function addProfileToList(
  profileId: string,
  listId: string,
  apiKey: string,
  revision: string,
): Promise<boolean> {
  const result = await klaviyoFetch(`/lists/${encodeURIComponent(listId)}/relationships/profiles`, {
    method: "POST",
    apiKey,
    revision,
    body: JSON.stringify({
      data: [{ type: "profile", id: profileId }],
    }),
  });
  return result.ok || result.status === 409;
}

async function subscribeEmail(
  input: SubscribeInput,
  listId: string,
  apiKey: string,
  revision: string,
): Promise<boolean> {
  const consentedAt = new Date().toISOString();
  const result = await klaviyoFetch("/profile-subscription-bulk-create-jobs", {
    method: "POST",
    apiKey,
    revision,
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: "Chief Spot the Junk Quiz",
          historical_import: false,
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email: input.email,
                  first_name: input.firstName,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: "SUBSCRIBED",
                        consented_at: consentedAt,
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: listId,
            },
          },
        },
      },
    }),
  });
  return result.ok || result.status === 202 || result.status === 409;
}

async function trackPrizeEvent(
  input: SubscribeInput,
  apiKey: string,
  revision: string,
): Promise<boolean> {
  const result = await klaviyoFetch("/events", {
    method: "POST",
    apiKey,
    revision,
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: propertiesOf(input),
          unique_id: `${input.email}:${input.prize}:${Date.now()}`,
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Spot the Junk Prize",
              },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: input.email,
                first_name: input.firstName,
                properties: propertiesOf(input),
              },
            },
          },
        },
      },
    }),
  });
  return result.ok || result.status === 202;
}

export async function subscribeToKlaviyo(input: SubscribeInput): Promise<boolean> {
  const { apiKey, listId, revision } = credentials();
  if (!apiKey || !listId) return false;

  const tried = [revision, ...REVISIONS.filter((item) => item !== revision)];
  let lastError = "unknown";

  for (const rev of tried) {
    try {
      const profileId = await upsertProfile(input, apiKey, rev);
      const subscribed = await subscribeEmail(input, listId, apiKey, rev);
      const onList = profileId ? await addProfileToList(profileId, listId, apiKey, rev) : false;
      const tracked = await trackPrizeEvent(input, apiKey, rev);

      if (subscribed || tracked || onList) {
        if (!subscribed) console.error("[klaviyo] subscribe job failed; list/event may still have worked", rev);
        if (!tracked) console.error("[klaviyo] prize event failed", rev);
        return true;
      }
      lastError = `revision ${rev} did not subscribe, track, or add to list`;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.error("[klaviyo] revision failed", rev, lastError);
    }
  }

  console.error("[klaviyo] all attempts failed", lastError);
  return false;
}
