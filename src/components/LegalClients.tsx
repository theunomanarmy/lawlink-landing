"use client";

import Link from "next/link";
import { Search, FileText, MessageSquare, Calendar, ArrowRight } from "lucide-react";

export default function LegalClients() {
  return (
    <section id="for-clients" className="container mx-auto px-4 py-16">
      <div className="box grid gap-10 rounded-3xl border border-border bg-surface p-8 shadow-soft lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <h2 className="text-3xl font-black uppercase tracking-[0.15em] text-foreground sm:text-4xl">
            Legal Clients
          </h2>
          <p className="text-lg leading-relaxed text-muted">
            Find the right lawyer for your legal needs through our live directory of verified legal professionals.
          </p>
          <p className="text-lg leading-relaxed text-muted">
            Browse fully transparent portfolios, connect through secure chats, and book consultations with confidence.
          </p>
          <div className="pt-4">
            <Link
              href="/lawyers"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] hover:shadow-glow"
            >
              Find Legal Help
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="box rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">
              What you get
            </p>
            <ul className="space-y-4 text-base text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <Search className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Live Directory</span>
                  <p className="text-sm mt-1">Browse verified lawyers with transparent portfolios and case experience.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <FileText className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Transparent Portfolios</span>
                  <p className="text-sm mt-1">View credentials, case distribution, and practice areas before booking.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <MessageSquare className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Secure Chats</span>
                  <p className="text-sm mt-1">Connect with lawyers through encrypted messaging (coming soon).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-accent-soft p-2">
                  <Calendar className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Booking System</span>
                  <p className="text-sm mt-1">Schedule consultations directly through our integrated booking platform.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

