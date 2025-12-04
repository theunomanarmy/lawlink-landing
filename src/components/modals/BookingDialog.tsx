"use client";

import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { track } from "@/lib/track";
import type { Lawyer } from "@/lib/types";

const CASE_TYPES = [
  "Corporate",
  "Financial",
  "Family",
  "Immigration",
  "Employment",
  "Data privacy",
  "Criminal",
  "Real estate",
  "Other",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface BookingDialogProps {
  lawyer: Lawyer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingDialog({ lawyer, open, onOpenChange }: BookingDialogProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: CASE_TYPES[0],
    details: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setMessage("");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        caseType: CASE_TYPES[0],
        details: "",
      });
      setFile(null);
    }
  }, [open]);

  const attachmentInfo = useMemo(() => {
    if (!file) return "No file selected";
    const sizeKb = Math.ceil(file.size / 1024);
    return `${file.name} (${sizeKb} KB)`;
  }, [file]);

  const handleInputChange = (field: "firstName" | "lastName" | "email" | "phone") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, details: event.target.value }));
  };

  const handleCaseTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, caseType: event.target.value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setStatus("error");
      setMessage("File too large (max 5MB).");
      return;
    }
    setFile(selected);
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      let attachmentBase64 = "";
      if (file) {
        attachmentBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject(new Error("Failed to process file"));
            }
          };
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        });
      }

      const payload = {
        kind: "booking",
        lawyerId: lawyer.id,
        lawyerName: lawyer.name,
        lawyerSpecialty: lawyer.specialty,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        caseType: form.caseType,
        details: form.details,
        attachmentName: file?.name ?? "",
        attachmentType: file?.type ?? "",
        attachmentSize: file?.size ?? 0,
        attachmentBase64,
      };

      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok || !json.ok) {
        throw new Error(json.error || "Unable to submit booking request.");
      }

      track("booking_submit", { id: lawyer.id });
      setStatus("success");
      setMessage("Thanks! We'll follow up shortly.");
    } catch (error) {
      setStatus("error");
      setMessage((error as Error).message || "Something went wrong.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-2xl">
            <Dialog.Title className="text-2xl font-semibold text-foreground">
              Book with {lawyer.name}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted">
              Send a brief overview so the lawyer can review your request.
            </Dialog.Description>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                  First name
                  <input
                    required
                    value={form.firstName}
                    onChange={handleInputChange("firstName")}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                  Last name
                  <input
                    required
                    value={form.lastName}
                    onChange={handleInputChange("lastName")}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                  Email
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={handleInputChange("email")}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                  Phone
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleInputChange("phone")}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                Case type
                <select
                  value={form.caseType}
                  onChange={handleCaseTypeChange}
                  className="rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {CASE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                Case details
                <textarea
                  required
                  value={form.details}
                  onChange={handleDetailsChange}
                  className="min-h-[160px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  placeholder="Summarise the matter, desired outcomes, and timelines."
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                Supporting file (optional)
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="text-sm text-muted"
                />
                <span className="text-xs text-muted">{attachmentInfo}</span>
              </label>

              {status !== "idle" ? (
                <p className={`text-sm ${status === "error" ? "text-red-500" : "text-muted"}`}>
                  {message}
                </p>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-4">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-full border border-accent px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-[#8b5a3c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Submit booking"}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
