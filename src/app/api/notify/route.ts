import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/email";

const webhookUrl = process.env.NOTIFY_WEBHOOK_URL; // optional

type SanitizedPayload = {
  kind: "waitlist" | "feedback" | "booking";
  email: string;
  role: string;
  country: string;
  specialties: string[];
  message: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  _ts: string;
  caseType: string;
  details: string;
  lawyerId: string;
  lawyerName: string;
  lawyerSpecialty: string;
  attachmentName: string;
  attachmentType: string;
  attachmentSize: number;
  attachmentBase64: string;
};

type RawPayload = {
  kind?: "feedback" | "booking" | "waitlist";
  email?: unknown;
  role?: unknown;
  country?: unknown;
  specialties?: unknown;
  message?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  phone?: unknown;
  address?: unknown;
  caseType?: unknown;
  details?: unknown;
  lawyerId?: unknown;
  lawyerName?: unknown;
  lawyerSpecialty?: unknown;
  attachmentName?: unknown;
  attachmentType?: unknown;
  attachmentSize?: unknown;
  attachmentBase64?: unknown;
};

function sanitize(input: unknown): SanitizedPayload {
  const obj: RawPayload = (typeof input === "object" && input) ? (input as RawPayload) : {};
  const kind = obj.kind === "feedback" ? "feedback" : obj.kind === "booking" ? "booking" : "waitlist";
  return {
    kind,
    email: String(obj.email || "").slice(0, 200),
    role: String(obj.role || "").slice(0, 100),
    country: String(obj.country || "").slice(0, 100),
    specialties: Array.isArray(obj.specialties) ? obj.specialties.slice(0, 12) : [],
    message: String(obj.message || "").slice(0, 4000),
    firstName: String(obj.firstName || "").slice(0, 120),
    lastName: String(obj.lastName || "").slice(0, 120),
    phone: String(obj.phone || "").slice(0, 60),
    address: String(obj.address || "").slice(0, 200),
    caseType: String(obj.caseType || "").slice(0, 120),
    details: String(obj.details || "").slice(0, 4000),
    lawyerId: String(obj.lawyerId || "").slice(0, 200),
    lawyerName: String(obj.lawyerName || "").slice(0, 200),
    lawyerSpecialty: String(obj.lawyerSpecialty || "").slice(0, 200),
    attachmentName: String(obj.attachmentName || "").slice(0, 255),
    attachmentType: String(obj.attachmentType || "").slice(0, 120),
    attachmentSize: typeof obj.attachmentSize === "number" ? obj.attachmentSize : 0,
    attachmentBase64:
      typeof obj.attachmentBase64 === "string"
        ? obj.attachmentBase64.slice(0, 500000)
        : "",
    _ts: new Date().toISOString(),
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const payload = sanitize(body);

    console.log("[notify] incoming:", payload);

    const emailRes = await sendNotificationEmail(payload.kind, payload);

    let webhookRes: { ok: boolean; status?: number } | null = null;
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        webhookRes = { ok: res.ok, status: res.status };
      } catch (error) {
        console.error("[notify] webhook error", error);
        webhookRes = { ok: false };
      }
    }

    return NextResponse.json({
      ok: true,
      email: emailRes,
      forwarded: webhookRes,
    });
  } catch (error) {
    console.error("[notify] error:", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}





