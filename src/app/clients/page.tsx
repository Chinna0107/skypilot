import type { Metadata } from "next";
import ClientsClient from "./ClientsClient";

export const metadata: Metadata = {
  title: "Our Clients | Trusted Aerial Cinematography Partner Across India",
  description:
    "SkyPilot has partnered with leading organizations across India for aerial cinematography, drone filming, and visual productions. View our client portfolio and testimonials.",
  keywords: [
    "SkyPilot clients India",
    "drone services clients",
    "aerial cinematography clients",
    "drone filming testimonials India",
    "trusted drone partner India",
    "SkyPilot client portfolio",
    "drone company clients Andhra Pradesh",
  ],
  openGraph: {
    title: "Our Clients | SkyPilot Aerial Cinematography Partner India",
    description:
      "Trusted by leading organizations across India. Explore SkyPilot's client portfolio and testimonials for aerial cinematography and drone filming.",
    url: "https://skypilot.in/clients",
  },
  alternates: { canonical: "https://skypilot.in/clients" },
};

export default function ClientsPage() {
  return <ClientsClient />;
}
