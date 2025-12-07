"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PracticeArea = {
  id: string;
  name: string;
  caseCount: number;
};

type Lawyer = {
  id: string;
  fullName: string;
  overview: string | null;
  location: string | null;
  practiceArea: string | null;
  profilePhotoUrl: string | null;
  yearsExperience: number | null;
  languages: string[];
  isPublic: boolean;
  isApproved: boolean;
  practiceAreas: PracticeArea[];
};

export default function LawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [practiceAreaFilter, setPracticeAreaFilter] = useState("");

  useEffect(() => {
    fetchLawyers();
  }, [locationFilter, practiceAreaFilter]);

  const fetchLawyers = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (locationFilter) params.append("location", locationFilter);
      if (practiceAreaFilter) params.append("practiceArea", practiceAreaFilter);

      const response = await fetch(`/api/lawyers/public?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setLawyers(data.lawyers || []);
      }
    } catch (error) {
      console.error("Failed to fetch lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLawyers();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <Navbar />
      <section className="container mx-auto px-4 pb-16 pt-28">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Live directory</p>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Find a Lawyer
              </h1>
              <p className="max-w-3xl text-base text-muted">
                Browse verified lawyers and explore their expertise and case experience.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface/95 p-4 shadow-soft">
            <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-4">
              <input
                type="text"
                placeholder="Search by name or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="text"
                placeholder="Filter by practice area..."
                value={practiceAreaFilter}
                onChange={(e) => setPracticeAreaFilter(e.target.value)}
                className="rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="rounded-full bg-accent px-4 py-2 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c]"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted">Loading lawyers...</p>
          </div>
        ) : lawyers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted">No lawyers found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {lawyers.map((lawyer) => (
              <Link
                key={lawyer.id}
                href={`/lawyers/${lawyer.id}`}
                className="block"
              >
                <article className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {lawyer.profilePhotoUrl && (
                        <img
                          src={lawyer.profilePhotoUrl}
                          alt={lawyer.fullName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-semibold leading-tight">{lawyer.fullName}</h2>
                          {lawyer.practiceArea && (
                            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                              {lawyer.practiceArea}
                            </span>
                          )}
                          {lawyer.isApproved && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                              <BadgeCheck size={14} />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted">
                          {lawyer.location && <span>{lawyer.location}</span>}
                          {lawyer.yearsExperience && (
                            <span className="ml-2">• {lawyer.yearsExperience} years experience</span>
                          )}
                          {lawyer.languages.length > 0 && (
                            <span className="ml-2">• {lawyer.languages.join(", ")}</span>
                          )}
                        </p>
                        {lawyer.overview && (
                          <p className="text-sm text-muted line-clamp-2">{lawyer.overview}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
