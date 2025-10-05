import Link from "next/link";

const waitlistHref = "mailto:hello@lawlink.ai?subject=LawLink%20Early%20Access";

export default function Hero() {
  return (
    <section
      id="hero"
      className="gap-12 text-center sm:text-left lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
    >
      <div className="space-y-7">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Find the right lawyer. Fast, transparent, and secure.
        </h1>
        <p className="text-lg text-muted sm:text-xl">
          A dedicated network for legal professionals and clients — no hidden fees, GDPR-first.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={waitlistHref}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:opacity-95"
          >
            Get Early Access
          </Link>
          <Link
            href="#demo"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-base font-semibold text-foreground transition hover:bg-accent-soft"
          >
            Explore the demo
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium sm:justify-start">
          {[
            "GDPR-first",
            "24/7 availability (best-effort)",
            "No hidden fees",
          ].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-border bg-background px-4 py-2 text-muted shadow-soft"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto hidden max-w-lg rounded-[32px] border border-border bg-surface/80 p-6 shadow-soft lg:block">
        <div className="space-y-4 text-left">
          <p className="text-sm font-semibold text-muted">Active request overview</p>
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-medium text-muted">Client brief</p>
            <p className="mt-2 text-base font-semibold">
              Relocation package for Berlin fintech team
            </p>
            <p className="mt-3 text-sm text-muted">
              Needs multilingual counsel to draft employment agreements and review relocation policies under German law.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-medium text-muted">Matching pipeline</p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start justify-between">
                <span>
                  <span className="font-semibold">Dr. Anna Keller</span>
                  <span className="block text-muted">Family & Employment</span>
                </span>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  Introduced
                </span>
              </li>
              <li className="flex items-start justify-between">
                <span>
                  <span className="font-semibold">Miriam Ozdemir</span>
                  <span className="block text-muted">Immigration</span>
                </span>
                <span className="rounded-full bg-border/70 px-3 py-1 text-xs font-semibold text-muted">
                  Reviewing
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
