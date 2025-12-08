import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { isDatabaseAvailable } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    // In demo mode (database unavailable), return a demo user instead of redirecting
    if (!isDatabaseAvailable) {
      return {
        id: "lawyer-01-user", // Demo user ID matching first lawyer from demo-lawyers.json
        email: "demo@lawlink.com",
        role: "LAWYER" as UserRole,
      };
    }
    redirect("/login");
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }
  return user;
}

export async function requireLawyer() {
  return requireRole(["LAWYER"]);
}

export async function requireClient() {
  return requireRole(["CLIENT"]);
}

