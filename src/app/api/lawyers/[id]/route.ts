import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const lawyer = await prisma.lawyerProfile.findUnique({
      where: { id },
      include: {
        practiceAreas: true,
        documents: {
          where: { isPublic: true },
        },
      },
    });

    if (!lawyer || !lawyer.isPublic || !lawyer.isApproved) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(lawyer);
  } catch (error) {
    console.error("Lawyer fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch lawyer" }, { status: 500 });
  }
}

