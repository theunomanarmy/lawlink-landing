export const metadata = {
  title: "LawLink Disclaimer",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <h1 className="text-4xl font-semibold tracking-tight">Professional Disclaimer</h1>
      <p className="text-sm text-muted">Last updated: October 5, 2025</p>
      <p className="text-base text-muted">
        LawLink is a collaboration platform facilitating introductions between licensed
        professionals. We do not provide legal advice and are not a law firm. Relationships
        formed through the platform are directly between the parties involved.
      </p>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">No attorney-client relationship</h2>
        <p className="text-base text-muted">
          Use of the platform does not create an attorney-client relationship with LawLink.
          Attorneys remain responsible for compliance with all professional obligations in
          their jurisdictions.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Due diligence</h2>
        <p className="text-base text-muted">
          We provide tools and data to help verify counterparties, but firms must perform
          independent diligence before commencing engagements.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Questions</h2>
        <p className="text-base text-muted">
          For more detail please contact compliance@lawlink.ai. We are happy to answer
          questions and provide additional documentation.
        </p>
      </section>
    </div>
  );
}
