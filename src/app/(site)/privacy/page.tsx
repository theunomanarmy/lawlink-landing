export const metadata = {
  title: "LawLink Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted">
        Last updated: October 5, 2025
      </p>
      <p className="text-base text-muted">
        LawLink is committed to protecting the confidentiality of client and attorney
        information. This policy explains how we collect, use, and safeguard data across our
        platform.
      </p>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Information we collect</h2>
        <p className="text-base text-muted">
          We collect details provided during onboarding such as practice areas, bar
          credentials, communication preferences, and billing information. Usage data such as
          workspace activity and support interactions help us continuously improve the
          product. We do not sell personal data.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">How we use data</h2>
        <p className="text-base text-muted">
          Data powers secure collaboration, conflict checks, and analytics for our customers.
          We implement principle of least privilege, encrypt data in transit and at rest, and
          maintain audit trails. Optional analytics is fully anonymized and can be disabled at
          any time.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Your controls</h2>
        <p className="text-base text-muted">
          Customers can request access, export, or deletion of their data by contacting
          privacy@lawlink.ai. We process requests within the regulatory timelines relevant to
          your jurisdiction.
        </p>
      </section>
    </div>
  );
}
