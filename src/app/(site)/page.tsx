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
import type { LawyerProfile } from "@/lib/types";
import demoLawyers from "@/../public/demo-lawyers.json";

const lawyers = demoLawyers as LawyerProfile[];

export default function Page() {
  return (
    <div className="space-y-20">
      <Hero />
      <HowItWorks />
      <DemoSearch lawyers={lawyers} />
      <Features />
      <Security />
      <BmcCanvas />
      <Pricing />
      <WhyUsInvest />
      <Roadmap />
      <FAQ />
    </div>
  );
}
