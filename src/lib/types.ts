export interface LawyerProfile {
  id: string;
  name: string;
  specialty: string;
  years: number;
  location: string;
  languages: string[];
  verified: boolean;
  cases_anonymized: number;
}

export interface PricingTier {
  name: string;
  priceMonthly: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isPopular?: boolean;
}

export interface RoadmapItem {
  quarter: string;
  status: "in-progress" | "planned" | "done";
  summary: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type AnalyticsEvent = {
  name: string;
  data?: Record<string, unknown>;
};
