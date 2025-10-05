"use client";

import { useEffect, useMemo, useState } from "react";
import LawyerProfileCard from "@/components/LawyerProfileCard";
import { track } from "@/lib/track";
import type { Lawyer } from "@/lib/types";

const locationOptions = [
  "All",
  "Berlin",
  "Hamburg",
  "Cologne",
  "Munich",
  "Frankfurt",
  "Stuttgart",
  "Dusseldorf",
];

const specialtyOptions = [
  "All",
  "Family Law",
  "Criminal Law",
  "Employment Law",
  "Immigration",
  "Corporate",
];

const languageOptions = ["All", "DE", "EN", "TR", "AR", "NL"];

export default function DemoSearch() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>(locationOptions[0]);
  const [specialty, setSpecialty] = useState<string>(specialtyOptions[0]);
  const [language, setLanguage] = useState<string>(languageOptions[0]);

  useEffect(() => {
    let isMounted = true;

    async function loadLawyers() {
      try {
        const response = await fetch("/demo-lawyers.json");
        if (!response.ok) {
          throw new Error(`Failed to load demo lawyers (${response.status})`);
        }
        const data = (await response.json()) as Lawyer[];
        if (isMounted) {
          setLawyers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load demo data");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLawyers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer) => {
      const matchesLocation =
        location === "All" || lawyer.location.toLowerCase().includes(location.toLowerCase());
      const matchesSpecialty =
        specialty === "All" || lawyer.specialty.toLowerCase() === specialty.toLowerCase();
      const matchesLanguage =
        language === "All" || lawyer.languages.includes(language.toUpperCase());

      return matchesLocation && matchesSpecialty && matchesLanguage;
    });
  }, [language, lawyers, location, specialty]);

  const handleFilterChange = (filter: "location" | "specialty" | "language", value: string) => {
    track("demo_filter_change", { filter, value });
    switch (filter) {
      case "location":
        setLocation(value);
        break;
      case "specialty":
        setSpecialty(value);
        break;
      case "language":
        setLanguage(value);
        break;
    }
  };

  return (
    <section id="demo" className="container mx-auto space-y-8 px-4 py-16">
      <header className="space-y-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          Live search demo
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Explore verified German legal specialists
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted">
          Filter by location, specialty, and language to see how LawLink keeps the marketplace transparent and GDPR-first.
        </p>
      </header>

      <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm">
            <span className="text-muted">Location</span>
            <select
              className="flex-1 appearance-none bg-transparent text-foreground outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              value={location}
              onChange={(event) => handleFilterChange("location", event.target.value)}
            >
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm">
            <span className="text-muted">Specialty</span>
            <select
              className="flex-1 appearance-none bg-transparent text-foreground outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              value={specialty}
              onChange={(event) => handleFilterChange("specialty", event.target.value)}
            >
              {specialtyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm">
            <span className="text-muted">Language</span>
            <select
              className="flex-1 appearance-none bg-transparent text-foreground outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              value={language}
              onChange={(event) => handleFilterChange("language", event.target.value)}
            >
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2" role="status" aria-live="polite">
          {isLoading ? (
            <p className="col-span-full text-center text-sm text-muted">Loading sample profiles…</p>
          ) : error ? (
            <p className="col-span-full rounded-2xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted">
              {error}
            </p>
          ) : filteredLawyers.length > 0 ? (
            filteredLawyers.map((lawyer) => (
              <LawyerProfileCard
                key={lawyer.id}
                lawyer={lawyer}
                onView={(profile) => track("profile_view", { id: profile.id })}
              />
            ))
          ) : (
            <p className="col-span-full rounded-2xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted">
              No matches yet. Try adjusting filters to see more results.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
