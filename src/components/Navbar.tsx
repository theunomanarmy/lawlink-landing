"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "For Lawyers" },
  { href: "#for-clients", label: "For Clients" },
  { href: "#security", label: "Security/GDPR" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const waitlistHref = "mailto:hello@lawlink.ai?subject=LawLink%20Waitlist";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-lg font-semibold text-foreground">
          LawLink
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </a>
          ))}
          <a
            href={waitlistHref}
            className="rounded-full bg-foreground px-4 py-2 text-background shadow-soft transition hover:opacity-90"
          >
            Join the Waitlist
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-background px-4 pb-6 pt-3 lg:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-muted">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 transition hover:bg-accent-soft hover:text-foreground"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waitlistHref}
              className="rounded-md bg-foreground px-3 py-2 text-center text-background"
              onClick={closeMenu}
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
