"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { LawyerProfile } from "@/lib/types";
import LawyerProfileCard from "@/components/LawyerProfileCard";

interface DemoSearchProps {
  lawyers: LawyerProfile[];
}

export default function DemoSearch({ lawyers }: DemoSearchProps) {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const specialties = useMemo(() => {
    const unique = new Set<string>();
    lawyers.forEach((lawyer) => unique.add(lawyer.specialty));
    return ["All", ...Array.from(unique).sort()];
  }, [lawyers]);

  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer) => {
      if (specialty !== "All" && lawyer.specialty !== specialty) {
        return false;
      }
      if (onlyVerified && !lawyer.verified) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = `${lawyer.name} ${lawyer.specialty} ${lawyer.location} ${lawyer.languages.join(",")}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [lawyers, specialty, onlyVerified, query]);

  return (
    <section id="demo" className="space-y-8">
      <header className="space-y-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          Live search demo
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Explore verified German legal specialists
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted">
          Filter by specialty, verification status, or keyword to preview how LawLink surfaces the right
          expertise. Production data includes deeper compliance signals and live availability.
        </p>
      </header>

      <div className="rounded-[32px] border border-border bg-surface/80 p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search by keyword</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              className="w-full rounded-full border border-border bg-background px-12 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              placeholder="Search by name, city, or language"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="flex w-full items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm md:w-64">
            <span className="text-muted">Specialty</span>
            <select
              className="flex-1 appearance-none bg-transparent text-foreground outline-none"
              value={specialty}
              onChange={(event) => setSpecialty(event.target.value)}
            >
              {specialties.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="flex w-full items-center justify-between gap-3 rounded-full border border-border bg-background px-4 py-3 text-sm md:w-60">
            <span className="text-muted">Verified only</span>
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={onlyVerified}
              onChange={(event) => setOnlyVerified(event.target.checked)}
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filteredLawyers.map((lawyer) => (
            <LawyerProfileCard key={lawyer.id} lawyer={lawyer} />
          ))}
          {filteredLawyers.length === 0 ? (
            <p className="col-span-full rounded-3xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted">
              No matches yet. Try broadening your filters to discover more talent.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
