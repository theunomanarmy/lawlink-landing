export const metadata = { title: "Join the LawLink waiting list" };

import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistPage() {
  return (
    <main>
      <section className="full-width-section bg-background">
        <div className="section-content">
          <div className="mx-auto max-w-2xl space-y-8 px-4">
            <header className="space-y-3 text-center">
              <h1 className="text-4xl font-semibold tracking-tight">Join the LawLink waiting list</h1>
              <p className="text-base text-muted">
                Share your details so we can reach out as soon as new product milestones go live.
              </p>
            </header>
            <WaitlistForm />
          </div>
        </div>
      </section>
    </main>
  );
}
