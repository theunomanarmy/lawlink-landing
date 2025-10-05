const features = [
  {
    title: "Tailored search & profiles",
    bullets: [
      "Verified, legal-only network with transparent credentials",
      "Filters for specialty, language, availability, and jurisdiction",
    ],
  },
  {
    title: "Built-in tools (roadmap)",
    bullets: [
      "Secure chat, document sharing, and calendar scheduling",
      "Workflow automations purpose-built for matters",
    ],
  },
  {
    title: "Community & networking",
    bullets: [
      "Posts, internships, and collaboration requests",
      "Firm-to-firm and lawyer-to-client introductions",
    ],
  },
  {
    title: "Emergency feature (planned)",
    bullets: [
      "Best-effort routing for urgent matters",
      "Not a hotline—prioritized introductions with clear expectations",
    ],
  },
  {
    title: "24/7 access requests",
    bullets: [
      "Submit matters any time with transparent timelines",
      "Availability requests surfaced to right-fit professionals",
    ],
  },
];

export default function Features() {
  return (
    <section id="features" className="space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to collaborate confidently
        </h2>
        <p className="mt-3 text-lg text-muted">
          Built for lawyers, firms, and clients who need a trusted network without the overhead or uncertainty.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-border bg-surface/80 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {feature.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
