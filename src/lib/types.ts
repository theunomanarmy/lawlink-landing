export type PracticeArea = string;

export interface LawyerProfile {
  id: string;
  name: string;
  firm: string;
  location: string;
  practiceAreas: PracticeArea[];
  yearsExperience: number;
  rating: number;
  languages: string[];
  description: string;
  specialization: string;
  email: string;
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
