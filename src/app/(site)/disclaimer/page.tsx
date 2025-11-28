export const metadata = {
  title: "LawLink Disclaimer",
};

export default function DisclaimerPage() {
  return (
    <main>
      <section className="full-width-section bg-slate-100">
        <div className="section-content">
          <div className="mx-auto max-w-3xl space-y-6 px-4">
            <h1 className="text-4xl font-semibold tracking-tight">Professional Disclaimer</h1>
            <p className="text-sm text-muted">Last updated: October 5, 2025</p>
            <p className="text-base text-muted">
              LawLink introduces clients to independent legal professionals. We are not a law firm and do not provide legal advice.
            </p>
            <p className="text-base text-muted">
              Each professional is responsible for confirming conflicts, engagement terms, and compliance with local regulations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
