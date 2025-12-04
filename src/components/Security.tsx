const bullets = [
  "GDPR-first posture; privacy by design",
  "Encryption in transit & at rest (roadmap)",
  "Independent security testing & certifications (roadmap)",
];

export default function Security() {
  return (
    <section id="security" className="container mx-auto space-y-8 px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Compliance & security at the core.
        </h2>
        <p className="mt-3 text-lg text-muted">
          LawLink is built to keep legal data protected while making collaboration effortless.
        </p>
      </header>
      <div className="box mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <ul className="space-y-3 text-sm text-muted">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">
          Disclaimer: LawLink is a marketplace, not a law firm, and does not provide legal advice.
        </p>
      </div>
    </section>
  );
}
