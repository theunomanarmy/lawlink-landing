export default function Traction() {
  return (
    <section id="traction" className="container mx-auto space-y-6 px-4 py-16 text-center">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Help shape LawLink before launch
      </h2>
      <p className="mx-auto max-w-2xl text-base text-muted">
        Share your details so we can keep you updated as the platform evolves.
      </p>
      <a
        href="/waitlist"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Join waiting list
      </a>
    </section>
  );
}
