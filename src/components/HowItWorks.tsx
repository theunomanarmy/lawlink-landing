const steps = [
  {
    title: "Tell us your need",
    description: "Share practice area, location, timelines, and any language requirements in minutes.",
  },
  {
    title: "See matched lawyers",
    description: "Review verified highlights, anonymized case history, and availability signals instantly.",
  },
  {
    title: "Book securely",
    description: "Lock terms with transparent pricing. No hidden fees—just clear collaboration.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container mx-auto space-y-10 px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          How it works in three simple steps
        </h2>
        <p className="mt-3 text-lg text-muted">
          LawLink keeps the process transparent, so clients and legal professionals can collaborate with confidence.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-border bg-surface/80 p-6 text-left shadow-soft"
          >
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
