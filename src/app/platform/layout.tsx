import { requireLawyer } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import PlatformNavbar from "@/components/platform/PlatformNavbar";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireLawyer();
  
  const profile = await prisma.lawyerProfile.findUnique({
    where: { userId: user.id },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <PlatformNavbar profile={profile} />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}

