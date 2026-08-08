import type { Metadata } from "next";
import ServicesMaster from "@/components/ServicesMaster";

export const metadata: Metadata = {
  title: "Drone Services | Aerial Cinematography, Weddings, Real Estate & Brand Films",
  description:
    "SkyPilot offers aerial cinematography for films, commercials, weddings, real estate, tourism, brand content, and social media. Drone operation support for creative productions. DGCA certified. Pan-India service.",
  keywords: [
    "aerial cinematography services India",
    "drone filming for films",
    "drone filming commercials",
    "wedding drone videography India",
    "real estate aerial video",
    "architecture aerial photography",
    "tourism aerial video India",
    "brand film drone production",
    "social media drone content",
    "drone operation support",
    "music video drone filming",
    "event drone coverage India",
    "drone services Kurnool",
    "drone cinematography Andhra Pradesh",
    "DGCA certified drone operator",
  ],
  openGraph: {
    title: "Drone Services | Aerial Cinematography, Weddings, Real Estate & Brand Films",
    description:
      "Full suite of aerial cinematography and drone filming services — films, weddings, real estate, tourism, brand films & more. DGCA certified. Pan-India.",
    url: "https://skypilot.in/services",
  },
  alternates: { canonical: "https://skypilot.in/services" },
};

export default function ServicesPage() {
  return <ServicesMaster />;
}
