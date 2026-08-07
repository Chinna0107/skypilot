import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsCounter from "@/components/StatsCounter";
import PromoBanner from "@/components/PromoBanner";
import FounderAndClients from "@/components/FounderAndClients";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <StatsCounter />
      <Portfolio />
      <PromoBanner />
      <FounderAndClients />
      <CallToAction />
    </>
  );
}
