import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsCounter from "@/components/StatsCounter";
import PromoBanner from "@/components/PromoBanner";
import FounderAndClients from "@/components/FounderAndClients";
import CallToAction from "@/components/CallToAction";

export const metadata: Metadata = {
  title:
    "SkyPilot Drone Services | Aerial Cinematography & Drone Filming in India",
  description:
    "SkyPilot delivers cinematic aerial footage for films, weddings, real estate, brand campaigns, events, and tourism. Led by DGCA certified drone pilot Emidi Vinay Kanth — 8 years of aerial experience. Based in Kurnool, Andhra Pradesh. Pan-India service.",
  keywords: [
    "aerial cinematography India",
    "drone filming India",
    "drone videography",
    "wedding drone video",
    "real estate drone video",
    "brand film drone India",
    "drone services Kurnool",
    "DGCA certified drone pilot",
    "SkyPilot drone services",
    "aerial photography India",
    "cinematic drone India",
    "event drone coverage",
    "music video drone",
    "tourism drone video",
    "drone pilot Andhra Pradesh",
  ],
  openGraph: {
    title: "SkyPilot Drone Services | Aerial Cinematography & Drone Filming",
    description:
      "Cinematic aerial footage for films, weddings, real estate & events. DGCA certified. Led by Emidi Vinay Kanth. Kurnool, Andhra Pradesh.",
    url: "https://skypilot.in",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkyPilot Drone Services — Aerial Cinematography India",
      },
    ],
  },
  alternates: { canonical: "https://skypilot.in" },
};

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
