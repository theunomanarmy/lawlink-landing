import { NextRequest, NextResponse } from "next/server";
import { requireLawyer } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const user = await requireLawyer();

    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!lawyerProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const documents = await prisma.document.findMany({
      where: { lawyerProfileId: lawyerProfile.id },
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json(documents);
  } catch (error: any) {
    if (error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Documents fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireLawyer();
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const fileType = formData.get("fileType") as string;

    if (!file || !title) {
      return NextResponse.json(
        { error: "File and title are required" },
        { status: 400 },
      );
    }

    // Validate file type
    const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(",") || [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 },
      );
    }

    // Validate file size
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || "5242880");
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large" },
        { status: 400 },
      );
    }

    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!lawyerProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = process.env.UPLOAD_DIR || "./public/uploads";
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(process.cwd(), uploadDir, fileName);

    // Ensure directory exists
    await mkdir(join(process.cwd(), uploadDir), { recursive: true });

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    const document = await prisma.document.create({
      data: {
        lawyerProfileId: lawyerProfile.id,
        fileUrl,
        fileType: fileType as any || "OTHER",
        title,
        description,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error: any) {
    if (error.message?.includes("redirect")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Document upload error:", error);
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
  }
}

