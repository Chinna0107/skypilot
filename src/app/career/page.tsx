import type { Metadata } from "next";
import CareerClient from "./CareerClient";

export const metadata: Metadata = {
  title: "Careers | Join SkyPilot — Drone Pilots, GIS Analysts & Filmmakers",
  description:
    "SkyPilot is hiring DGCA certified drone pilots, GIS analysts, photogrammetry specialists, and aerial cinematographers. Join a growing aerial cinematography team in Kurnool, Andhra Pradesh. Apply today.",
  keywords: [
    "drone pilot jobs India",
    "DGCA certified pilot job Kurnool",
    "GIS analyst drone job India",
    "photogrammetry specialist job",
    "aerial cinematographer job India",
    "drone filmmaker job",
    "FPV drone pilot job India",
    "SkyPilot careers",
    "drone company jobs Andhra Pradesh",
  ],
  openGraph: {
    title: "Careers at SkyPilot | Drone Pilots, GIS Analysts & Filmmakers",
    description:
      "Join SkyPilot — hiring DGCA certified drone pilots, GIS analysts, and aerial cinematographers. Build the future of aerial technology.",
    url: "https://skypilot.in/career",
  },
  alternates: { canonical: "https://skypilot.in/career" },
};

export default function CareerPage() {
  return <CareerClient />;
}
