"use client";

import { FormEvent, useState } from "react";

const defaultFeedback = {
  email: "",
  message: "",
};

export default function Feedback() {
  const [form, setForm] = useState(defaultFeedback);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setResponseMessage("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to submit feedback.");
      }
      setStatus("sent");
      setResponseMessage("Thanks for sharing your thoughts!");
      setForm(defaultFeedback);
    } catch (error) {
      setStatus("error");
      setResponseMessage((error as Error).message || "Something went wrong.");
    }
  };

  return (
    <section id="feedback" className="container mx-auto space-y-8 px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Feedback & opinions
        </h2>
        <p className="mt-3 text-lg text-muted">
          Leave your thoughts — they go straight to our inbox.
        </p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-2xl gap-4 rounded-2xl border border-border bg-surface/80 p-6 shadow-soft"
      >
        <label className="flex flex-col gap-2 text-left text-sm font-semibold text-foreground">
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange("email")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            placeholder="you@example.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-left text-sm font-semibold text-foreground">
          Comment
          <textarea
            required
            value={form.message}
            onChange={handleChange("message")}
            className="min-h-[140px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            placeholder="Tell us what you think"
          />
        </label>
        {status !== "idle" ? (
          <p className={`text-sm ${status === "error" ? "text-red-500" : "text-muted"}`}>
            {responseMessage}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send feedback"}
        </button>
      </form>
    </section>
  );
}
