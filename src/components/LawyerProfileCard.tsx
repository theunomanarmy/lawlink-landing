"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { track } from "@/lib/track";
import type { Lawyer } from "@/lib/types";

interface LawyerProfileCardProps {
  lawyer: Lawyer;
  className?: string;
  onView?: (lawyer: Lawyer) => void;
}

export default function LawyerProfileCard({ lawyer, className, onView }: LawyerProfileCardProps) {
  const baseClasses = "rounded-3xl border border-border bg-background/90 p-5 shadow-soft transition hover:-translate-y-0.5";

  const handleCardClick = () => {
    onView?.(lawyer);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  const handleBookClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    track("book_click", { id: lawyer.id });
    window.alert("Launching soon—leave your email to get matched.");
  };

  return (
    <article
      className={`${baseClasses} ${className ?? ""}`.trim()}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{lawyer.name}</h3>
          <p className="text-sm text-muted">{lawyer.specialty}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            lawyer.verified ? "bg-accent-soft text-accent" : "bg-border/60 text-muted"
          }`}
        >
          {lawyer.verified ? "Verified" : "Pending"}
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-muted">
        <div>
          <dt className="font-semibold text-foreground">Location</dt>
          <dd>{lawyer.location}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Experience</dt>
          <dd>{lawyer.years} yrs</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Languages</dt>
          <dd>{lawyer.languages.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Anonymized cases</dt>
          <dd>{lawyer.cases_anonymized}</dd>
        </div>
      </dl>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-soft"
          onClick={handleBookClick}
        >
          Book intro call
        </button>
      </div>
    </article>
  );
}
