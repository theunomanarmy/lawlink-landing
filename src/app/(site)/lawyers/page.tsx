import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Lawyer, PortfolioItem } from "@/lib/types";
import demoLawyers from "@/../public/demo-lawyers.json";

const lawyers = demoLawyers as Lawyer[];

const statLabel = (label: string, value: string | number) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
    <dd className="text-sm text-foreground">{value}</dd>
  </div>
);

function PortfolioList({ portfolio }: { portfolio: PortfolioItem[] }) {
  if (!portfolio.length) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl bg-surface/80 p-4 ring-1 ring-border/60">
      <p className="text-sm font-semibold text-foreground">Portfolio highlights</p>
      <ul className="mt-3 space-y-3">
        {portfolio.map((item, index) => (
          <li
            key={`${item.title}-${index}`}
            className="rounded-lg bg-surface/80 p-3 shadow-soft ring-1 ring-border/60"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.summary}</p>
              </div>
              {item.year ? <span className="text-xs text-muted">{item.year}</span> : null}
            </div>
            {item.outcome ? (
              <p className="mt-2 text-xs font-semibold text-accent">Outcome: {item.outcome}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LawyerRow({ lawyer }: { lawyer: Lawyer }) {
  const portfolio = lawyer.portfolio ?? [];

  return (
    <article className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {lawyer.location} • {lawyer.languages.join(", ")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold leading-tight">{lawyer.name}</h2>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              {lawyer.specialty}
            </span>
            {lawyer.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                <BadgeCheck size={14} />
                Verified
              </span>
            ) : (
              <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted">
                Pending verification
              </span>
            )}
          </div>
          <p className="text-sm text-muted">
            {lawyer.years} years experience • {lawyer.cases_anonymized} anonymized cases
          </p>
        </div>
        <div className="flex gap-3 text-sm font-semibold text-foreground">
          <span className="rounded-full bg-surface/80 px-3 py-2">Available</span>
          <span className="rounded-full bg-surface/80 px-3 py-2">Responds in &lt;24h</span>
        </div>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {statLabel("Location", lawyer.location)}
        {statLabel("Languages", lawyer.languages.join(", "))}
        {statLabel("Experience", `${lawyer.years} years`)}
        {statLabel("Specialty", lawyer.specialty)}
        {statLabel("Anonymized cases", lawyer.cases_anonymized)}
        {statLabel("Profile status", lawyer.verified ? "Verified" : "Pending")}
      </dl>

      <PortfolioList portfolio={portfolio} />
    </article>
  );
}

export const metadata = {
  title: "Lawyers and portfolios",
  description: "Browse LawLink's verified lawyers, see their expertise, and review recent portfolio highlights.",
};

export default function LawyersPage() {
  const sortedLawyers = [...lawyers].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <Navbar />
      <section className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Live directory</p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Meet the lawyers and explore their portfolio work
            </h1>
            <p className="max-w-3xl text-base text-muted">
              View every lawyer from the demo search, along with anonymized highlights that showcase their recent work
              and outcomes.
            </p>
          </div>
          <Link
            href="/#demo"
            className="inline-flex items-center gap-2 rounded-full border border-accent bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <ArrowLeft size={16} />
            Back to demo
          </Link>
        </div>

        <div className="mt-10 space-y-5">
          {sortedLawyers.map((lawyer) => (
            <LawyerRow key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
