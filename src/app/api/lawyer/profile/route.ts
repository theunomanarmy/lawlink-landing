import { NextRequest, NextResponse } from "next/server";
import { requireLawyer } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const user = await requireLawyer();

    const profile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
      include: {
        practiceAreas: true,
        documents: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireLawyer();
    const formData = await req.formData();

    const fullName = formData.get("fullName") as string;
    const overview = formData.get("overview") as string | null;
    const location = formData.get("location") as string | null;
    const practiceArea = formData.get("practiceArea") as string | null;
    const yearsExperience = formData.get("yearsExperience") as string | null;
    const languagesStr = formData.get("languages") as string | null;
    const website = formData.get("website") as string | null;
    const phone = formData.get("phone") as string | null;
    const isPublic = formData.get("isPublic") === "true";
    const photo = formData.get("photo") as File | null;

    let profilePhotoUrl: string | undefined;

    // Handle photo upload
    if (photo && photo.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(photo.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (photo.size > maxSize) {
        return NextResponse.json({ error: "File too large" }, { status: 400 });
      }

      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = process.env.UPLOAD_DIR || "./public/uploads";
      const fileName = `profile-${user.id}-${Date.now()}.${photo.name.split(".").pop()}`;
      const filePath = join(process.cwd(), uploadDir, fileName);

      await mkdir(join(process.cwd(), uploadDir), { recursive: true });
      await writeFile(filePath, buffer);

      profilePhotoUrl = `/uploads/${fileName}`;
    }

    const updateData: Prisma.LawyerProfileUpdateInput = {
      ...(fullName && { fullName }),
      ...(overview !== null && { overview }),
      ...(location !== null && { location }),
      ...(practiceArea !== null && { practiceArea }),
      ...(yearsExperience && { yearsExperience: parseInt(yearsExperience) }),
      ...(languagesStr && { languages: JSON.parse(languagesStr) }),
      ...(website !== null && { website }),
      ...(phone !== null && { phone }),
      isPublic,
      ...(profilePhotoUrl && { profilePhotoUrl }),
    };

    const profile = await prisma.lawyerProfile.update({
      where: { userId: user.id },
      data: updateData,
    });

    return NextResponse.json(profile);
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

