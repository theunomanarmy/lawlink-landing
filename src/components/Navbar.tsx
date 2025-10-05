"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-accent-soft p-2 shadow-glow">
            <span className="text-lg font-semibold text-accent">LawLink</span>
          </div>
          <span className="hidden text-sm font-medium text-muted sm:block">
            Co-counsel marketplace
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </a>
          ))}
          <Link
            href="#demo"
            className="rounded-full bg-foreground px-4 py-2 text-background shadow-soft transition hover:opacity-90"
          >
            Request access
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-background px-4 pb-6 pt-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-muted">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 hover:bg-accent-soft hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="#demo"
              className="rounded-md bg-foreground px-3 py-2 text-center text-background"
              onClick={() => setIsOpen(false)}
            >
              Request access
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
