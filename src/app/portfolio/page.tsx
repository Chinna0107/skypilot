import type { Metadata } from "next";
import PortfolioGallery from "@/components/PortfolioGallery";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Portfolio | Aerial Cinematography & Drone Filming Showreel",
  description:
    "Explore SkyPilot's portfolio of stunning aerial cinematography, cinematic drone films, wedding coverage, real estate aerials, and brand content. View our showreel of projects across India.",
  keywords: [
    "drone portfolio India",
    "aerial cinematography showreel",
    "drone filming portfolio",
    "cinematic drone video gallery",
    "wedding drone footage",
    "real estate aerial video portfolio",
    "drone photography gallery India",
    "SkyPilot portfolio",
    "aerial film reel India",
  ],
  openGraph: {
    title: "Portfolio | SkyPilot Aerial Cinematography Showreel",
    description:
      "Cinematic aerial footage gallery — weddings, real estate, brand films, tourism, and more. See SkyPilot's work across India.",
    url: "https://skypilot.in/portfolio",
  },
  alternates: { canonical: "https://skypilot.in/portfolio" },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)]">
      <PageHeader
        title="Our Portfolio"
        description="Explore our gallery of stunning aerial cinematography, high-resolution photography, and precision mapping projects."
        bgVideo="https://res.cloudinary.com/p8auppz8/video/upload/v1786115590/hero-bg-compressed_wlgi5s.mp4"
        showOverlay={false}
      />
      <PortfolioGallery />
    </div>
  );
}
