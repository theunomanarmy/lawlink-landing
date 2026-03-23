import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const location = searchParams.get("location");
    const practiceArea = searchParams.get("practiceArea");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: Prisma.LawyerProfileWhereInput = {
      isPublic: true,
      isApproved: true,
      user: {
        role: "LAWYER",
      },
    };

    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    if (practiceArea) {
      where.practiceArea = { contains: practiceArea, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { overview: { contains: search, mode: "insensitive" } },
        { practiceArea: { contains: search, mode: "insensitive" } },
      ];
    }

    const [lawyers, total] = await Promise.all([
      prisma.lawyerProfile.findMany({
        where,
        include: {
          practiceAreas: true,
          documents: {
            where: { isPublic: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.lawyerProfile.count({ where }),
    ]);

    return NextResponse.json({
      lawyers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Public lawyers fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch lawyers" }, { status: 500 });
  }
}

