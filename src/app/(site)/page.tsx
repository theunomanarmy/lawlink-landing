import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import DemoSearch from "@/components/DemoSearch";
import Features from "@/components/Features";
import Security from "@/components/Security";
import BmcCanvas from "@/components/BmcCanvas";
import Pricing from "@/components/Pricing";
import WhyUsInvest from "@/components/WhyUsInvest";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <section id="demo">
        <DemoSearch />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="security">
        <Security />
      </section>
      <section id="bmc">
        <BmcCanvas />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <WhyUsInvest />
      <Roadmap />
      <FAQ />
      <Footer />
    </main>
  );
}
