import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DemoSearch from "@/components/DemoSearch";
import HowItWorks from "@/components/HowItWorks";
import StoryBlocks from "@/components/StoryBlocks";
import WhyUsInvest from "@/components/WhyUsInvest";
import Feedback from "@/components/Feedback";
import LegalClients from "@/components/LegalClients";
import ForLawyers from "@/components/ForLawyers";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="app-section">
        <div className="section-content">
          <Hero />
        </div>
      </section>
      <section className="app-section">
        <div className="section-content">
          <HowItWorks />
        </div>
      </section>
      <section className="app-section">
        <div className="section-content">
          <StoryBlocks />
        </div>
      </section>
      <section className="app-section">
        <div className="section-content">
          <DemoSearch />
        </div>
      </section>
      <section className="app-section">
        <div className="section-content">
          <WhyUsInvest />
        </div>
      </section>
      <section className="app-section">
        <div className="section-content">
          <LegalClients />
        </div>
      </section>
      <section className="app-section">
        <div className="section-content">
          <ForLawyers />
        </div>
      </section>
      <section className="app-section">
        <div className="section-content">
          <Feedback />
        </div>
      </section>
      <section className="app-section">
        <div className="section-content">
          <Footer />
        </div>
      </section>
    </main>
  );
}






