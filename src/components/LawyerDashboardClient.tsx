"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseDistributionPieChart from "@/components/CaseDistributionPieChart";
import Link from "next/link";
import { Edit, Upload, Trash2, Plus } from "lucide-react";

type PracticeArea = {
  id: string;
  name: string;
  caseCount: number;
};

type Document = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: string;
  uploadedAt: string | Date;
};

type LawyerProfile = {
  id: string;
  fullName: string;
  overview: string | null;
  location: string | null;
  practiceArea: string | null;
  profilePhotoUrl: string | null;
  yearsExperience: number | null;
  languages: string[];
  isPublic: boolean;
  isApproved?: boolean;
  practiceAreas: PracticeArea[];
  documents: Document[];
};

type LawyerDashboardClientProps = {
  profile: LawyerProfile;
};

export default function LawyerDashboardClient({ profile: initialProfile }: LawyerDashboardClientProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [practiceAreas, setPracticeAreas] = useState(profile.practiceAreas);
  const [documents, setDocuments] = useState(profile.documents);
  const [showPracticeAreaForm, setShowPracticeAreaForm] = useState(false);
  const [newAreaName, setNewAreaName] = useState("");
  const [newAreaCount, setNewAreaCount] = useState("");

  const refreshData = async () => {
    try {
      const [profileRes, areasRes, docsRes] = await Promise.all([
        fetch("/api/lawyer/profile"),
        fetch("/api/lawyer/practice-areas"),
        fetch("/api/lawyer/documents"),
      ]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
      }

      if (areasRes.ok) {
        const areasData = await areasRes.json();
        setPracticeAreas(areasData);
      }

      if (docsRes.ok) {
        const docsData = await docsRes.json();
        setDocuments(docsData);
      }
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  };

  const handleAddPracticeArea = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/lawyer/practice-areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAreaName,
          caseCount: parseInt(newAreaCount),
        }),
      });

      if (response.ok) {
        await refreshData();
        setNewAreaName("");
        setNewAreaCount("");
        setShowPracticeAreaForm(false);
      }
    } catch (error) {
      console.error("Failed to add practice area:", error);
    }
  };

  const handleDeletePracticeArea = async (id: string) => {
    if (!confirm("Are you sure you want to delete this practice area?")) return;

    try {
      const response = await fetch(`/api/lawyer/practice-areas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await refreshData();
      }
    } catch (error) {
      console.error("Failed to delete practice area:", error);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      const response = await fetch(`/api/lawyer/documents/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await refreshData();
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#080607] to-[#050304]">
      <Navbar />
      <section className="container mx-auto px-4 pb-16 pt-28">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Profile Overview */}
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                {profile.profilePhotoUrl && (
                  <Image
                    src={profile.profilePhotoUrl}
                    alt={profile.fullName}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-semibold mb-2">{profile.fullName}</h1>
                  <p className="text-muted">
                    {profile.practiceArea && (
                      <span className="inline-block mr-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                        {profile.practiceArea}
                      </span>
                    )}
                    {profile.location && <span>{profile.location}</span>}
                    {profile.yearsExperience && (
                      <span className="ml-2">{profile.yearsExperience} years experience</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/platform"
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-muted hover:text-foreground hover:bg-accent-soft transition"
                >
                  <span>Open Platform</span>
                </Link>
                <Link
                  href="/dashboard/lawyer/edit"
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-soft"
                >
                  <Edit size={16} />
                  Edit Profile
                </Link>
              </div>
            </div>

            {profile.overview && (
              <p className="text-muted mb-4">{profile.overview}</p>
            )}

            {profile.languages.length > 0 && (
              <p className="text-sm text-muted">
                Languages: {profile.languages.join(", ")}
              </p>
            )}

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted">Profile Status:</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  profile.isPublic && profile.isApproved
                    ? "bg-green-500/20 text-green-500"
                    : "bg-yellow-500/20 text-yellow-500"
                }`}
              >
                {profile.isPublic && profile.isApproved ? "Public" : "Pending Approval"}
              </span>
            </div>
          </div>

          {/* Case Distribution */}
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Case Distribution</h2>
              <button
                onClick={() => setShowPracticeAreaForm(!showPracticeAreaForm)}
                className="inline-flex items-center gap-2 rounded-full border border-accent bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-soft"
              >
                <Plus size={16} />
                Add Practice Area
              </button>
            </div>

            {showPracticeAreaForm && (
              <form onSubmit={handleAddPracticeArea} className="mb-6 p-4 rounded-lg bg-background border border-border">
                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Practice Area Name</label>
                    <input
                      type="text"
                      value={newAreaName}
                      onChange={(e) => setNewAreaName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Case Count</label>
                    <input
                      type="number"
                      value={newAreaCount}
                      onChange={(e) => setNewAreaCount(e.target.value)}
                      required
                      min="0"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-full bg-accent px-4 py-2 text-white text-sm font-semibold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPracticeAreaForm(false);
                      setNewAreaName("");
                      setNewAreaCount("");
                    }}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <CaseDistributionPieChart practiceAreas={practiceAreas} />

            {practiceAreas.length > 0 && (
              <div className="mt-6 space-y-2">
                {practiceAreas.map((area) => (
                  <div
                    key={area.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
                  >
                    <div>
                      <span className="font-medium">{area.name}</span>
                      <span className="ml-2 text-sm text-muted">{area.caseCount} cases</span>
                    </div>
                    <button
                      onClick={() => handleDeletePracticeArea(area.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Documents & Certificates</h2>
              <Link
                href="/dashboard/lawyer/upload"
                className="inline-flex items-center gap-2 rounded-full border border-accent bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-soft"
              >
                <Upload size={16} />
                Upload Document
              </Link>
            </div>

            {documents.length === 0 ? (
              <p className="text-muted">No documents uploaded yet.</p>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-background border border-border"
                  >
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      {doc.description && (
                        <p className="text-sm text-muted mt-1">{doc.description}</p>
                      )}
                      <p className="text-xs text-muted mt-1">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline text-sm"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

