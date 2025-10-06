"use client";

import { useEffect, useMemo, useState } from "react";
import LawyerProfileCard from "@/components/LawyerProfileCard";
import { track } from "@/lib/track";
import type { Lawyer } from "@/lib/types";

const locationOptions = [
  "All",
  "Berlin",
  "Munich",
  "Hamburg",
  "Frankfurt",
  "Cologne",
  "Stuttgart",
  "Dusseldorf",
  "Leipzig",
];

const specialtyOptions = ["Corporate", "Financial", "Family", "Immigration", "Other"];
const languageOptions = ["All", "German", "Arabic", "English"];

export default function DemoSearch() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>(locationOptions[0]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>(languageOptions[0]);
  const [selectedExtraId, setSelectedExtraId] = useState<string>("");

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
        location === "All" || lawyer.location.toLowerCase() === location.toLowerCase();

      const matchesSpecialty =
        selectedSpecialties.length === 0 || selectedSpecialties.includes(lawyer.specialty);

      const matchesLanguage =
        language === "All" || lawyer.languages.some((lang) => lang.toLowerCase() === language.toLowerCase());

      return matchesLocation && matchesSpecialty && matchesLanguage;
    });
  }, [language, lawyers, location, selectedSpecialties]);

  const visibleLawyers = filteredLawyers.slice(0, 3);
  const extraLawyers = filteredLawyers.slice(3);
  const selectedExtraLawyer = useMemo(() => {
    return extraLawyers.find((lawyer) => lawyer.id === selectedExtraId) ?? null;
  }, [extraLawyers, selectedExtraId]);

  useEffect(() => {
    setSelectedExtraId("");
  }, [location, language, selectedSpecialties]);

  const handleSpecialtyToggle = (value: string) => {
    setSelectedSpecialties((current) => {
      const exists = current.includes(value);
      const next = exists ? current.filter((item) => item !== value) : [...current, value];
      track("demo_filter_change", { filter: "specialty", value: next.join(",") || "All" });
      return next;
    });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    track("demo_filter_change", { filter: "location", value });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    track("demo_filter_change", { filter: "language", value });
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
          Filter by location, specialty, and language to see how LawLink keeps the marketplace transparent.
        </p>
      </header>

      <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-soft">
        <div className="grid gap-6 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-left text-sm font-semibold text-foreground">
            <span>Location</span>
            <select
              className="rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              value={location}
              onChange={(event) => handleLocationChange(event.target.value)}
            >
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="space-y-2 text-left text-sm text-foreground">
            <legend className="font-semibold">Specialties</legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {specialtyOptions.map((option) => {
                const checked = selectedSpecialties.includes(option);
                return (
                  <label key={option} className="inline-flex items-center gap-2 text-muted">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      checked={checked}
                      onChange={() => handleSpecialtyToggle(option)}
                    />
                    <span className="text-sm text-foreground">{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <label className="flex flex-col gap-2 text-left text-sm font-semibold text-foreground">
            <span>Language</span>
            <select
              className="rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              value={language}
              onChange={(event) => handleLanguageChange(event.target.value)}
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
            visibleLawyers.map((lawyer) => (
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
        {extraLawyers.length > 0 ? (
          <div className="mt-8 space-y-4">
            <label className="flex flex-col items-start gap-2 text-sm font-semibold text-foreground">
              View another profile
              <select
                className="w-full rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:w-72"
                value={selectedExtraId}
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedExtraId(value);
                  if (value) {
                    track("profile_view", { id: value, via: "dropdown" });
                  }
                }}
              >
                <option value="">Select a lawyer to preview</option>
                {extraLawyers.map((lawyer) => (
                  <option key={lawyer.id} value={lawyer.id}>
                    {lawyer.name} · {lawyer.specialty}
                  </option>
                ))}
              </select>
            </label>
            {selectedExtraId && selectedExtraLawyer ? (
              <LawyerProfileCard
                key={selectedExtraLawyer.id}
                lawyer={selectedExtraLawyer}
                onView={(profile) => track("profile_view", { id: profile.id })}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}










