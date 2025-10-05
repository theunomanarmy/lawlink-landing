import type { FAQItem } from "@/lib/types";

const faqs: FAQItem[] = [
  {
    question: "How do you vet lawyers before they join the marketplace?",
    answer:
      "We verify bar standing, review representative matters, collect references, and run a conflicts + compliance questionnaire before activating any profile.",
  },
  {
    question: "Can LawLink plug into our billing and document systems?",
    answer:
      "Yes. Growth and Enterprise plans include integrations with leading timekeeping, e-billing, and DMS platforms, plus a robust API.",
  },
  {
    question: "Do you support alternative fee arrangements?",
    answer:
      "Absolutely. We handle subscription, success, or project-based billing so firms can craft client-aligned fee structures without extra admin.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We run guided pilots for qualified teams to ensure the workflows match your needs before rolling out broadly.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="space-y-8">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-lg text-muted">
          Everything you need to know about collaborating with LawLink as a customer or
          contributor.
        </p>
      </header>
      <div className="mx-auto max-w-3xl divide-y divide-border rounded-3xl border border-border bg-surface/80 shadow-soft">
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
