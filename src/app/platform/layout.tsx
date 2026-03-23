import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { demoData } from "@/lib/demo-data";
import PlatformNavbar from "@/components/platform/PlatformNavbar";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Use demo data when no DB or no session (demo mode)
  const isDemoMode = !process.env.DATABASE_URL || !prisma;

  const profile = isDemoMode
    ? await demoData.lawyerProfile.findUnique({ where: { id: "lawyer-01" } })
    : session?.user?.id
    ? await prisma!.lawyerProfile.findUnique({ where: { userId: session.user.id } })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <PlatformNavbar profile={profile} />
      <main className="pt-20">{children}</main>
    </div>
  );
}
