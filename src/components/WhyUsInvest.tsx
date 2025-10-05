const whyUs = [
  "Legal-only focus with verified professionals",
  "Transparency across profiles, pricing, and timelines",
  "GDPR-first data handling and security posture",
  "Community features that build multi-sided value",
];

const whyInvest = [
  "Germany/NL wedge with EU expansion roadmap",
  "Multi-revenue model: memberships, ads, platform fees",
  "Lean operations with disciplined budgeting",
  "Strong demand for trusted legal marketplaces",
];

const investorHref = "mailto:invest@lawlink.ai?subject=LawLink%20Investor%20Deck";

export default function WhyUsInvest() {
  return (
    <section id="for-clients" className="container mx-auto space-y-8 px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Why partner with LawLink—whether you are joining or investing
        </h2>
        <p className="mt-3 text-lg text-muted">
          Built in Germany with an EU-first mindset, LawLink brings clarity to every side of the legal marketplace.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-soft">
          <h3 className="text-xl font-semibold">Why choose LawLink</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {whyUs.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-soft">
          <h3 className="text-xl font-semibold">Why invest in LawLink</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {whyInvest.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href={investorHref}
          className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Request Investor Deck
        </a>
      </div>
    </section>
  );
}
