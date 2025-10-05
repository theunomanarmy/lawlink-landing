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
  const [focusArea, setFocusArea] = useState("All");

  const practiceAreas = useMemo(() => {
    const set = new Set<string>();
    lawyers.forEach((lawyer) => lawyer.practiceAreas.forEach((area) => set.add(area)));
    return ["All", ...Array.from(set).sort()];
  }, [lawyers]);

  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer) => {
      const matchesArea =
        focusArea === "All" || lawyer.practiceAreas.some((area) => area === focusArea);
      const matchesQuery = query
        ? `${lawyer.name} ${lawyer.firm} ${lawyer.location} ${lawyer.specialization}`
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      return matchesArea && matchesQuery;
    });
  }, [lawyers, focusArea, query]);

  return (
    <section id="demo" className="space-y-8">
      <header className="space-y-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          Live search demo
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Try the LawLink talent discovery experience
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted">
          Filter by practice area or keyword to explore a curated sample of verified
          profiles. Real workspaces include private feedback, compliance flags, and live
          availability signals.
        </p>
      </header>

      <div className="rounded-[32px] border border-border bg-surface/80 p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search by keyword</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              className="w-full rounded-full border border-border bg-background px-12 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              placeholder="Search by name, firm, or location"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="flex w-full items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm md:w-64">
            <span className="text-muted">Practice area</span>
            <select
              className="flex-1 appearance-none bg-transparent text-foreground outline-none"
              value={focusArea}
              onChange={(event) => setFocusArea(event.target.value)}
            >
              {practiceAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filteredLawyers.map((lawyer) => (
            <LawyerProfileCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </section>
  );
}
