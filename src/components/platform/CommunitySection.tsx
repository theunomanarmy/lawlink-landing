"use client";

import { useState } from "react";
import { UserPlus, Users, GraduationCap, Briefcase, TrendingUp, BookOpen } from "lucide-react";

type CommunityMember = {
  id: string;
  name: string;
  title: string;
  practiceArea: string;
  avatar?: string;
  isConnected: boolean;
};

type CommunityCategory = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  members: CommunityMember[];
};

const mockCategories: CommunityCategory[] = [
  {
    id: "litigation",
    name: "Litigation",
    icon: Briefcase,
    description: "Connect with litigation lawyers and legal professionals",
    members: [
      {
        id: "1",
        name: "Robert Chen",
        title: "Senior Litigation Attorney",
        practiceArea: "Commercial Litigation",
        isConnected: false,
      },
      {
        id: "2",
        name: "Amanda Foster",
        title: "Trial Lawyer",
        practiceArea: "Criminal Defense",
        isConnected: true,
      },
      {
        id: "3",
        name: "James Wilson",
        title: "Partner",
        practiceArea: "Civil Litigation",
        isConnected: false,
      },
    ],
  },
  {
    id: "taxation",
    name: "Taxation",
    icon: TrendingUp,
    description: "Tax attorneys and tax law specialists",
    members: [
      {
        id: "4",
        name: "Maria Garcia",
        title: "Tax Attorney",
        practiceArea: "Corporate Tax",
        isConnected: false,
      },
      {
        id: "5",
        name: "David Kim",
        title: "Senior Tax Advisor",
        practiceArea: "International Tax",
        isConnected: false,
      },
    ],
  },
  {
    id: "legal-tech",
    name: "Legal Tech",
    icon: BookOpen,
    description: "Legal technology professionals and innovators",
    members: [
      {
        id: "6",
        name: "Sarah Johnson",
        title: "Legal Tech Consultant",
        practiceArea: "Legal Innovation",
        isConnected: true,
      },
      {
        id: "7",
        name: "Michael Brown",
        title: "Legal Tech Entrepreneur",
        practiceArea: "Legal Software",
        isConnected: false,
      },
    ],
  },
  {
    id: "investors",
    name: "Investors",
    icon: TrendingUp,
    description: "Investors and VCs in legal technology",
    members: [
      {
        id: "8",
        name: "Jennifer Lee",
        title: "VC Partner",
        practiceArea: "Legal Tech Investments",
        isConnected: false,
      },
    ],
  },
  {
    id: "universities",
    name: "Law Universities",
    icon: GraduationCap,
    description: "Law schools and academic institutions",
    members: [
      {
        id: "9",
        name: "Prof. Thomas Anderson",
        title: "Law Professor",
        practiceArea: "Constitutional Law",
        isConnected: false,
      },
      {
        id: "10",
        name: "Dr. Emily Rodriguez",
        title: "Dean of Law",
        practiceArea: "Legal Education",
        isConnected: false,
      },
    ],
  },
  {
    id: "students",
    name: "Law Students",
    icon: Users,
    description: "Current law students and recent graduates",
    members: [
      {
        id: "11",
        name: "Alex Thompson",
        title: "Law Student",
        practiceArea: "JD Candidate",
        isConnected: false,
      },
      {
        id: "12",
        name: "Jordan Martinez",
        title: "Recent Graduate",
        practiceArea: "Bar Exam Prep",
        isConnected: false,
      },
    ],
  },
];

export default function CommunitySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [members, setMembers] = useState<CommunityMember[]>([]);

  const handleCategoryClick = (categoryId: string) => {
    const category = mockCategories.find((c) => c.id === categoryId);
    if (category) {
      setSelectedCategory(categoryId);
      setMembers(category.members);
    }
  };

  const handleConnect = (memberId: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, isConnected: !member.isConnected }
          : member
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Community</h1>
        <p className="text-muted">Connect with professionals in your field and expand your network</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {mockCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`rounded-2xl border p-6 text-left transition ${
                selectedCategory === category.id
                  ? "border-accent bg-accent-soft"
                  : "border-border/70 bg-surface/95 hover:border-accent/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent-soft">
                  <Icon size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
              </div>
              <p className="text-sm text-muted mb-2">{category.description}</p>
              <p className="text-xs text-muted">{category.members.length} members</p>
            </button>
          );
        })}
      </div>

      {selectedCategory && members.length > 0 && (
        <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-6">
            {mockCategories.find((c) => c.id === selectedCategory)?.name} Community
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background"
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center">
                    <span className="text-lg font-semibold text-accent">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted">{member.title}</p>
                  <p className="text-xs text-muted">{member.practiceArea}</p>
                </div>
                <button
                  onClick={() => handleConnect(member.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    member.isConnected
                      ? "bg-accent-soft text-accent border border-accent"
                      : "bg-accent text-white hover:bg-[#8b5a3c]"
                  }`}
                >
                  <UserPlus size={16} />
                  {member.isConnected ? "Connected" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

