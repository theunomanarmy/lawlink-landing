export const metadata = {
  title: "LawLink Terms",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="text-sm text-muted">Last updated: October 5, 2025</p>
      <p className="text-base text-muted">
        These Terms govern your access to and use of the LawLink platform. By using the
        service you agree to the obligations outlined below and confirm you have the
        authority to bind your organization.
      </p>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Accounts & eligibility</h2>
        <p className="text-base text-muted">
          Users must maintain accurate, current profile information and keep credentials
          secure. We reserve the right to suspend accounts that violate our community
          guidelines or confidentiality standards.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Engagements & payments</h2>
        <p className="text-base text-muted">
          Engagement terms between firms and external counsel are executed electronically
          within the workspace. LawLink facilitates invoicing and distribution per the agreed
          commercial terms. Late payments may incur finance charges as allowed by law.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Limitation of liability</h2>
        <p className="text-base text-muted">
          To the maximum extent permitted, LawLink is not liable for indirect, incidental,
          or consequential damages. Total liability is limited to the fees paid for the
          services in the twelve months preceding the incident.
        </p>
      </section>
    </div>
  );
}
