"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Home, Newspaper, Users, Calendar, FileText, BarChart3, Bot, LogOut, User } from "lucide-react";

type LawyerProfile = {
  id: string;
  fullName: string;
  profilePhotoUrl: string | null;
} | null;

type PlatformNavbarProps = {
  profile: LawyerProfile;
};

const navItems = [
  { href: "/platform", label: "Home", icon: Home },
  { href: "/platform/news", label: "News", icon: Newspaper },
  { href: "/platform/community", label: "Community", icon: Users },
  { href: "/platform/events", label: "Events", icon: Calendar },
  { href: "/platform/articles", label: "Articles", icon: FileText },
  { href: "/platform/research", label: "Research", icon: BarChart3 },
  { href: "/platform/ai", label: "Lawlink AI", icon: Bot },
];

export default function PlatformNavbar({ profile }: PlatformNavbarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/platform" className="text-lg font-semibold text-foreground">
            LawLink Platform
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/platform" && pathname === "/platform");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/lawyer"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface transition"
            >
              <User size={18} />
              <span>Dashboard</span>
            </Link>
            {profile && (
              <div className="flex items-center gap-3">
                {profile.profilePhotoUrl ? (
                  <img
                    src={profile.profilePhotoUrl}
                    alt={profile.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center">
                    <span className="text-xs font-semibold text-accent">
                      {profile.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="hidden md:block text-sm text-muted">{profile.fullName}</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface transition"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-background">
        <div className="flex items-center overflow-x-auto px-4 py-2 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === "/platform" && pathname === "/platform");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

