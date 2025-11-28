import {
  PITCH,
  PROBLEM,
  AI_RISK,
  SOLUTION,
  FEATURES,
  GLOBAL_DISCLAIMER,
} from "@/content/landing";
import {
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  SearchCheck,
  Wrench,
  LifeBuoy,
  Clock3,
  Users,
  BrainCircuit,
} from "lucide-react";

export default function StoryBlocks() {
  return (
    <>
      <section id="pitch" className="container mx-auto px-4 py-16">
        <div className="grid gap-10 rounded-3xl border border-border bg-white p-8 shadow-soft lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <h2 className="text-3xl font-black uppercase tracking-[0.15em] text-foreground sm:text-4xl">
              {PITCH.title}
            </h2>
            {PITCH.body.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                Platform promises
              </p>
              <ul className="space-y-3 text-base text-muted">
                <li className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 h-4 w-4 text-accent" />
                  <span>Verified-only roster of independent lawyers and boutique firms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 h-4 w-4 text-accent" />
                  <span>Clear scope, fees, and availability to keep expectations aligned.</span>
                </li>
                <li className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 h-4 w-4 text-accent" />
                  <span>Privacy-first workflows for both client and counsel.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <ProblemCard />
          <SolutionCard />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <AiriskCard />
      </section>

      <section id="features-extended" className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-5xl space-y-6 text-left">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {FEATURES.title}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {FEATURES.items.map((feature, index) => {
              const Icon = iconForFeature(feature.icon);
              return (
                <li
                  key={index}
                  className="flex flex-col items-center rounded-2xl border border-border bg-white/80 p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
                    <Icon className="h-6 w-6 text-accent" />
                  </span>
                  <div className="text-base font-semibold text-foreground">{feature.label}</div>
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-neutral-500">{GLOBAL_DISCLAIMER}</p>
        </div>
      </section>
    </>
  );
}

const featureIconMap = {
  search: SearchCheck,
  toolkit: Wrench,
  shield: ShieldCheck,
  alert: LifeBuoy,
  clock: Clock3,
  network: Users,
  ai: BrainCircuit,
};

function iconForFeature(key?: string) {
  if (key && featureIconMap[key as keyof typeof featureIconMap]) {
    return featureIconMap[key as keyof typeof featureIconMap];
  }
  return Sparkles;
}

function ProblemCard() {
  return (
    <article className="rounded-3xl border border-border bg-white p-8 shadow-soft">
      <header className="flex items-start gap-3">
        <span className="rounded-full bg-red-50 p-3 text-red-600">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Challenge</p>
          <h3 className="text-2xl font-semibold text-foreground">{PROBLEM.title}</h3>
        </div>
      </header>
      <ul className="mt-6 space-y-4 text-base text-muted">
        {PROBLEM.bullets.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SolutionCard() {
  return (
    <article className="rounded-3xl border border-border bg-gradient-to-br from-emerald-50 via-white to-white p-8 shadow-soft">
      <header className="flex items-start gap-3">
        <span className="rounded-full bg-emerald-100 p-3 text-emerald-600">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Response</p>
          <h3 className="text-2xl font-semibold text-foreground">{SOLUTION.title}</h3>
        </div>
      </header>
      <div className="mt-6 space-y-4 text-base text-muted">
        {SOLUTION.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function AiriskCard() {
  return (
    <article className="rounded-3xl border border-border bg-white p-8 shadow-soft">
      <header className="flex items-start gap-3">
        <span className="rounded-full bg-accent-soft p-3">
          <Sparkles className="h-5 w-5 text-accent" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">AI & trust</p>
          <h3 className="text-2xl font-semibold text-foreground">{AI_RISK.title}</h3>
        </div>
      </header>
      <div className="mt-6 space-y-4 text-base text-muted">
        {AI_RISK.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-accent-soft p-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">
              Planned mitigations
            </p>
            <p className="text-xs text-muted">{AI_RISK.disclaimer}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          {AI_RISK.planned.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
