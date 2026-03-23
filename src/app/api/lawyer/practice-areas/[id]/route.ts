import { NextRequest, NextResponse } from "next/server";
import { requireLawyer } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireLawyer();
    const { id } = await params;
    const body = await req.json();
    const { name, caseCount } = body;

    // Verify ownership
    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!lawyerProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const practiceArea = await prisma.practiceArea.findUnique({
      where: { id },
    });

    if (!practiceArea || practiceArea.lawyerProfileId !== lawyerProfile.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updated = await prisma.practiceArea.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(caseCount !== undefined && { caseCount: parseInt(caseCount) }),
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Practice area update error:", error);
    return NextResponse.json({ error: "Failed to update practice area" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireLawyer();
    const { id } = await params;

    // Verify ownership
    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!lawyerProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const practiceArea = await prisma.practiceArea.findUnique({
      where: { id },
    });

    if (!practiceArea || practiceArea.lawyerProfileId !== lawyerProfile.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.practiceArea.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Practice area delete error:", error);
    return NextResponse.json({ error: "Failed to delete practice area" }, { status: 500 });
  }
}

