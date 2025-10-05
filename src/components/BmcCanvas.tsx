const canvas = [
  {
    title: "Customer segments",
    content: [
      "Managing partners at boutique firms",
      "Legal operations at growth companies",
      "PE-backed portfolio legal teams",
    ],
  },
  {
    title: "Value propositions",
    content: [
      "Verified marketplace of specialist counsel",
      "AI-accelerated co-counsel workflows",
      "Single vendor compliance + billing",
    ],
  },
  {
    title: "Channels",
    content: [
      "Targeted co-marketing with bar associations",
      "Founder communities and private equity networks",
      "Product-led onboarding via referrals",
    ],
  },
  {
    title: "Revenue streams",
    content: [
      "Subscription license per internal seat",
      "Success fee on external engagements",
      "Premium compliance add-ons",
    ],
  },
  {
    title: "Key partners",
    content: [
      "Cyber insurance providers",
      "E-discovery and CLM platforms",
      "Regulatory intelligence vendors",
    ],
  },
  {
    title: "Cost structure",
    content: [
      "Safety & trust operations",
      "Infrastructure and AI model hosting",
      "Go-to-market and community programs",
    ],
  },
];

export default function BmcCanvas() {
  return (
    <section className="space-y-8">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Business model clarity from Day 1
        </h2>
        <p className="mt-3 text-lg text-muted">
          A high-level snapshot of how LawLink captures value and reinvests into trust and
          product velocity.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {canvas.map((block) => (
          <div
            key={block.title}
            className="rounded-3xl border border-border bg-surface/80 p-5 text-left shadow-soft"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
              {block.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {block.content.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
