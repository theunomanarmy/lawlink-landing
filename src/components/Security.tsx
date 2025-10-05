import { Lock, ShieldPlus, SquareStack } from "lucide-react";

const commitments = [
  {
    title: "SOC 2 Type II controls",
    detail: "Independent attestation across security, availability, and confidentiality.",
    icon: ShieldPlus,
  },
  {
    title: "Zero-knowledge document storage",
    detail: "Customer managed keys with granular, revokable workspace permissions.",
    icon: Lock,
  },
  {
    title: "Enterprise integrations",
    detail: "SAML SSO, on-prem data residency, and configurable retention policies.",
    icon: SquareStack,
  },
];

export default function Security() {
  return (
    <section className="space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Compliance designed in from day zero
        </h2>
        <p className="mt-3 text-lg text-muted">
          LawLink meets the confidentiality standard of AM Law firms and boutique
          specialists alike. Flexible hosting keeps client data exactly where you need it.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {commitments.map(({ title, detail, icon: Icon }) => (
          <div key={title} className="rounded-3xl border border-border bg-surface/80 p-6 shadow-soft">
            <Icon className="text-accent" size={22} />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-sm text-muted">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
