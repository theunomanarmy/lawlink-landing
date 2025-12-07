import { requireClient } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function ClientDashboardPage() {
  const user = await requireClient();

  const profile = await prisma.clientProfile.findUnique({
    where: { userId: user.id },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <Navbar />
      <section className="container mx-auto px-4 pb-16 pt-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Welcome back, {profile?.name || user.email}</h1>
            <p className="text-muted">Find the legal help you need</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/lawyers"
              className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">Find a Lawyer</h2>
              <p className="text-muted">
                Browse our directory of verified lawyers and find the right professional for your needs.
              </p>
            </Link>

            <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft">
              <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
              <p className="text-muted mb-4">
                {profile?.location && `Location: ${profile.location}`}
                {profile?.preferredArea && ` • Preferred Area: ${profile.preferredArea}`}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

