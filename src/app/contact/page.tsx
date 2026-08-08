import type { Metadata } from "next";
import ContactMaster from "@/components/ContactMaster";

export const metadata: Metadata = {
  title: "Contact SkyPilot | Book Aerial Cinematography & Drone Filming",
  description:
    "Get in touch with SkyPilot to book aerial cinematography, drone filming for weddings, real estate, films, and events. Speak directly with Emidi Vinay Kanth — DGCA certified drone pilot. Serving all of India.",
  keywords: [
    "book drone filmmaker India",
    "hire drone pilot India",
    "contact aerial cinematography",
    "drone filming quote India",
    "aerial photography booking",
    "drone services contact Kurnool",
    "SkyPilot contact",
    "hire DGCA certified drone pilot",
    "drone filming enquiry India",
  ],
  openGraph: {
    title: "Contact SkyPilot | Book Aerial Cinematography & Drone Filming",
    description:
      "Book professional drone filming for weddings, films, real estate & events. Get a custom quote from SkyPilot today.",
    url: "https://skypilot.in/contact",
  },
  alternates: { canonical: "https://skypilot.in/contact" },
};

export default function ContactPage() {
  return <ContactMaster />;
}
