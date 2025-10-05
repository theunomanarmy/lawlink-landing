"use client";

import { FormEvent, useState } from "react";

const recipient = "ahmadazzeh04@gmail.com";

export default function WaitlistForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const updateField = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("LawLink waiting list");
    const body = encodeURIComponent(
      `First name: ${form.firstName}\nLast name: ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nAddress: ${form.address}`
    );
    window.open(`mailto:${recipient}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-border bg-surface/80 p-6 shadow-soft">
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
        Address
        <input
          value={form.address}
          onChange={updateField("address")}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Send details
      </button>
    </form>
  );
}
