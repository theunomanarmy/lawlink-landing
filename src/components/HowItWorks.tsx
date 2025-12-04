import { Search, FolderOpen, Upload, CalendarCheck2 } from "lucide-react";

const steps = [
  {
    title: "Search your field",
    description:
      "Enter the practice area, jurisdiction, and urgency so LawLink surfaces lawyers aligned with your matter.",
    icon: Search,
  },
  {
    title: "Browse transparent portfolios",
    description:
      "Review verified profiles with credentials, languages, and recent highlights before you ever reach out.",
    icon: FolderOpen,
  },
  {
    title: "Upload your case",
    description:
      "Share briefs, documents, and goals in a private workspace so shortlisted lawyers know exactly what you need.",
    icon: Upload,
  },
  {
    title: "Book via secure channels",
    description:
      "Pick your match, confirm scope, and schedule through encrypted messaging and payments—no hidden fees.",
    icon: CalendarCheck2,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container mx-auto space-y-10 px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Match with counsel in four clear steps
        </h2>
        <p className="mt-3 text-lg text-muted">
          LawLink keeps every interaction transparent so clients and legal professionals collaborate with confidence.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="box rounded-2xl border border-border bg-surface p-6 text-left shadow-soft"
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
              <step.icon className="h-5 w-5 text-accent" />
            </span>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
