import { NextResponse } from "next/server";
import { requireLawyer } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(
  req: Request,
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

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document || document.lawyerProfileId !== lawyerProfile.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete file from filesystem
    try {
      const filePath = join(process.cwd(), "public", document.fileUrl);
      await unlink(filePath);
    } catch (error) {
      console.warn("Failed to delete file:", error);
    }

    await prisma.document.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Document delete error:", error);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}

