"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers, Sun, Building2, Video,
  CheckCircle2, ArrowRight, Sparkles, Calculator,
} from "lucide-react";

const SERVICES_DATA = [
  {
    id: "survey",
    title: "Land Survey & Topographic Mapping",
    tagline: "Millimeter-Level Orthomosaics & GIS Datasets",
    category: "Surveying & Mapping",
    icon: Layers,
    image: "/images/service_survey_1784385731660.png",
    description: "We deploy high-accuracy RTK drones to capture high-density point clouds and georeferenced aerial imagery for land development, infrastructure, and mining.",
    deliverables: ["GeoTIFF Orthomosaic Maps", "3D Digital Elevation Models (DEM/DSM)", "DWG / DXF Contour Files", "Stockpile Volume Reports"],
    drone: "DJI Mavic 3 Classic (Hasselblad 4/3 CMOS)",
    turnaround: "24 - 48 Hours",
  },
  {
    id: "industrial",
    title: "Industrial & Thermal Asset Inspection",
    tagline: "Detect Hotspots & Structural Anomalies Before Failure",
    category: "Industrial Inspection",
    icon: Sun,
    image: "/images/service_inspection_1784385743368.png",
    description: "Thermal radiometric sensors identify micro-cracks in solar panels, high-voltage electrical grid hot spots, and structural wear on wind turbine blades.",
    deliverables: ["Radiometric Thermal Analysis Reports", "Cell Defect Classification Maps", "HD Optical Inspection Footage", "Interactive PDF Incident Matrix"],
    drone: "DJI Mavic 4 Pro & Thermal Sensor Rig",
    turnaround: "48 Hours",
  },
  {
    id: "construction",
    title: "Construction & Infrastructure Monitoring",
    tagline: "Track Site Progress with High-Definition 3D Meshes",
    category: "Construction & Engineering",
    icon: Building2,
    image: "https://terra-drone.com.sa/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-15-at-18.33.16-2.webp",
    description: "Periodic timeline drone scans give project managers, investors, and contractors accurate visual status updates and BIM integration files.",
    deliverables: ["Weekly / Monthly 4K Video Updates", "3D Textured Mesh Models (.OBJ/.PLY)", "CAD Overlay Alignment", "Interactive Web Portal View"],
    drone: "DJI Air 3S & Multi-spectral Array",
    turnaround: "24 Hours",
  },
  {
    id: "cinematography",
    title: "Cinematic Visuals & Real Estate Marketing",
    tagline: "Stunning 4K Aerial Storytelling for Commercial Brands",
    category: "Media & Real Estate",
    icon: Video,
    image: "/images/real_estate_marketing_1783188637280.png",
    description: "From luxury resort twilight promos to energetic FPV stage shots, we capture smooth, high-resolution aerial cinematography for broadcast and digital media.",
    deliverables: ["4K HDR 60fps Master Video Files", "Color Graded (LOG / Rec.709) Assets", "High-Res Raw Aerial Photographs", "Social Media Edits (9:16 & 16:9)"],
    drone: "DJI Air 3S & FPV Cinematic Rig",
    turnaround: "24 - 48 Hours",
  },
];

const STATS = [
  { label: "ACCURACY", value: "0.5 cm/px" },
  { label: "PERMITS", value: "100% Cleared" },
  { label: "OUTPUT", value: "CAD, BIM, GIS" },
  { label: "MISSIONS", value: "1000+" },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function ServicesMaster() {
  const [activeService, setActiveService] = useState(SERVICES_DATA[0]);
  const [calcService, setCalcService] = useState(SERVICES_DATA[0].id);
  const [calcAcres, setCalcAcres] = useState<number>(50);
  const heroRef = useFadeIn();
  const statsRef = useFadeIn();
  const hubRef = useFadeIn();
  const estimatorRef = useFadeIn();

  const estFlightHours = Math.max(1, Math.ceil(calcAcres / 40));
  const estImages = calcAcres * 12;

  return (
    <div className="bg-[var(--color-brand-dark)] text-white min-h-screen pt-20 sm:pt-28 pb-12 sm:pb-20" style={{ overflowX: "hidden" }}>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ── */}
        <div ref={heroRef} className="mb-8 sm:mb-14 space-y-3 fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            HIGH-PRECISION AERIAL SOLUTIONS
          </div>
          <h1 className="font-oswald text-2xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight">
            ENGINEERED FOR ACCURACY.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[var(--color-brand-orange)]">
              FLOWN WITH PRECISION.
            </span>
          </h1>
          <p className="font-inter text-gray-300 text-sm leading-relaxed max-w-2xl">
            We combine DGCA-certified flight management, state-of-the-art thermal and optical sensors, and GIS processing to deliver actionable datasets for modern enterprises.
          </p>
        </div>

        {/* ── STATS ── */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-14 fade-up">
          {STATS.map((item, i) => (
            <div key={i} className="bg-[#0e0e0e] border border-white/5 p-3 sm:p-5 rounded-xl">
              <span className="font-inter text-[9px] text-[var(--color-brand-orange)] font-bold tracking-widest uppercase block mb-1">{item.label}</span>
              <h3 className="font-oswald text-white text-sm sm:text-lg font-bold uppercase leading-tight">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* ── SERVICE HUB ── */}
        <div ref={hubRef} className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-4 sm:p-8 mb-8 sm:mb-14 fade-up">

          <div className="mb-5">
            <span className="font-inter text-[var(--color-brand-orange)] text-[10px] font-black uppercase tracking-widest block mb-1">
              INTERACTIVE CAPABILITY HUB
            </span>
            <h2 className="font-oswald text-xl sm:text-3xl font-extrabold uppercase tracking-tight">
              OUR CORE SERVICE DOMAINS
            </h2>
          </div>

          {/* Service selector — 2 col on mobile, 4 col on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {SERVICES_DATA.map((service) => {
              const Icon = service.icon;
              const isSelected = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-[var(--color-brand-orange)] border-transparent"
                      : "bg-[#141414] border-white/5"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg w-fit mb-2 ${isSelected ? "bg-black" : "bg-black/60"}`}>
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[var(--color-brand-orange)]" : "text-[var(--color-brand-orange)]"}`} />
                  </div>
                  <h4 className={`font-oswald text-[10px] sm:text-xs font-bold uppercase leading-tight ${isSelected ? "text-black" : "text-white"}`}>
                    {service.category}
                  </h4>
                  <p className={`font-inter text-[9px] mt-0.5 leading-tight ${isSelected ? "text-black/70" : "text-gray-500"}`}>
                    {service.title.split("&")[0].trim()}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="bg-[#141414] border border-white/5 rounded-xl p-4 sm:p-6 space-y-4">

            {/* Image */}
            <div className="relative w-full rounded-xl overflow-hidden bg-black border border-white/10" style={{ aspectRatio: "16/9" }}>
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 bg-black/80 border border-white/10 px-2.5 py-1 rounded text-[10px] font-bold text-[var(--color-brand-orange)] uppercase tracking-wider">
                DEPLOYMENT READY
              </span>
            </div>

            {/* Platform + turnaround */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[#1a1a1a] rounded-xl border border-white/5">
                <span className="text-[9px] text-gray-500 font-bold uppercase block mb-0.5">PLATFORM</span>
                <span className="text-white font-bold text-[11px] leading-snug block">{activeService.drone}</span>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-xl border border-white/5">
                <span className="text-[9px] text-gray-500 font-bold uppercase block mb-0.5">TURNAROUND</span>
                <span className="text-[var(--color-brand-orange)] font-bold text-xs">{activeService.turnaround}</span>
              </div>
            </div>

            {/* Title + desc */}
            <div>
              <span className="text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase block mb-1">
                {activeService.tagline}
              </span>
              <h3 className="font-oswald text-white text-lg sm:text-2xl font-extrabold uppercase mb-2">
                {activeService.title}
              </h3>
              <p className="font-inter text-gray-300 text-xs sm:text-sm leading-relaxed">
                {activeService.description}
              </p>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="font-oswald text-white text-xs font-bold uppercase tracking-wider mb-2">
                CLIENT DELIVERABLES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeService.deliverables.map((del, i) => (
                  <div key={i} className="p-2.5 bg-[#101010] rounded-lg border border-white/5 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-orange)] shrink-0 mt-0.5" />
                    <span className="font-inter text-xs text-gray-300 leading-snug">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="w-full bg-[var(--color-brand-orange)] hover:bg-orange-600 text-black hover:text-white py-3.5 rounded-xl font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
            >
              REQUEST QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── ESTIMATOR ── */}
        <div ref={estimatorRef} className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-4 sm:p-8 fade-up">
          <div className="mb-5">
            <div className="flex items-center gap-2 text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase mb-1">
              <Calculator className="w-4 h-4 shrink-0" />
              QUICK MISSION ESTIMATOR
            </div>
            <h3 className="font-oswald text-xl sm:text-2xl font-extrabold uppercase text-white">
              PROJECT SCOPE PREVIEW
            </h3>
            <p className="font-inter text-xs text-gray-400 mt-1">
              Adjust acreage to estimate flight time and data frames.
            </p>
          </div>

          <div className="bg-[#141414] border border-white/5 p-4 sm:p-6 rounded-xl space-y-5">

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Mission Type</label>
              <select
                value={calcService}
                onChange={(e) => setCalcService(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--color-brand-orange)]"
              >
                {SERVICES_DATA.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-300 uppercase">Target Area</label>
                <span className="text-[var(--color-brand-orange)] font-bold text-sm font-mono">{calcAcres} ACRES</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={calcAcres}
                onChange={(e) => setCalcAcres(Number(e.target.value))}
                className="w-full accent-[var(--color-brand-orange)] h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#101010] rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">FLIGHT TIME</span>
                <span className="font-oswald text-xl sm:text-2xl font-bold text-white">
                  ~{estFlightHours} {estFlightHours === 1 ? "HR" : "HRS"}
                </span>
              </div>
              <div className="p-4 bg-[#101010] rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">DATA FRAMES</span>
                <span className="font-oswald text-xl sm:text-2xl font-bold text-[var(--color-brand-orange)]">
                  ~{estImages.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.is-visible { opacity: 1; transform: translateY(0); }
      `}} />
    </div>
  );
}
