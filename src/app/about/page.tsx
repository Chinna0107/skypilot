import type { Metadata } from "next";
import AboutMaster from "@/components/AboutMaster";

export const metadata: Metadata = {
  title: "About SkyPilot | Emidi Vinay Kanth — Founder & Drone Pilot",
  description:
    "Meet Emidi Vinay Kanth, DGCA certified drone pilot and founder of SkyPilot with 8 years of aerial filming experience. Learn about our vision, services, and why we are a trusted name in aerial cinematography across India.",
  keywords: [
    "SkyPilot about",
    "Emidi Vinay Kanth drone pilot",
    "DGCA certified drone pilot India",
    "aerial cinematography founder",
    "drone pilot Kurnool",
    "professional drone filmmaker India",
    "SkyPilot drone services about",
    "drone operations professional",
  ],
  openGraph: {
    title: "About SkyPilot | Emidi Vinay Kanth — Founder & Drone Pilot",
    description:
      "8 years of aerial filming expertise. DGCA certified. Meet the founder of SkyPilot and learn how we bring creative vision and precision to every flight.",
    url: "https://skypilot.in/about",
    images: [{ url: "/images/founder_portrait_vinay.png", alt: "Emidi Vinay Kanth — SkyPilot Founder" }],
  },
  alternates: { canonical: "https://skypilot.in/about" },
};

export default function AboutPage() {
  return <AboutMaster />;
}
