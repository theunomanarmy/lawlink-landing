import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseDistributionPieChart from "@/components/CaseDistributionPieChart";
import { prisma, isDatabaseAvailable } from "@/lib/prisma";
import { demoData } from "@/lib/demo-data";
import { BadgeCheck } from "lucide-react";

export default async function LawyerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Use demo data if database is not available
  let lawyer;
  if (!isDatabaseAvailable || !prisma) {
    lawyer = await demoData.lawyerProfile.findUnique({
      where: { id },
      include: {
        practiceAreas: true,
        documents: {
          where: { isPublic: true },
          orderBy: { uploadedAt: "desc" },
        },
      },
    });

    // Sort practice areas by caseCount desc
    if (lawyer) {
      lawyer = {
        ...lawyer,
        practiceAreas: [...lawyer.practiceAreas].sort(
          (a, b) => b.caseCount - a.caseCount
        ),
      };
    }
  } else {
    lawyer = await prisma.lawyerProfile.findUnique({
      where: { id },
      include: {
        practiceAreas: {
          orderBy: { caseCount: "desc" },
        },
        documents: {
          where: { isPublic: true },
          orderBy: { uploadedAt: "desc" },
        },
      },
    });
  }

  if (!lawyer || !lawyer.isPublic || !lawyer.isApproved) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <Navbar />
      <section className="container mx-auto px-4 pb-16 pt-28">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft mb-8">
            <div className="flex items-start gap-6 mb-6">
              {lawyer.profilePhotoUrl && (
                <img
                  src={lawyer.profilePhotoUrl}
                  alt={lawyer.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-semibold">{lawyer.fullName}</h1>
                  {lawyer.practiceArea && (
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                      {lawyer.practiceArea}
                    </span>
                  )}
                  {lawyer.isApproved && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                      <BadgeCheck size={16} />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-muted mb-2">
                  {lawyer.location && <span>{lawyer.location}</span>}
                  {lawyer.yearsExperience && (
                    <span className="ml-2">• {lawyer.yearsExperience} years experience</span>
                  )}
                  {lawyer.languages.length > 0 && (
                    <span className="ml-2">• Languages: {lawyer.languages.join(", ")}</span>
                  )}
                </p>
                {lawyer.website && (
                  <a
                    href={lawyer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                  >
                    {lawyer.website}
                  </a>
                )}
              </div>
            </div>

            {lawyer.overview && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <p className="text-muted whitespace-pre-wrap">{lawyer.overview}</p>
              </div>
            )}
          </div>

          {/* Case Distribution */}
          {lawyer.practiceAreas.length > 0 && (
            <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft mb-8">
              <h2 className="text-xl font-semibold mb-6">Case Distribution</h2>
              <CaseDistributionPieChart practiceAreas={lawyer.practiceAreas} />
            </div>
          )}

          {/* Documents */}
          {lawyer.documents.length > 0 && (
            <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft">
              <h2 className="text-xl font-semibold mb-6">Certificates & Documents</h2>
              <div className="space-y-3">
                {lawyer.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-background border border-border"
                  >
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      {doc.description && (
                        <p className="text-sm text-muted mt-1">{doc.description}</p>
                      )}
                    </div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-sm"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

