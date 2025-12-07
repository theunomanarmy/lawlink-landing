"use client";

import Link from "next/link";
import { Users, Briefcase, Newspaper, Brain, GraduationCap, Code, ArrowRight } from "lucide-react";

export default function ForLawyers() {
  return (
    <section id="for-lawyers" className="container mx-auto px-4 py-16">
      <div className="box grid gap-10 rounded-3xl border border-border bg-gradient-to-br from-[#6b5238] via-[#5a4530] to-[#4a3a28] p-8 shadow-soft lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <h2 className="text-3xl font-black uppercase tracking-[0.15em] text-foreground sm:text-4xl">
            I Am A Lawyer
          </h2>
          <p className="text-lg leading-relaxed text-muted">
            Join a dedicated platform designed for legal professionals. Connect with peers, collaborate on projects, and grow your practice.
          </p>
          <p className="text-lg leading-relaxed text-muted">
            Access Lawlink AI for research and document assistance, stay updated with legal news, and discover opportunities for law students and legal tech consultants.
          </p>
          <div className="pt-4">
            <Link
              href="/for-lawyers"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] hover:shadow-glow"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="box rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">
              What we offer
            </p>
            <ul className="space-y-4 text-base text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <Users className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Community & Networking</span>
                  <p className="text-sm mt-1">Connect with legal professionals and build your network.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <Briefcase className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Collaboration</span>
                  <p className="text-sm mt-1">Work together on legal projects and share expertise.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <Newspaper className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Articles & News</span>
                  <p className="text-sm mt-1">Stay informed with the latest legal industry updates.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <Brain className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Lawlink AI</span>
                  <p className="text-sm mt-1">AI-powered tools for research, summarization, and proofreading.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <GraduationCap className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">For Students & Consultants</span>
                  <p className="text-sm mt-1">Opportunities for law students and legal tech consultants.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

