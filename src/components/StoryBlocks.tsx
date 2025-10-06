import {
  PITCH,
  PROBLEM,
  AI_RISK,
  SOLUTION,
  FEATURES,
  GLOBAL_DISCLAIMER,
} from "@/content/landing";

export default function StoryBlocks() {
  return (
    <>
      <section id="pitch" className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-left">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {PITCH.title}
          </h2>
          {PITCH.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {PROBLEM.title}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base text-muted">
            {PROBLEM.bullets.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container mx-auto bg-neutral-50 px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {AI_RISK.title}
          </h2>
          {AI_RISK.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
          <div className="space-y-2">
            <h3 className="mt-6 text-lg font-semibold text-foreground">Planned mitigations</h3>
            <ul className="list-disc space-y-2 pl-6 text-base text-muted">
              {AI_RISK.planned.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-neutral-500">{AI_RISK.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {SOLUTION.title}
          </h2>
          {SOLUTION.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section id="features-extended" className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-6 text-left">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {FEATURES.title}
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {FEATURES.items.map((feature, index) => (
              <li
                key={index}
                className="rounded-2xl border border-border bg-background p-5 shadow-soft"
              >
                <div className="font-semibold text-foreground">{feature.label}</div>
                <p className="mt-2 text-sm text-muted">{feature.detail}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-neutral-500">{GLOBAL_DISCLAIMER}</p>
        </div>
      </section>
    </>
  );
}
