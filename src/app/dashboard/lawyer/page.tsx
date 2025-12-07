import { redirect } from "next/navigation";
import { requireLawyer } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import LawyerDashboardClient from "@/components/LawyerDashboardClient";

export default async function LawyerDashboardPage() {
  const user = await requireLawyer();

  const profile = await prisma.lawyerProfile.findUnique({
    where: { userId: user.id },
    include: {
      practiceAreas: {
        orderBy: { caseCount: "desc" },
      },
      documents: {
        orderBy: { uploadedAt: "desc" },
        take: 5,
      },
    },
  });

  if (!profile) {
    redirect("/register");
  }

  return <LawyerDashboardClient profile={profile} />;
}

