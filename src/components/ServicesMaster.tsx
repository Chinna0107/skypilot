"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Layers, 
  Sun, 
  Building2, 
  Video, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Calculator,
  Compass,
  HardHat,
  Ruler
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    turnaround: "24 - 48 Hours"
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
    turnaround: "48 Hours"
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
    turnaround: "24 Hours"
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
    turnaround: "24 - 48 Hours"
  }
];

export default function ServicesMaster() {
  const [activeService, setActiveService] = useState(SERVICES_DATA[0]);
  const [calcService, setCalcService] = useState(SERVICES_DATA[0].id);
  const [calcAcres, setCalcAcres] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".serv-anim", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Quick estimator calculations
  const estFlightHours = Math.max(1, Math.ceil(calcAcres / 40));
  const estImages = calcAcres * 12;

  return (
    <div ref={containerRef} className="bg-[var(--color-brand-dark)] text-white min-h-screen pt-20 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-brand-orange)]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION 1: HERO HEADER ================= */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-4">
          <div className="serv-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            HIGH-PRECISION AERIAL SOLUTIONS
          </div>

          <h1 className="serv-anim font-oswald text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none">
            ENGINEERED FOR ACCURACY.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[var(--color-brand-orange)]">
              FLOWN WITH PRECISION.
            </span>
          </h1>

          <p className="serv-anim font-inter text-gray-300 text-sm sm:text-base leading-relaxed">
            We combine DGCA-certified flight management, state-of-the-art thermal and optical sensors, and GIS processing to deliver actionable datasets for modern enterprises.
          </p>
        </div>

        {/* Stats Quick Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-20">
          {[
            { label: "MAPPING ACCURACY", value: "Up to 0.5 cm/px" },
            { label: "FLIGHT PERMITS", value: "Digital Sky 100% Cleared" },
            { label: "DATA DELIVERABLE", value: "CAD, BIM, GIS & 4K" },
            { label: "PROJECTS DELIVERED", value: "1000+ Missions" }
          ].map((item, i) => (
            <div key={i} className="bg-[#0e0e0e] border border-white/5 p-5 rounded-2xl">
              <span className="font-inter text-[9px] text-[var(--color-brand-orange)] font-bold tracking-widest uppercase block mb-1">{item.label}</span>
              <h3 className="font-oswald text-white text-lg sm:text-xl font-bold uppercase">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* ================= SECTION 2: INTERACTIVE SERVICES OPERATIONS HUB ================= */}
        <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 sm:p-10 mb-20 shadow-2xl">
          <div className="mb-10">
            <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] font-black uppercase mb-1 block">
              INTERACTIVE CAPABILITY HUB
            </span>
            <h2 className="font-oswald text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
              OUR CORE SERVICE DOMAINS
            </h2>
          </div>

          {/* Service Buttons Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {SERVICES_DATA.map((service) => {
              const Icon = service.icon;
              const isSelected = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-4 ${
                    isSelected
                      ? "bg-[var(--color-brand-orange)] border-transparent text-black shadow-[0_0_25px_rgba(245,133,31,0.25)]"
                      : "bg-[#121212] border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isSelected ? "bg-black text-[var(--color-brand-orange)]" : "bg-black/50 text-[var(--color-brand-orange)] border border-white/5"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-oswald text-xs sm:text-sm font-bold uppercase tracking-wider leading-snug">{service.category}</h4>
                    <p className={`font-inter text-[10px] ${isSelected ? "text-black/80 font-semibold" : "text-gray-500"}`}>{service.title.split("&")[0]}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Service Detailed Inspector Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#141414] border border-white/5 p-6 sm:p-8 rounded-2xl animate-fadeIn">
            
            {/* Left: High-Res Image Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black border border-white/10 group">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md text-[10px] font-bold text-[var(--color-brand-orange)] uppercase tracking-wider">
                  DEPLOYMENT READY
                </span>
              </div>

              {/* Drone Specifications Card */}
              <div className="p-4 bg-[#1a1a1a] rounded-xl border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">PRIMARY DEPLOYMENT PLATFORM</span>
                  <span className="text-white font-bold">{activeService.drone}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">TYPICAL TURNAROUND</span>
                  <span className="text-[var(--color-brand-orange)] font-bold">{activeService.turnaround}</span>
                </div>
              </div>
            </div>

            {/* Right: Specs & Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase block mb-1">{activeService.tagline}</span>
                <h3 className="font-oswald text-white text-2xl sm:text-3xl font-extrabold uppercase mb-3">{activeService.title}</h3>
                <p className="font-inter text-gray-300 text-xs sm:text-sm leading-relaxed">{activeService.description}</p>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <h4 className="font-oswald text-white text-xs font-bold uppercase tracking-wider mb-3">CLIENT DELIVERABLES PACK</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.deliverables.map((del, i) => (
                    <div key={i} className="p-3 bg-[#101010] rounded-xl border border-white/5 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-orange)] shrink-0" />
                      <span className="font-inter text-xs text-gray-300 font-medium">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA link */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="bg-[var(--color-brand-orange)] hover:bg-orange-600 text-black hover:text-white px-6 py-3 rounded-xl font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300 inline-flex items-center gap-2"
                >
                  REQUEST {activeService.category.toUpperCase()} QUOTE <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ================= SECTION 3: INTERACTIVE SCOPE ESTIMATOR ================= */}
        <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 sm:p-10 mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase mb-1">
                <Calculator className="w-4 h-4" /> QUICK MISSION PLANNING ESTIMATOR
              </div>
              <h3 className="font-oswald text-2xl sm:text-3xl font-extrabold uppercase text-white">PROJECT SCOPE PREVIEW</h3>
            </div>
            <p className="font-inter text-xs text-gray-400 max-w-sm">Adjust project acreage below to estimate total data frames and flight coverage time.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141414] border border-white/5 p-6 rounded-2xl">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Select Mission Type</label>
                <select
                  value={calcService}
                  onChange={(e) => setCalcService(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--color-brand-orange)]"
                >
                  {SERVICES_DATA.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-gray-300 uppercase">Target Area Size</label>
                  <span className="text-[var(--color-brand-orange)] font-bold text-sm font-mono">{calcAcres} ACRES</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={calcAcres}
                  onChange={(e) => setCalcAcres(Number(e.target.value))}
                  className="w-full accent-[var(--color-brand-orange)] bg-[#222] h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Output Ribbon */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#101010] rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">ESTIMATED FLIGHT TIME</span>
                <span className="font-oswald text-2xl font-bold text-white">~{estFlightHours} {estFlightHours === 1 ? "HOUR" : "HOURS"}</span>
              </div>
              <div className="p-4 bg-[#101010] rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">ESTIMATED DATA FRAMES</span>
                <span className="font-oswald text-2xl font-bold text-[var(--color-brand-orange)]">~{estImages.toLocaleString()} SHOTS</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}} />
    </div>
  );
}
