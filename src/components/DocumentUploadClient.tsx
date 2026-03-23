"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DocumentUploadClient() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("OTHER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!file || !title) {
      setError("File and title are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      if (description) formData.append("description", description);
      formData.append("fileType", fileType);

      const response = await fetch("/api/lawyer/documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload document");
      }

      router.push("/dashboard/lawyer");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload document");
      setLoading(false);
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
            <h1 className="mb-6 text-2xl font-semibold">Upload Document</h1>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">File *</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <p className="mt-1 text-xs text-muted">
                  Max size: 5MB. Allowed types: PDF, JPG, PNG, WEBP
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g., Bar Admission Certificate"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Optional description of the document"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Document Type</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="CERTIFICATE">Certificate</option>
                  <option value="LICENSE">License</option>
                  <option value="AWARD">Award</option>
                  <option value="OTHER">Other</option>
                </select>
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
                  {loading ? "Uploading..." : "Upload Document"}
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

