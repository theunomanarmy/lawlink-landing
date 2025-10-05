import type { FAQItem } from "@/lib/types";

const faqs: FAQItem[] = [
  {
    question: "Are you a law firm?",
    answer: "No. LawLink is a marketplace that connects clients with independent legal professionals and firms.",
  },
  {
    question: "Who verifies lawyers?",
    answer: "We verify bar numbers and complete KYC at onboarding. Every profile receives a manual review today, with more automation coming soon.",
  },
  {
    question: "Do you provide emergency services 24/7?",
    answer: "We offer best-effort routing for urgent requests, but availability is not guaranteed and LawLink is not an emergency hotline.",
  },
  {
    question: "Do you give legal advice?",
    answer: "No. Legal advice is provided exclusively by the independent professionals on the platform.",
  },
  {
    question: "How do fees and VAT work?",
    answer: "We are operating with pilot pricing today. A detailed policy covering VAT, payouts, and refunds will be published at launch.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="container mx-auto space-y-8 px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-lg text-muted">
          Straight answers to the questions lawyers, firms, and clients ask most often.
        </p>
      </header>
      <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface/80 shadow-soft">
        {faqs.map((faq) => (
          <details key={faq.question} className="group p-6">
            <summary className="cursor-pointer list-none text-left text-lg font-semibold text-foreground">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
