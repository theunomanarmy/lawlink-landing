export async function notify(kind: string, payload: Record<string, unknown>) {
  const webhook = process.env.NOTIFY_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, payload }),
      });
    } catch (error) {
      console.error(`Failed to POST to webhook for ${kind}`, error);
      throw new Error("Failed to notify webhook");
    }
  } else {
    console.info(`[notify:${kind}]`, payload);
  }
}

export function validateBody<T extends Record<string, unknown>>(body: T, required: Array<keyof T>) {
  for (const field of required) {
    if (!body[field] || typeof body[field] !== "string" || !(body[field] as string).trim()) {
      throw new Error(`Missing field: ${String(field)}`);
    }
  }
}
