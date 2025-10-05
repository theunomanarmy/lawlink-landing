import { NextResponse } from "next/server";
import { notify } from "../waitlist/helpers";

function validate(body: Record<string, unknown>) {
  if (!body.email || typeof body.email !== "string" || !body.email.trim()) {
    throw new Error("Missing email");
  }
  if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
    throw new Error("Missing message");
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    validate(data);
    await notify("feedback", data as Record<string, unknown>);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("feedback submission failed", error);
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 400 });
  }
}
