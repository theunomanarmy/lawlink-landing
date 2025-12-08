"use client";

import { useState } from "react";
import { Users, Share2, BookOpen, Filter } from "lucide-react";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  authors: string[];
  practiceArea: string;
  publishedDate: string;
  readTime: string;
  views: number;
  collaborators?: string[];
};

const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of AI in Legal Practice: Opportunities and Challenges",
    excerpt: "This comprehensive article explores how artificial intelligence is transforming legal practice, from document review to predictive analytics, and examines the ethical considerations lawyers must navigate.",
    authors: ["Sarah Johnson", "Michael Chen"],
    practiceArea: "Legal Tech",
    publishedDate: "2024-01-10",
    readTime: "8 min read",
    views: 1245,
    collaborators: ["TechLaw Partners"],
  },
  {
    id: "2",
    title: "International Tax Compliance: A Guide for Multinational Corporations",
    excerpt: "An in-depth analysis of international tax compliance requirements, covering recent regulatory changes and best practices for multinational corporations operating across multiple jurisdictions.",
    authors: ["David Martinez"],
    practiceArea: "Taxation",
    publishedDate: "2024-01-08",
    readTime: "12 min read",
    views: 892,
  },
  {
    id: "3",
    title: "Privacy Law in the Age of Big Data: Balancing Innovation and Protection",
    excerpt: "Examining the evolving landscape of privacy law as businesses collect and process increasing amounts of personal data, with a focus on GDPR, CCPA, and emerging regulations.",
    authors: ["Emily Rodriguez", "James Wilson"],
    practiceArea: "Privacy Law",
    publishedDate: "2024-01-05",
    readTime: "10 min read",
    views: 1567,
    collaborators: ["Privacy Law Institute"],
  },
  {
    id: "4",
    title: "Employment Law Update: Remote Work Policies and Compliance",
    excerpt: "A practical guide to navigating employment law in the remote work era, covering wage and hour issues, workplace safety, and employee rights across different jurisdictions.",
    authors: ["Amanda Foster"],
    practiceArea: "Employment",
    publishedDate: "2024-01-03",
    readTime: "6 min read",
    views: 743,
  },
  {
    id: "5",
    title: "Intellectual Property Strategies for Startups",
    excerpt: "Essential IP considerations for startups, including patent filing strategies, trademark protection, and how to build a strong intellectual property portfolio from day one.",
    authors: ["Robert Kim", "Jennifer Lee"],
    practiceArea: "Intellectual Property",
    publishedDate: "2024-01-01",
    readTime: "9 min read",
    views: 1023,
  },
  {
    id: "6",
    title: "Corporate Governance Best Practices in 2024",
    excerpt: "An overview of corporate governance trends and best practices, with insights on board composition, shareholder rights, and regulatory compliance requirements.",
    authors: ["Thomas Anderson"],
    practiceArea: "Corporate",
    publishedDate: "2023-12-28",
    readTime: "7 min read",
    views: 654,
  },
];

const practiceAreas = ["All", "Legal Tech", "Taxation", "Privacy Law", "Employment", "Intellectual Property", "Corporate"];

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [selectedArea, setSelectedArea] = useState<string>("All");

  const filteredArticles =
    selectedArea === "All"
      ? articles
      : articles.filter((article) => article.practiceArea === selectedArea);

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
        <h1 className="text-3xl font-semibold mb-2">Articles</h1>
        <p className="text-muted">Collection of legal articles with collaboration opportunities</p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-muted" />
          <span className="text-sm font-medium text-muted">Filter by Practice Area:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {practiceAreas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                selectedArea === area
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-muted hover:text-foreground"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft hover:border-accent/50 transition"
          >
            <div className="mb-3">
              <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                {article.practiceArea}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-foreground">{article.title}</h2>
            <p className="text-sm text-muted mb-4 line-clamp-3">{article.excerpt}</p>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-muted mb-2">
                <Users size={16} />
                <span>Authors: {article.authors.join(", ")}</span>
              </div>
              {article.collaborators && (
                <div className="text-xs text-muted mb-2">
                  In collaboration with: {article.collaborators.join(", ")}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4 text-xs text-muted">
                <span>{formatDate(article.publishedDate)}</span>
                <span>{article.readTime}</span>
                <span>{article.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted hover:text-foreground hover:bg-accent-soft rounded-lg transition">
                  <Users size={16} />
                </button>
                <button className="p-2 text-muted hover:text-foreground hover:bg-accent-soft rounded-lg transition">
                  <Share2 size={16} />
                </button>
                <button className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-[#8b5a3c] transition">
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

