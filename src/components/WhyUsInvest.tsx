const differentiators = [
  {
    title: "Trust-first network",
    detail:
      "Verified counsel with transparent performance data unlocks confident staffing for sensitive matters.",
  },
  {
    title: "AI leverage with guardrails",
    detail:
      "Matter-aware copilots accelerate workflows while preserving attorney oversight and auditability.",
  },
  {
    title: "Category momentum",
    detail:
      "Firms are rebalancing fixed payroll with on-demand expertise. LawLink makes the shift operationally viable.",
  },
];

export default function WhyUsInvest() {
  return (
    <section className="space-y-8">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Why teams and investors are betting on LawLink
        </h2>
        <p className="mt-3 text-lg text-muted">
          The legal industry is undergoing its biggest workforce transition in decades.
          LawLink helps firms stay profitable while exceeding client expectations.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-3">
        {differentiators.map((item) => (
          <div key={item.title} className="rounded-3xl border border-border bg-surface/80 p-6 shadow-soft">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
