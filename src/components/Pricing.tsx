import { Check } from "lucide-react";
import type { PricingTier } from "@/lib/types";

const tiers: PricingTier[] = [
  {
    name: "Starter",
    priceMonthly: "$249",
    description: "Spin up co-counsel collaborations for boutique and solo practices.",
    features: [
      "Up to 3 active matters",
      "Verified talent marketplace access",
      "Standard secure workspace",
    ],
    ctaLabel: "Join waitlist",
    ctaHref: "#request",
  },
  {
    name: "Growth",
    priceMonthly: "$799",
    description: "Purpose-built for firms orchestrating multi-jurisdictional engagements.",
    features: [
      "Unlimited matters",
      "AI drafting copilot",
      "Conflicts automation",
      "Slack / Teams integrations",
    ],
    ctaLabel: "Request demo",
    ctaHref: "#demo",
    isPopular: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    description: "Built for global legal operations with nuanced procurement needs.",
    features: [
      "Dedicated client success pod",
      "On-prem or regional hosting",
      "Granular audit trails",
      "Custom billing & insights",
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "mailto:hello@lawlink.ai",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Pricing that scales with your matters
        </h2>
        <p className="mt-3 text-lg text-muted">
          Flexible plans for firms of every size. Usage fees are transparent, with no
          surprise markups on external counsel.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-3xl border border-border bg-surface/80 p-6 shadow-soft ${
              tier.isPopular ? "ring-2 ring-accent" : ""
            }`}
          >
            {tier.isPopular ? (
              <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            ) : null}
            <h3 className="text-xl font-semibold">{tier.name}</h3>
            <p className="mt-2 text-3xl font-semibold">{tier.priceMonthly}</p>
            <p className="mt-2 text-sm text-muted">{tier.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-muted">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check size={16} className="mt-1 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={tier.ctaHref}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent-soft"
            >
              {tier.ctaLabel}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
