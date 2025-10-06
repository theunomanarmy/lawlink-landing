export default function Hero() {
  return (
    <section
      id="hero"
      className="container mx-auto grid gap-12 px-4 py-16 text-center sm:text-left lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
    >
      <div className="space-y-7">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          A Platform Dedicated to The Letter of The Law
        </h1>
      </div>
      <div className="mx-auto hidden max-w-lg rounded-2xl border border-border bg-surface/80 p-6 shadow-soft lg:block">
        <div className="space-y-4 text-left">
          <p className="text-sm font-semibold text-muted">Active request overview</p>
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-sm font-medium text-muted">Client brief</p>
            <p className="mt-2 text-base font-semibold">
              Relocation package for Berlin fintech team
            </p>
            <p className="mt-3 text-sm text-muted">
              Needs multilingual counsel to draft employment agreements and review relocation policies under German law.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
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



