"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/lawyers", label: "Lawyers" },
  { href: "#pitch", label: "About us" },
  { href: "#for-clients", label: "why" },
  { href: "#feedback", label: "Feedback & contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          LawLink
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {link.label}
            </a>
          ))}
          {status === "loading" ? null : session ? (
            <>
              <Link
                href="/dashboard"
                className="transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-border bg-background px-4 py-2 transition hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-accent px-4 py-2 text-white shadow-soft transition hover:bg-[#8b5a3c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
            {status === "loading" ? null : session ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-md px-2 py-2 transition hover:bg-accent-soft hover:text-foreground"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="rounded-md border border-border bg-background px-3 py-2 text-center transition hover:bg-accent-soft"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-2 py-2 transition hover:bg-accent-soft hover:text-foreground"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-accent px-3 py-2 text-center text-white hover:bg-[#8b5a3c]"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}


