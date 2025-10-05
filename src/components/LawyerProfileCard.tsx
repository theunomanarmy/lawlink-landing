import type { LawyerProfile } from "@/lib/types";

interface LawyerProfileCardProps {
  lawyer: LawyerProfile;
  className?: string;
}

export default function LawyerProfileCard({ lawyer, className }: LawyerProfileCardProps) {
  const baseClasses = "rounded-3xl border border-border bg-background/90 p-5 shadow-soft";

  return (
    <article className={`${baseClasses} ${className ?? ""}`.trim()}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{lawyer.name}</h3>
          <p className="text-sm text-muted">{lawyer.specialty}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            lawyer.verified
              ? "bg-accent-soft text-accent"
              : "bg-border/60 text-muted"
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
    </article>
  );
}
