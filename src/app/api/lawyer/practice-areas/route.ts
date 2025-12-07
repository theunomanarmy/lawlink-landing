import { NextRequest, NextResponse } from "next/server";
import { requireLawyer } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await requireLawyer();

    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!lawyerProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const practiceAreas = await prisma.practiceArea.findMany({
      where: { lawyerProfileId: lawyerProfile.id },
      orderBy: { caseCount: "desc" },
    });

    return NextResponse.json(practiceAreas);
  } catch (error: any) {
    if (error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Practice areas fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch practice areas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireLawyer();
    const body = await req.json();
    const { name, caseCount } = body;

    if (!name || caseCount === undefined) {
      return NextResponse.json(
        { error: "Name and case count are required" },
        { status: 400 },
      );
    }

    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!lawyerProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const practiceArea = await prisma.practiceArea.create({
      data: {
        lawyerProfileId: lawyerProfile.id,
        name,
        caseCount: parseInt(caseCount),
      },
    });

    return NextResponse.json(practiceArea, { status: 201 });
  } catch (error: any) {
    if (error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Practice area create error:", error);
    return NextResponse.json({ error: "Failed to create practice area" }, { status: 500 });
  }
}

