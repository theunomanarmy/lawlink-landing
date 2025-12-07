import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth();
  
  if (session) {
    // In a real implementation, you might want to invalidate the session
    // For JWT strategy, we just return success as the client will clear the cookie
  }

  return NextResponse.json({ success: true });
}

