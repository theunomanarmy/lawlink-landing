import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";
import { Users, Briefcase, Newspaper, Brain, GraduationCap, Code, ArrowRight, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "For Lawyers",
  description: "Join LawLink - A platform for legal professionals offering community, networking, collaboration, and AI-powered tools.",
};

export default async function ForLawyersPage() {
  const session = await auth();
  const isLawyer = session?.user?.role === "LAWYER";

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <Navbar />
      <section className="container mx-auto px-4 pb-16 pt-28">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              For Legal Professionals
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Join a dedicated platform designed to bridge the gap between AI and law. Connect, collaborate, and grow your practice with tools built for the modern legal professional.
            </p>
            {isLawyer ? (
              <div className="pt-4">
                <Link
                  href="/dashboard/lawyer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] hover:shadow-glow"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="pt-4 flex gap-4 justify-center">
                <Link
                  href="/register?role=lawyer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] hover:shadow-glow"
                >
                  Join as Lawyer
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-foreground font-semibold shadow-soft transition hover:bg-accent-soft"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Community & Networking */}
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft">
            <div className="flex items-start gap-4 mb-6">
              <span className="rounded-full bg-accent-soft p-3">
                <Users className="h-6 w-6 text-accent" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">Community & Networking</h2>
                <p className="text-muted mb-4">
                  Connect with legal professionals from around the world. Build meaningful relationships, share insights, and expand your professional network in a dedicated legal community.
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Connect with peers in your practice area</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Join discussions and share expertise</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Attend virtual networking events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Collaboration */}
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft">
            <div className="flex items-start gap-4 mb-6">
              <span className="rounded-full bg-accent-soft p-3">
                <Briefcase className="h-6 w-6 text-accent" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">Collaboration on Legal Projects</h2>
                <p className="text-muted mb-4">
                  Work together on complex legal matters. Find partners for multi-jurisdictional cases, share resources, and collaborate on projects that require diverse expertise.
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Find collaboration partners for complex cases</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Share documents and resources securely</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Coordinate on multi-jurisdictional matters</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Articles & News */}
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft">
            <div className="flex items-start gap-4 mb-6">
              <span className="rounded-full bg-accent-soft p-3">
                <Newspaper className="h-6 w-6 text-accent" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">Articles & News</h2>
                <p className="text-muted mb-4">
                  Stay informed with the latest developments in the legal industry. Access curated articles, legal news, and insights from fellow professionals.
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Read industry news and analysis</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Access legal articles and case studies</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Share your own insights and articles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Lawlink AI */}
          <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-[#6b5238] via-[#5a4530] to-[#4a3a28] p-8 shadow-soft">
            <div className="flex items-start gap-4 mb-6">
              <span className="rounded-full bg-accent-soft p-3">
                <Brain className="h-6 w-6 text-accent" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">Lawlink AI</h2>
                <p className="text-muted mb-4">
                  A specialized AI model designed for the legal system. Lawlink AI helps with research, document summarization, proofreading, and data analysis—all while maintaining strict boundaries to avoid regulatory issues.
                </p>
                <div className="rounded-xl border border-border/70 bg-surface/95 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Important Disclaimer</p>
                      <p className="text-xs text-muted">
                        Lawlink AI is designed to assist with research, summarization, proofreading, and data analysis. It does NOT provide legal advice and is not a substitute for professional legal counsel. All AI-generated content should be reviewed by qualified legal professionals.
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Summarize legal documents and case files</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Proofread and review legal writing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Research legal precedents and case law</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>Analyze data and extract key information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Opportunities */}
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft">
            <div className="flex items-start gap-4 mb-6">
              <span className="rounded-full bg-accent-soft p-3">
                <GraduationCap className="h-6 w-6 text-accent" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">Opportunities for Students & Consultants</h2>
                <p className="text-muted mb-4">
                  LawLink provides unique opportunities for law students and legal tech consultants to engage with the legal community and gain valuable experience.
                </p>
                <div className="grid gap-4 md:grid-cols-2 mt-6">
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <GraduationCap className="h-5 w-5 text-accent" />
                      <h3 className="font-semibold">Law Students</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted">
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <span>Internship opportunities</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <span>Mentorship programs</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <span>Access to legal resources</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Code className="h-5 w-5 text-accent" />
                      <h3 className="font-semibold">Legal Tech Consultants</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted">
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <span>Consulting opportunities</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <span>Technology integration projects</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <span>Platform development collaboration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing CTA */}
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft text-center">
            <h2 className="text-2xl font-semibold mb-3">Ready to Join?</h2>
            <p className="text-muted mb-6 max-w-2xl mx-auto">
              LawLink addresses a critical gap in the legal system—the lack of interdisciplinary talent between AI and law. Join us in building the future of legal practice.
            </p>
            {!isLawyer && (
              <Link
                href="/register?role=lawyer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] hover:shadow-glow"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

