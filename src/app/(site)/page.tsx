import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DemoSearch from "@/components/DemoSearch";
import HowItWorks from "@/components/HowItWorks";
import StoryBlocks from "@/components/StoryBlocks";
import WhyUsInvest from "@/components/WhyUsInvest";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="full-width-section bg-white">
        <div className="section-content">
          <Hero />
        </div>
      </section>
      <section className="full-width-section bg-slate-100">
        <div className="section-content">
          <HowItWorks />
        </div>
      </section>
      <section className="full-width-section bg-gray-50">
        <div className="section-content">
          <StoryBlocks />
        </div>
      </section>
      <section className="full-width-section bg-zinc-100">
        <div className="section-content">
          <DemoSearch />
        </div>
      </section>
      <section className="full-width-section bg-neutral-100">
        <div className="section-content">
          <WhyUsInvest />
        </div>
      </section>
      <section className="full-width-section bg-gray-100">
        <div className="section-content">
          <Feedback />
        </div>
      </section>
      <section className="full-width-section bg-zinc-200">
        <div className="section-content">
          <Footer />
        </div>
      </section>
    </main>
  );
}






