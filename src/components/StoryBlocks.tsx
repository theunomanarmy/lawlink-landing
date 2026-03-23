import {
  PITCH,
} from "@/content/landing";
import {
  ShieldCheck,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

export default function StoryBlocks() {
  return (
    <>
      <section id="pitch" className="container mx-auto px-4 py-16">
        <div className="box grid gap-10 rounded-3xl border border-border bg-surface p-8 shadow-soft lg:grid-cols-[1.15fr_0.85fr]">
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
          <div className="box rounded-2xl border border-border bg-surface p-6 shadow-soft">
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

    </>
  );
}

