export default function Pitch() {
  return (
    <section id="pitch" className="container mx-auto space-y-8 px-4 py-16">
      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Pitch</h2>
        <p className="text-base text-muted">
          Imagine a world where finding a lawyer tailored to your specific needs is as easy as booking a ride or
          ordering a meal. Our platform is designed to revolutionize how clients connect with legal professionals,
          providing a seamless, transparent, and efficient solution for both parties. Whether you’re an individual seeking
          legal advice or a law firm looking to expand your client base, we offer a powerful, industry-specific platform
          built for the digital age.
        </p>
      </header>

      <article className="mx-auto grid max-w-4xl gap-8 text-left text-base text-muted">
        <section className="space-y-3">
          <h3 className="text-2xl font-semibold text-foreground">The Problem: Fragmentation and Lack of Transparency</h3>
          <p>
            Current online platforms offering legal services often devalue the profession by lumping lawyers with general
            freelancers, resulting in a lack of transparency, trust, and professionalism. Clients struggle to find reliable
            online legal services without being hit with a pay wall or charged hidden fees, and lawyers—particularly
            smaller firms and independent professionals—face difficulties reaching their target audience.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-2xl font-semibold text-foreground">The AI Acceleration Gap</h3>
          <p>
            The rapid growth of AI is a double-edged sword. As governments adopt AI-assisted workflows, the rise in
            generated documents and imagery introduces new risks—from fake IDs to falsified contracts. The unregulated pace
            of AI investment leaves significant security gaps. LawLink recognises this overlooked problem and steps in to
            close it.
          </p>
          <p>
            Our vision includes a secure database that cross-references documents with official bodies and an in-house AI
            detection module that flags manipulated information before it causes harm.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-2xl font-semibold text-foreground">Our Solution: A Dedicated Legal Network</h3>
          <p>
            We are creating a specialised platform exclusively for legal professionals and their clients. Think of it as a
            &ldquo;LinkedIn for lawyers&rdquo; with enhanced workflows that facilitate lawyer–client connections, secure transactions,
            and long-term relationships.
          </p>
          <p>
            LawLink combines trusted human expertise with modern tooling so clients can verify who they work with and lawyers
            can operate confidently in an increasingly digital environment.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">Key Features</h3>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-foreground">Tailored lawyer search:</strong> find counsel by location,
                specialisation, and service offering.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-foreground">Membership boosts:</strong> firms can secure prioritised placement and
                enhanced visibility through tiered plans.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-foreground">Integrated legal tools:</strong> document sharing, appointment booking,
                and secure chat streamline client collaboration.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-foreground">GDPR-first:</strong> built with privacy and compliance at the centre of
                every workflow.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-foreground">Emergency feature:</strong> rapid outreach to the right legal specialists
                in moments that matter.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-foreground">24/7 online availability:</strong> clients can connect with legal teams at
                any hour for timely support.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-foreground">Community networking:</strong> a vibrant hub for lawyers, firms, and
                clients to collaborate and share knowledge.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </section>
  );
}

