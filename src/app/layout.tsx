import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "https://skypilot.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "SkyPilot Drone Services | Aerial Cinematography & Drone Filming in Kurnool, Andhra Pradesh",
    template: "%s | SkyPilot Drone Services",
  },
  description:
    "SkyPilot offers professional aerial cinematography, drone filming for weddings, films, real estate, brand films & events across India. Led by Emidi Vinay Kanth — 8 years of drone operations experience. DGCA certified. Based in Kurnool, Andhra Pradesh.",
  keywords: [
    // Core services
    "aerial cinematography India",
    "drone filming services India",
    "drone videography",
    "aerial photography",
    "drone services Kurnool",
    "drone services Andhra Pradesh",
    // Niche services
    "wedding drone videography",
    "real estate aerial photography",
    "drone filming for films",
    "music video drone filming",
    "brand film drone",
    "social media drone content",
    "event drone coverage",
    "tourism aerial video",
    "destination aerial visuals",
    "hospitality drone video",
    // Geo
    "drone services Hyderabad",
    "drone services Vijayawada",
    "drone services Bangalore",
    "drone pilot Andhra Pradesh",
    "drone videography South India",
    // Credentials
    "DGCA certified drone pilot",
    "licensed drone operator India",
    "professional drone operator",
    // Brand
    "SkyPilot drone",
    "SkyPilot aerial",
    "Emidi Vinay Kanth drone",
    "Vinay Kanth SkyPilot",
  ],
  authors: [{ name: "Emidi Vinay Kanth", url: BASE_URL }],
  creator: "SkyPilot Drone Services",
  publisher: "SkyPilot Drone Services",
  category: "Drone Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "SkyPilot Drone Services",
    title:
      "SkyPilot Drone Services | Aerial Cinematography & Drone Filming in India",
    description:
      "Professional aerial cinematography, drone filming for weddings, films, real estate & events. DGCA certified. Led by Emidi Vinay Kanth with 8 years of experience. Based in Kurnool, AP.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkyPilot Drone Services — Aerial Cinematography India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SkyPilot Drone Services | Aerial Cinematography & Drone Filming",
    description:
      "Professional aerial cinematography, drone filming for weddings, films, real estate & events. DGCA certified. Kurnool, Andhra Pradesh.",
    images: ["/images/og-image.jpg"],
    creator: "@skypilotdrones",
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: "SkyPilot Drone Services",
      alternateName: "SkyPilot",
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      image: `${BASE_URL}/logo.png`,
      description:
        "Professional aerial cinematography and drone filming services for weddings, films, real estate, brand films, events, and tourism. DGCA certified operations across India.",
      telephone: "+91-XXXXXXXXXX",
      email: "contact@skypilot.in",
      founder: {
        "@type": "Person",
        name: "Emidi Vinay Kanth",
        jobTitle: "Founder & Chief Drone Pilot",
        description:
          "DGCA certified drone operations professional with 8 years of experience in aerial filming and drone operations.",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kurnool",
        addressRegion: "Andhra Pradesh",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "15.8281",
        longitude: "78.0373",
      },
      areaServed: [
        { "@type": "State", name: "Andhra Pradesh" },
        { "@type": "State", name: "Telangana" },
        { "@type": "Country", name: "India" },
      ],
      serviceType: [
        "Aerial Cinematography",
        "Drone Filming",
        "Wedding Drone Videography",
        "Real Estate Aerial Photography",
        "Brand Film Production",
        "Event Drone Coverage",
        "Tourism Aerial Visuals",
        "Music Video Drone Filming",
        "Social Media Drone Content",
        "Drone Operation Support",
      ],
      hasCredential: "DGCA Remote Pilot Certificate (RPC)",
      sameAs: [
        "https://www.instagram.com/skypilot.in",
        "https://www.youtube.com/@skypilot",
      ],
      priceRange: "$$",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "SkyPilot Drone Services",
      description:
        "Professional aerial cinematography and drone filming services across India.",
      publisher: { "@id": `${BASE_URL}/#business` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SmoothScroll from "@/components/SmoothScroll";
import SplashScreen from "@/components/SplashScreen";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${oswald.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={BASE_URL} />
        <meta name="geo.region" content="IN-AP" />
        <meta name="geo.placename" content="Kurnool, Andhra Pradesh" />
        <meta name="geo.position" content="15.8281;78.0373" />
        <meta name="ICBM" content="15.8281, 78.0373" />
        <meta name="theme-color" content="#F5851F" />
      </head>
      <body className="bg-[var(--color-brand-dark)] text-white flex flex-col min-h-screen">
        <CustomCursor />
        <SmoothScroll>
          <SplashScreen />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingButtons />
        </SmoothScroll>
      </body>
    </html>
  );
}
