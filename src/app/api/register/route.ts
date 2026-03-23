import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      role,
      // Lawyer fields
      fullName,
      overview,
      location,
      practiceArea,
      yearsExperience,
      languages,
      // Client fields
      name,
      preferredArea,
      language,
    } = body;

    // Validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 },
      );
    }

    if (!["LAWYER", "CLIENT"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Password strength check
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 },
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user and profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          role,
        },
      });

      if (role === "LAWYER") {
        if (!fullName) {
          throw new Error("Full name is required for lawyers");
        }

        await tx.lawyerProfile.create({
          data: {
            userId: user.id,
            fullName,
            overview,
            location,
            practiceArea,
            yearsExperience: yearsExperience ? parseInt(yearsExperience) : null,
            languages: languages || [],
          },
        });
      } else if (role === "CLIENT") {
        if (!name) {
          throw new Error("Name is required for clients");
        }

        await tx.clientProfile.create({
          data: {
            userId: user.id,
            name,
            preferredArea,
            language,
          },
        });
      }

      return user;
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: result.id,
          email: result.email,
          role: result.role,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 },
    );
  }
}

