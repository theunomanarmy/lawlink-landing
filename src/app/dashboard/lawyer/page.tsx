import { redirect } from "next/navigation";
import { requireLawyer } from "@/lib/auth-helpers";
import { prisma, isDatabaseAvailable } from "@/lib/prisma";
import { demoData } from "@/lib/demo-data";
import LawyerDashboardClient from "@/components/LawyerDashboardClient";

export default async function LawyerDashboardPage() {
  const user = await requireLawyer();

  // Use demo data when database is unavailable
  if (!isDatabaseAvailable || !prisma) {
    // Use the first lawyer from demo-lawyers.json (lawyer-01)
    const profile = await demoData.lawyerProfile.findUnique({
      where: { id: "lawyer-01" },
      include: {
        practiceAreas: true,
        documents: {
          where: { isPublic: true },
          orderBy: { uploadedAt: "desc" },
        },
      },
    });

    if (!profile) {
      redirect("/register");
    }

    return <LawyerDashboardClient profile={profile} />;
  }

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

