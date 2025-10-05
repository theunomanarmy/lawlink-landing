import { NextResponse } from "next/server";
import { notify, validateBody } from "./helpers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    validateBody(data, ["firstName", "lastName", "email"]);
    await notify("waitlist", data as Record<string, unknown>);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("waitlist submission failed", error);
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 400 });
  }
}
