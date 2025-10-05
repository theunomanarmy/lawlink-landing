import { Bot, FileCheck2, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    title: "Verified expertise",
    description:
      "Every profile is reference-checked, credentialed, and continuously scored across engagements.",
    icon: ShieldCheck,
  },
  {
    title: "AI co-pilot",
    description:
      "Draft matter briefs, summarize transcripts, and translate client updates instantly inside the workspace.",
    icon: Bot,
  },
  {
    title: "Compliance workflows",
    description:
      "Automate NDAs, conflicts, and engagement letters with configurable approval chains.",
    icon: FileCheck2,
  },
  {
    title: "Shared matter rooms",
    description:
      "Align in real-time with secure messaging, versioned docs, and billing dashboards.",
    icon: Users,
  },
];

export default function Features() {
  return (
    <section id="features" className="space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Purpose-built for modern legal operators
        </h2>
        <p className="mt-3 text-lg text-muted">
          Replace patchwork software with a single operating system that respects client
          confidentiality while accelerating delivery.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {features.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="group rounded-3xl border border-border bg-surface/80 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
          >
            <Icon className="text-accent" size={22} />
            <h3 className="mt-4 text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
