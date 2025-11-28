import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const contactHref = "mailto:hello@lawlink.ai";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border bg-white py-8">
      <div className="container mx-auto flex flex-col gap-6 px-4 text-sm text-muted">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p>© LawLink {year}</p>
          <p className="max-w-2xl text-xs text-muted">
            LawLink is a platform connecting clients and independent legal professionals. LawLink does not provide legal advice.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={contactHref}
            className="transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
