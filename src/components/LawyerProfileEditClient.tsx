"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type LawyerProfile = {
  id: string;
  fullName: string;
  overview: string | null;
  location: string | null;
  practiceArea: string | null;
  profilePhotoUrl: string | null;
  yearsExperience: number | null;
  languages: string[];
  website: string | null;
  phone: string | null;
  isPublic: boolean;
};

type LawyerProfileEditClientProps = {
  profile: LawyerProfile;
};

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

export default function LawyerProfileEditClient({ profile: initialProfile }: LawyerProfileEditClientProps) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState(profile.profilePhotoUrl);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", profile.fullName);
      if (profile.overview) formData.append("overview", profile.overview);
      if (profile.location) formData.append("location", profile.location);
      if (profile.practiceArea) formData.append("practiceArea", profile.practiceArea);
      if (profile.yearsExperience) formData.append("yearsExperience", profile.yearsExperience.toString());
      if (profile.languages.length > 0) {
        formData.append("languages", JSON.stringify(profile.languages));
      } else {
        formData.append("languages", JSON.stringify([]));
      }
      if (profile.website) formData.append("website", profile.website);
      if (profile.phone) formData.append("phone", profile.phone);
      formData.append("isPublic", profile.isPublic.toString());

      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await fetch("/api/lawyer/profile", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update profile");
      }

      router.push("/dashboard/lawyer");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <Navbar />
      <section className="container mx-auto px-4 pb-16 pt-28">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Link
              href="/dashboard/lawyer"
              className="text-sm text-muted hover:text-foreground"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="rounded-2xl border border-border/70 bg-surface/95 p-8 shadow-soft">
            <h1 className="mb-6 text-2xl font-semibold">Edit Profile</h1>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Profile Photo</label>
                <div className="flex items-center gap-4">
                  {photoPreview && (
                    /* eslint-disable-next-line @next/next/no-img-element -- blob URLs not supported by next/image */
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Overview / Bio</label>
                <textarea
                  value={profile.overview || ""}
                  onChange={(e) => setProfile({ ...profile, overview: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={profile.location || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="City, Country"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Primary Practice Area</label>
                <select
                  value={profile.practiceArea || ""}
                  onChange={(e) => setProfile({ ...profile, practiceArea: e.target.value })}
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
                <label className="block text-sm font-medium mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={profile.yearsExperience || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      yearsExperience: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                  min="0"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Languages (comma-separated)</label>
                <input
                  type="text"
                  value={profile.languages.join(", ")}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      languages: e.target.value
                        .split(",")
                        .map((l) => l.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="English, Spanish, French"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  value={profile.website || ""}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={profile.isPublic}
                  onChange={(e) => setProfile({ ...profile, isPublic: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="isPublic" className="text-sm">
                  Make profile public (visible in directory)
                </label>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/dashboard/lawyer"
                  className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-center font-semibold transition hover:bg-accent-soft"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-full bg-accent px-4 py-2 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

