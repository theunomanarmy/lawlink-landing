"use client";

import { FormEvent, useState } from "react";

const feedbackRecipient = "ahmadazzeh04@gmail.com";

export default function Feedback() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("LawLink feedback");
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);
    window.open(`mailto:${feedbackRecipient}?subject=${subject}&body=${body}`, "_blank");
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            placeholder="you@example.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-left text-sm font-semibold text-foreground">
          Comment
          <textarea
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-[140px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            placeholder="Tell us what you think"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Send feedback
        </button>
      </form>
    </section>
  );
}
