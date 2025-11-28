"use client";

import { FormEvent, useState } from "react";

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  role: "",
  country: "",
  specialties: [] as string[],
};

const specialtyOptions = ["Corporate", "Financial", "Family", "Immigration", "Other"];

export default function WaitlistForm() {
  const [form, setForm] = useState(defaultState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const updateField = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const toggleSpecialty = (value: string) => {
    setForm((prev) => {
      const exists = prev.specialties.includes(value);
      const specialties = exists
        ? prev.specialties.filter((item) => item !== value)
        : [...prev.specialties, value];
      return { ...prev, specialties };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "waitlist", ...form }),
      });
      const json = await response.json();
      if (!response.ok || !json.ok) {
        throw new Error(json.error || "Failed to submit");
      }
      setStatus("sent");
      setMessage("Thanks! We'll be in touch soon.");
      setForm(defaultState);
    } catch (error) {
      setStatus("error");
      setMessage((error as Error).message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          First name
          <input
            required
            value={form.firstName}
            onChange={updateField("firstName")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          Last name
          <input
            required
            value={form.lastName}
            onChange={updateField("lastName")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
        Email address
        <input
          type="email"
          required
          value={form.email}
          onChange={updateField("email")}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          Phone number
          <input
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          Country
          <input
            value={form.country}
            onChange={updateField("country")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
        Role
        <input
          value={form.role}
          onChange={updateField("role")}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
        Address
        <input
          value={form.address}
          onChange={updateField("address")}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <fieldset className="space-y-2 text-left text-sm text-foreground">
        <legend className="font-semibold">Specialties (optional)</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {specialtyOptions.map((option) => (
            <label key={option} className="inline-flex items-center gap-2 text-muted">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                checked={form.specialties.includes(option)}
                onChange={() => toggleSpecialty(option)}
              />
              <span className="text-sm text-foreground">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {status !== "idle" ? (
        <p className={`text-sm ${status === "error" ? "text-red-500" : "text-muted"}`}>
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Send details"}
      </button>
    </form>
  );
}
