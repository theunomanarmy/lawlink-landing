import type { LawyerProfile } from "@/lib/types";

interface LawyerProfileCardProps {
  lawyer: LawyerProfile;
  className?: string;
}

export default function LawyerProfileCard({ lawyer, className }: LawyerProfileCardProps) {
  return (
    <article
      className={`rounded-3xl border border-border bg-background/90 p-5 shadow-soft ${className ?? ""}`.trim()}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{lawyer.name}</h3>
          <p className="text-sm text-muted">{lawyer.firm}</p>
        </div>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
          {lawyer.specialization}
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-muted">
        <div>
          <dt className="font-semibold text-foreground">Location</dt>
          <dd>{lawyer.location}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Experience</dt>
          <dd>{lawyer.yearsExperience} yrs</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Rating</dt>
          <dd>{lawyer.rating.toFixed(1)} / 5.0</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Languages</dt>
          <dd>{lawyer.languages.join(", ")}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-muted">{lawyer.description}</p>
    </article>
  );
}
