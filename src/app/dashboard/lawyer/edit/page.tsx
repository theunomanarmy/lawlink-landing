import { requireLawyer } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import LawyerProfileEditClient from "@/components/LawyerProfileEditClient";

export default async function LawyerProfileEditPage() {
  const user = await requireLawyer();

  const profile = await prisma.lawyerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return <LawyerProfileEditClient profile={profile} />;
}

