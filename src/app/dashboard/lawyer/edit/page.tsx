import { redirect } from "next/navigation";
import { requireLawyer } from "@/lib/auth-helpers";
import { prisma, isDatabaseAvailable } from "@/lib/prisma";
import LawyerProfileEditClient from "@/components/LawyerProfileEditClient";

export default async function LawyerProfileEditPage() {
  const user = await requireLawyer();

  if (!isDatabaseAvailable || !prisma) {
    redirect("/register");
  }

  const profile = await prisma.lawyerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return <LawyerProfileEditClient profile={profile} />;
}

