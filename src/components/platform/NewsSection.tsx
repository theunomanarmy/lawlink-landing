"use client";

import { ExternalLink, Calendar } from "lucide-react";

type NewsArticle = {
  id: string;
  headline: string;
  summary: string;
  source: string;
  date: string;
  category: string;
  url?: string;
};

const mockNews: NewsArticle[] = [
  {
    id: "1",
    headline: "Major Law Firm Announces Expansion into Legal Tech Services",
    summary: "One of the nation's largest law firms has announced a significant expansion into legal technology services, signaling a shift towards integrated legal solutions.",
    source: "Legal Tech News",
    date: "2024-01-15",
    category: "Legal Firms",
  },
  {
    id: "2",
    headline: "New Regulations Impact Corporate Compliance Requirements",
    summary: "Recent regulatory changes are requiring corporations to update their compliance frameworks, with new reporting deadlines set for Q2 2024.",
    source: "Corporate Legal Review",
    date: "2024-01-14",
    category: "Regulations",
  },
  {
    id: "3",
    headline: "Supreme Court Ruling Affects Intellectual Property Cases",
    summary: "A landmark Supreme Court decision has clarified the boundaries of fair use in digital content, with implications for copyright law across industries.",
    source: "IP Law Journal",
    date: "2024-01-13",
    category: "Intellectual Property",
  },
  {
    id: "4",
    headline: "Legal Industry Sees 15% Growth in Remote Legal Services",
    summary: "A new industry report shows significant growth in remote legal services, with technology adoption accelerating across small and medium-sized firms.",
    source: "Legal Market Insights",
    date: "2024-01-12",
    category: "Legal Tech",
  },
  {
    id: "5",
    headline: "International Trade Law Updates: New Bilateral Agreements",
    summary: "Several new bilateral trade agreements have been finalized, creating new opportunities and compliance requirements for international businesses.",
    source: "International Law Quarterly",
    date: "2024-01-11",
    category: "International Law",
  },
  {
    id: "6",
    headline: "Data Privacy Regulations Expand to Cover AI Systems",
    summary: "Regulators are proposing new data privacy rules specifically targeting AI systems, requiring enhanced transparency and consent mechanisms.",
    source: "Privacy Law Today",
    date: "2024-01-10",
    category: "Privacy Law",
  },
];

export default function NewsSection() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Legal News</h1>
        <p className="text-muted">Stay updated with the latest news from legal firms, companies, and the legal industry</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockNews.map((article) => (
          <article
            key={article.id}
            className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft hover:border-accent/50 transition"
          >
            <div className="mb-3">
              <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                {article.category}
              </span>
            </div>
            <h2 className="text-lg font-semibold mb-3 text-foreground line-clamp-2">
              {article.headline}
            </h2>
            <p className="text-sm text-muted mb-4 line-clamp-3">
              {article.summary}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Calendar size={14} />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="text-xs text-muted">{article.source}</div>
            </div>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                Read more <ExternalLink size={14} />
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
