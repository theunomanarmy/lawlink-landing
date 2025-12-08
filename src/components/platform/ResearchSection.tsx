"use client";

import { TrendingUp, TrendingDown, DollarSign, Users, Briefcase, BarChart3 } from "lucide-react";

type Statistic = {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type MarketInsight = {
  id: string;
  title: string;
  description: string;
  category: string;
};

const statistics: Statistic[] = [
  {
    id: "1",
    label: "Legal Tech Market Size",
    value: "$25.8B",
    change: 12.5,
    trend: "up",
    icon: DollarSign,
  },
  {
    id: "2",
    label: "Active Legal Professionals",
    value: "1.3M",
    change: 3.2,
    trend: "up",
    icon: Users,
  },
  {
    id: "3",
    label: "Average Case Load",
    value: "45 cases",
    change: -2.1,
    trend: "down",
    icon: Briefcase,
  },
  {
    id: "4",
    label: "Legal Services Growth",
    value: "+8.3%",
    change: 8.3,
    trend: "up",
    icon: TrendingUp,
  },
];

const marketInsights: MarketInsight[] = [
  {
    id: "1",
    title: "AI Adoption in Legal Practice",
    description: "65% of law firms have adopted AI tools for document review and research, representing a 40% increase from last year. Small and medium firms are catching up to large firms in AI adoption rates.",
    category: "Technology",
  },
  {
    id: "2",
    title: "Remote Legal Services Expansion",
    description: "Remote legal consultations have grown by 35% year-over-year, with clients showing strong preference for virtual meetings. This trend is expected to continue as technology infrastructure improves.",
    category: "Services",
  },
  {
    id: "3",
    title: "Specialization Trends",
    description: "Data privacy and cybersecurity law have seen the highest growth in demand (28% increase), followed by employment law (15% increase) and intellectual property (12% increase).",
    category: "Practice Areas",
  },
  {
    id: "4",
    title: "Legal Tech Investment",
    description: "Venture capital investment in legal technology reached $1.2B in Q4 2023, with focus on AI-powered solutions, contract management, and client relationship management tools.",
    category: "Investment",
  },
];

const practiceAreaDistribution = [
  { area: "Corporate", percentage: 28, cases: 12500 },
  { area: "Criminal", percentage: 22, cases: 9800 },
  { area: "Family", percentage: 18, cases: 8100 },
  { area: "Employment", percentage: 15, cases: 6700 },
  { area: "IP", percentage: 12, cases: 5400 },
  { area: "Other", percentage: 5, cases: 2200 },
];

export default function ResearchSection() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Research & Market Analysis</h1>
        <p className="text-muted">Data and insights into the legal sector and market trends</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {statistics.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-accent-soft">
                  <Icon size={20} className="text-accent" />
                </div>
                {stat.trend === "up" ? (
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp size={16} />
                    <span className="text-sm font-semibold">+{stat.change}%</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-500">
                    <TrendingDown size={16} />
                    <span className="text-sm font-semibold">{stat.change}%</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Practice Area Distribution */}
      <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft mb-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={24} className="text-accent" />
          <h2 className="text-xl font-semibold">Practice Area Distribution</h2>
        </div>
        <div className="space-y-4">
          {practiceAreaDistribution.map((item) => (
            <div key={item.area}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{item.area}</span>
                <span className="text-sm text-muted">{item.percentage}% ({item.cases.toLocaleString()} cases)</span>
              </div>
              <div className="w-full bg-background rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Market Insights</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {marketInsights.map((insight) => (
            <div
              key={insight.id}
              className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft"
            >
              <div className="mb-3">
                <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  {insight.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">{insight.title}</h3>
              <p className="text-sm text-muted">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Trends Chart (Visual Representation) */}
      <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft">
        <h2 className="text-xl font-semibold mb-6">Legal Market Growth Trends (2020-2024)</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted">2020</div>
            <div className="flex-1 bg-background rounded-full h-6 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: "60%" }} />
            </div>
            <div className="w-16 text-sm text-muted text-right">60%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted">2021</div>
            <div className="flex-1 bg-background rounded-full h-6 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: "68%" }} />
            </div>
            <div className="w-16 text-sm text-muted text-right">68%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted">2022</div>
            <div className="flex-1 bg-background rounded-full h-6 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: "75%" }} />
            </div>
            <div className="w-16 text-sm text-muted text-right">75%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted">2023</div>
            <div className="flex-1 bg-background rounded-full h-6 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: "82%" }} />
            </div>
            <div className="w-16 text-sm text-muted text-right">82%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted">2024</div>
            <div className="flex-1 bg-background rounded-full h-6 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: "88%" }} />
            </div>
            <div className="w-16 text-sm text-muted text-right">88%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

