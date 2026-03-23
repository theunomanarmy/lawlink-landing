"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Role = "LAWYER" | "CLIENT" | null;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Lawyer fields
  const [fullName, setFullName] = useState("");
  const [overview, setOverview] = useState("");
  const [location, setLocation] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [languages, setLanguages] = useState("");
  
  // Client fields
  const [name, setName] = useState("");
  const [preferredArea, setPreferredArea] = useState("");
  const [language, setLanguage] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const practiceAreaOptions = [
    "Corporate",
    "Criminal",
    "Family",
    "Immigration",
    "Real Estate",
    "Intellectual Property",
    "Employment",
    "Personal Injury",
    "Tax",
    "Other",
  ];

  const handleRoleSelect = (selectedRole: "LAWYER" | "CLIENT") => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleCommonSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions");
      return;
    }

    setStep(3);
  };

  const handleFinalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload: Record<string, unknown> = {
        email,
        password,
        role,
      };

      if (role === "LAWYER") {
        payload.fullName = fullName;
        payload.overview = overview;
        payload.location = location;
        payload.practiceArea = practiceArea;
        payload.yearsExperience = yearsExperience;
        payload.languages = languages ? languages.split(",").map((l) => l.trim()) : [];
      } else if (role === "CLIENT") {
        payload.name = name;
        payload.preferredArea = preferredArea;
        payload.language = language;
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push(role === "LAWYER" ? "/dashboard/lawyer" : "/dashboard/client");
        router.refresh();
      } else {
        router.push("/login");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <Navbar />
      <section className="container mx-auto px-4 pb-16 pt-28">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft">
            <h1 className="mb-6 text-2xl font-semibold">Create your LawLink account</h1>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <p className="text-muted mb-6">Choose your account type:</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => handleRoleSelect("LAWYER")}
                    className="rounded-xl border-2 border-border bg-background p-6 text-left transition hover:border-accent hover:bg-accent-soft"
                  >
                    <h3 className="text-lg font-semibold mb-2">Lawyer</h3>
                    <p className="text-sm text-muted">
                      Create a professional profile, showcase your expertise, and connect with clients.
                    </p>
                  </button>
                  <button
                    onClick={() => handleRoleSelect("CLIENT")}
                    className="rounded-xl border-2 border-border bg-background p-6 text-left transition hover:border-accent hover:bg-accent-soft"
                  >
                    <h3 className="text-lg font-semibold mb-2">Client</h3>
                    <p className="text-sm text-muted">
                      Find qualified lawyers, browse portfolios, and get the legal help you need.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleCommonSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <p className="mt-1 text-xs text-muted">Must be at least 8 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                    className="mt-1"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-muted">
                    I accept the{" "}
                    <Link href="/terms" className="text-accent hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-full border border-border bg-background px-4 py-2 font-semibold transition hover:bg-accent-soft"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-accent px-4 py-2 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c]"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {step === 3 && role === "LAWYER" && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="overview" className="block text-sm font-medium text-foreground mb-2">
                    Overview / Bio
                  </label>
                  <textarea
                    id="overview"
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="practiceArea" className="block text-sm font-medium text-foreground mb-2">
                    Primary Practice Area
                  </label>
                  <select
                    id="practiceArea"
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select...</option>
                    {practiceAreaOptions.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="yearsExperience" className="block text-sm font-medium text-foreground mb-2">
                    Years of Experience
                  </label>
                  <input
                    id="yearsExperience"
                    type="number"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    min="0"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="languages" className="block text-sm font-medium text-foreground mb-2">
                    Languages (comma-separated)
                  </label>
                  <input
                    id="languages"
                    type="text"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="English, Spanish, French"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-full border border-border bg-background px-4 py-2 font-semibold transition hover:bg-accent-soft"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-full bg-accent px-4 py-2 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] disabled:opacity-50"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && role === "CLIENT" && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="preferredArea" className="block text-sm font-medium text-foreground mb-2">
                    Preferred Area of Law
                  </label>
                  <input
                    id="preferredArea"
                    type="text"
                    value={preferredArea}
                    onChange={(e) => setPreferredArea(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                    Preferred Language
                  </label>
                  <input
                    id="language"
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-full border border-border bg-background px-4 py-2 font-semibold transition hover:bg-accent-soft"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-full bg-accent px-4 py-2 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] disabled:opacity-50"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

