import type { RoadmapItem } from "@/lib/types";

const roadmap: RoadmapItem[] = [
  {
    quarter: "Q4 2024",
    status: "done",
    summary: "Closed beta with 40 boutique firms and SOC 2 Type II audit passed.",
  },
  {
    quarter: "Q1 2025",
    status: "in-progress",
    summary: "Launch AI transcript summarizer and Salesforce integration for firm CRM sync.",
  },
  {
    quarter: "Q2 2025",
    status: "planned",
    summary: "Global expansion with multilingual marketplace support and LATAM data residency.",
  },
];

const statusCopy: Record<RoadmapItem["status"], string> = {
  done: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

export default function Roadmap() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Shipping fast with a clear roadmap
        </h2>
        <p className="mt-3 text-lg text-muted">
          We build alongside our founding customers, delivering new capabilities every
          sprint and investing heavily in reliability.
        </p>
      </header>
      <div className="relative mx-auto max-w-3xl">
        <span className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l border-border md:block" />
        <div className="space-y-6">
          {roadmap.map((item, index) => (
            <div key={item.quarter} className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className={`text-sm text-muted ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {statusCopy[item.status]}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">{item.quarter}</p>
              </div>
              <div className="hidden h-4 w-4 rounded-full border-2 border-accent bg-background md:block" />
              <div className="box rounded-2xl border border-border bg-surface p-5 text-sm text-muted shadow-soft">
                {item.summary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
