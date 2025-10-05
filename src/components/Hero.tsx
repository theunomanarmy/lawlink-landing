import Link from "next/link";

export default function Hero() {
  return (
    <section className="gap-10 text-center sm:text-left lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-center" id="hero">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent">
          AI-first legal collaborations
        </span>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Find the right specialist lawyer in minutes, not weeks.
        </h1>
        <p className="text-lg text-muted sm:text-xl">
          LawLink is the co-counsel marketplace for law firms building flexible teams.
          Discover vetted experts, collaborate securely, and deliver work faster with
          AI-assisted workflows.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#demo"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:opacity-95"
          >
            Explore demo talent
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-base font-semibold text-foreground transition hover:bg-accent-soft"
          >
            Compare plans
          </Link>
        </div>
        <div className="flex items-center justify-center gap-8 text-xs text-muted sm:justify-start">
          <div>
            <p className="text-2xl font-semibold text-foreground">250+</p>
            <p>Verified specialists</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">48 hrs</p>
            <p>Average match time</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">SOC 2</p>
            <p>Security posture</p>
          </div>
        </div>
      </div>
      <div className="mx-auto hidden max-w-lg rounded-[32px] border border-border bg-surface/80 p-6 shadow-soft lg:block">
        <div className="space-y-4 text-left">
          <p className="text-sm font-semibold text-muted">Active collaboration</p>
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-medium text-muted">Brief summary</p>
            <p className="mt-2 text-base font-semibold">
              Series B fintech expanding to LATAM
            </p>
            <p className="mt-3 text-sm text-muted">
              Needs data privacy counsel across Brazil and Mexico for localized onboarding
              flows. Seeking bilingual partner-level leadership.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-medium text-muted">Matched experts</p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start justify-between">
                <span>
                  <span className="font-semibold">Diego Fernandez</span>
                  <span className="block text-muted">Privacy & Cybersecurity</span>
                </span>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  Confirmed
                </span>
              </li>
              <li className="flex items-start justify-between">
                <span>
                  <span className="font-semibold">Samira Al-Khatib</span>
                  <span className="block text-muted">Global expansion</span>
                </span>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  Pending intro
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
