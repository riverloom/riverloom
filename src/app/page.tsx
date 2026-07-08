import Hero from "@/components/sections/hero/Hero";
import BrandsSection from "@/components/sections/clients/BrandsSection";
import Services from "@/components/sections/services/Services";
import FeaturedWork from "@/components/sections/work/FeaturedWork";
import TechPremium from "@/components/sections/tech-premium/TechPremium";
import ProcessJourney from "@/components/sections/process/ProcessJourney";
import Testimonials from "@/components/sections/testimonials/Testimonials";
import WhyRiverLoom from "@/components/sections/why/WhyRiverLoom";
import CTA from "@/components/sections/cta/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandsSection />
      <Services />
      <FeaturedWork />
      <WhyRiverLoom />
      <TechPremium />
      <ProcessJourney />
      <CTA />
    </>
  );
}
