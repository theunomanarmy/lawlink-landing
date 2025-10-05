import { CalendarCheck2, Sparkles, UsersRound } from "lucide-react";

const steps = [
  {
    title: "Share the brief",
    description:
      "Outline the client need, deadlines, billing model, and collaboration preferences in one guided workflow.",
    icon: UsersRound,
  },
  {
    title: "Review curated matches",
    description:
      "Our AI copilot cross-references verified credentials, matter history, and availability to shortlist ideal counsel.",
    icon: Sparkles,
  },
  {
    title: "Launch the workspace",
    description:
      "Lock scope, automate NDAs, and co-edit deliverables in an encrypted workspace with your chosen experts.",
    icon: CalendarCheck2,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          A faster path to specialized co-counsel
        </h2>
        <p className="mt-3 text-lg text-muted">
          Combine trusted relationships with transparent process. LawLink does the heavy
          lifting so you can focus on outcomes, not vendor management.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="rounded-3xl border border-border bg-surface/80 p-6 text-left shadow-soft"
          >
            <div className="inline-flex rounded-full bg-accent-soft p-3 text-accent">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
