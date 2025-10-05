export type Lawyer = {
  id: string;
  name: string;
  specialty: string;
  years: number;
  location: string;
  languages: string[];
  verified: boolean;
  cases_anonymized: number;
};

export type PricingTier = {
  name: string;
  priceMonthly: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isPopular?: boolean;
};

export type RoadmapItem = {
  quarter: string;
  status: "in-progress" | "planned" | "done";
  summary: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type AnalyticsEvent = {
  name: string;
  data?: Record<string, unknown>;
};
