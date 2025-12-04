import { track } from "@/lib/track";

const tiers = [
  {
    name: "Lawyers",
    price: "€30/mo (pilot)",
    features: [
      "Priority listing placement",
      "Boosted posts & networking",
      "Verification workflow included",
    ],
  },
  {
    name: "Law Firms",
    price: "€100–€350/mo (pilot)",
    features: [
      "Per-seat scaling with shared workspaces",
      "Centralized compliance tooling",
      "Team analytics (roadmap)",
    ],
  },
  {
    name: "Clients",
    price: "€10/mo (pilot)",
    features: [
      "Transparent booking tools",
      "Matter tracking & notifications",
      "Secure messaging (roadmap)",
    ],
  },
  {
    name: "Family",
    price: "€30/mo (pilot)",
    features: [
      "Access to specialists for family matters",
      "Guided onboarding & document templates",
      "Preferred rates with verified lawyers",
    ],
  },
];

function buildMailto(plan: string) {
  return `mailto:hello@lawlink.ai?subject=${encodeURIComponent(`LawLink ${plan} plan`)}`;
}

export default function Pricing() {
  return (
    <section id="pricing" className="container mx-auto space-y-10 px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Pilot pricing designed for transparency
        </h2>
        <p className="mt-3 text-lg text-muted">
          Launch partners lock in early pricing while we validate multi-sided value across the marketplace.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier) => (
          <div key={tier.name} className="box flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h3 className="text-xl font-semibold">{tier.name}</h3>
            <p className="mt-2 text-2xl font-semibold text-foreground">{tier.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={buildMailto(tier.name)}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-accent px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              onClick={() => track("pricing_cta_click", { plan: tier.name })}
            >
              Talk to the team
            </a>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-3xl text-center text-sm text-muted">
        <p>Pilot pricing — subject to change. VAT & payment processing clarified at launch.</p>
        <p className="mt-2">
          Read more about fees, payouts, and refunds in our <a href="#faq" className="text-accent underline-offset-4 hover:underline">FAQ</a>.
        </p>
      </div>
    </section>
  );
}
