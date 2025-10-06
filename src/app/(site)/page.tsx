import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DemoSearch from "@/components/DemoSearch";
import HowItWorks from "@/components/HowItWorks";
import StoryBlocks from "@/components/StoryBlocks";
import Features from "@/components/Features";
import BmcCanvas from "@/components/BmcCanvas";
import WhyUsInvest from "@/components/WhyUsInvest";
import Traction from "@/components/Traction";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <StoryBlocks />
      <section id="demo">
        <DemoSearch />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="bmc">
        <BmcCanvas />
      </section>
      <Traction />
      <WhyUsInvest />
      <Feedback />
      <Footer />
    </main>
  );
}






