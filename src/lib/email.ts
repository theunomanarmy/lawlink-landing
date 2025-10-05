// server-only email helper (App Router)
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const toEmail = process.env.NOTIFY_TO_EMAIL;

if (!resendKey) {
  console.warn("RESEND_API_KEY missing – email notifications disabled.");
}

export async function sendNotificationEmail(
  kind: "waitlist" | "feedback",
  payload: Record<string, unknown>,
) {
  if (!resendKey || !toEmail) {
    return { ok: false, reason: "missing-env" } as const;
  }

  const resend = new Resend(resendKey);
  const subject = `LawLink: New ${kind} submission`;
  const text = JSON.stringify(payload, null, 2);

  const result = await resend.emails.send({
    from: "LawLink <no-reply@lawlink.app>",
    to: [toEmail],
    subject,
    text,
  });

  return { ok: true, id: result.data?.id ?? null } as const;
}
