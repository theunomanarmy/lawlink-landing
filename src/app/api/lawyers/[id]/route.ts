import { NextResponse } from "next/server";
import { prisma, isDatabaseAvailable } from "@/lib/prisma";
import { demoData } from "@/lib/demo-data";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Use demo data if database is not available
    if (!isDatabaseAvailable || !prisma) {
      const lawyer = await demoData.lawyerProfile.findUnique({
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
    }

    // Use database if available
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

