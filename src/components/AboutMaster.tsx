"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  MapPin,
  Cpu,
  Compass,
  Camera,
  HardHat,
  Landmark,
  HeartHandshake,
  CheckSquare,
  ArrowRight,
  UserCheck,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { year: "2016", title: "Flight Beginnings", desc: "Started flying initial drone models and exploring aerial photography." },
  { year: "2018", title: "Commercial Pilot", desc: "Turned passion into a licensed commercial drone service enterprise." },
  { year: "2020", title: "Industrial Expansion", desc: "Expanded into thermal solar inspections, highway mapping & CAD GIS datasets." },
  { year: "2023", title: "200+ Enterprise Clients", desc: "Trusted partner for top construction, energy & manufacturing brands." },
  { year: "2026", title: "Next-Gen Fleet", desc: "Operating triple-lens RTK platforms & custom heavy-lift LiDAR hexacopters." },
];

const FLEET_ITEMS = [
  {
    name: "DJI Air 3S",
    tag: "Tactical Cinematography",
    image: "/images/fleet_air_3s.png",
    icon: Camera,
    specs: "Dual-camera • 1-inch CMOS • 48MP • 4K/60fps HDR",
    desc: "Optimized for rapid site assessments, real estate promotions & dynamic event cinematography.",
  },
  {
    name: "DJI Mavic 3 Classic",
    tag: "Professional Survey & Mapping",
    image: "/images/fleet_mavic_3.png",
    icon: Compass,
    specs: "4/3 CMOS Hasselblad • 5.1K Video • 46-min Flight Time",
    desc: "The workhorse for high-precision topographic mapping, orthomosaics & volume calculations.",
  },
  {
    name: "DJI Mavic 4 Pro",
    tag: "Flagship Aerial Intelligence",
    image: "/images/fleet_mavic_4.png",
    icon: Cpu,
    specs: "Triple-camera array • Multi-spectral • RTK centimeter accuracy",
    desc: "Engineered for complex structural inspections, 3D digital twin modeling & film production.",
  },
];

const SAFETY_ITEMS = [
  {
    title: "DGCA Certified Pilots",
    desc: "Every mission is flown by fully licensed Remote Pilot Certificate (RPC) holders in strict legal compliance.",
    icon: ShieldCheck,
  },
  {
    title: "Digital Sky Airspace Clearance",
    desc: "We clear flight zones through Digital Sky & coordinate with ATC prior to every commercial launch.",
    icon: Landmark,
  },
  {
    title: "Third-Party Liability Insurance",
    desc: "Operations are backed by comprehensive commercial drone insurance covering equipment & site assets.",
    icon: HeartHandshake,
  },
  {
    title: "Rigorous Pre-Flight SOPs",
    desc: "Strict site risk audits, real-time telemetry checks, and pre-flight safety verification workflows.",
    icon: CheckSquare,
  },
];

const STATS = [
  { icon: ShieldCheck, title: "DGCA CERTIFIED", desc: "Licensed Commercial Pilot" },
  { icon: Star, title: "8+ YEARS", desc: "Industry Flight Experience" },
  { icon: CheckCircle2, title: "1000+ PROJECTS", desc: "Surveys, Audits & Films" },
  { icon: MapPin, title: "PAN INDIA", desc: "Deployments Across India" },
];

const TABS = [
  { id: "story", label: "STORY" },
  { id: "fleet", label: "FLEET" },
  { id: "safety", label: "SAFETY" },
  { id: "milestones", label: "MILESTONES" },
];

export default function AboutMaster() {
  const [activeTab, setActiveTab] = useState<"story" | "fleet" | "safety" | "milestones">("story");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".hero-portrait-wrap", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-brand-dark)] text-white min-h-screen pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-x-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-brand-orange)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── SECTION 1: HERO ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-16 lg:items-center mb-10 sm:mb-20">

          {/* Portrait — top on mobile */}
          <div className="hero-portrait-wrap lg:col-span-5 lg:order-last">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#141414] p-1.5 shadow-2xl">
              <div className="relative w-full rounded-xl overflow-hidden bg-black h-64 sm:h-80 lg:h-auto lg:aspect-[4/5]">
                <Image
                  src="/images/founder_portrait_vinay.png"
                  alt="Vinay Kanth - Founder"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-oswald text-white font-bold text-sm uppercase">VINAY KANTH</h3>
                    <p className="font-inter text-[10px] text-[var(--color-brand-orange)] font-bold tracking-wider">8+ YEARS COMMERCIAL FLIGHT LOGS</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-orange)] text-black flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 lg:order-first space-y-4">
            <div className="hero-anim-text inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase">
              <Star className="w-3.5 h-3.5" />
              ABOUT SKYPILOT DRONE SERVICES
            </div>

            <h1 className="hero-anim-text font-oswald text-2xl sm:text-5xl xl:text-7xl font-extrabold uppercase tracking-tight leading-tight">
              PRECISION FROM ABOVE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[var(--color-brand-orange)]">
                PURPOSE ON THE GROUND.
              </span>
            </h1>

            <p className="hero-anim-text font-inter text-gray-300 text-sm leading-relaxed">
              Founded by DGCA-certified pilot <strong className="text-white">Vinay Kanth</strong>, SkyPilot combines high-resolution optics, photogrammetry LiDAR, and cinematic drone technology to help industries, civil engineers, and media creators see the bigger picture.
            </p>

            <div className="hero-anim-text pt-3 border-t border-white/10 space-y-2">
              <p className="font-serif italic text-2xl sm:text-3xl text-[var(--color-brand-orange)]">Vinay Kanth</p>
              <p className="font-oswald text-xs uppercase font-bold text-white tracking-widest">FOUNDER & CHIEF DRONE PILOT</p>
              <p className="font-inter text-[10px] text-gray-400 uppercase tracking-widest">DGCA CERTIFIED • LICENSED OPERATOR</p>
              <div className="pt-1 space-y-1.5">
                <span className="flex items-center gap-2 text-white text-xs font-medium">
                  <UserCheck className="w-4 h-4 text-[var(--color-brand-orange)] shrink-0" />
                  100% Commercial Legal Airspace Operations
                </span>
                <span className="flex items-center gap-2 text-gray-400 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  Kurnool, Andhra Pradesh • Pan-India Deployments
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: STATS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 sm:mb-20">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-3 sm:p-5 flex flex-col gap-2">
                <div className="p-2 bg-[#161616] rounded-xl text-[var(--color-brand-orange)] border border-white/5 w-fit">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-oswald text-white font-bold text-sm sm:text-base uppercase leading-tight">{stat.title}</h4>
                  <p className="font-inter text-gray-400 text-[10px] sm:text-xs leading-tight mt-0.5">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── SECTION 3: TABS ── */}
        <div className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-4 sm:p-8 mb-10 sm:mb-20">

          {/* Tab header */}
          <div className="mb-5 sm:mb-8 pb-4 sm:pb-6 border-b border-white/5 space-y-4">
            <div>
              <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.2em] text-[10px] font-black uppercase block mb-1">
                EXPLORE OUR CAPABILITIES
              </span>
              <h2 className="font-oswald text-xl sm:text-3xl font-extrabold uppercase tracking-tight">
                THE SKYPILOT DIFFERENCE
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2.5 rounded-lg font-inter text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[var(--color-brand-orange)] text-black"
                      : "bg-[#181818] border border-white/5 text-gray-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* STORY */}
          {activeTab === "story" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-3 font-inter text-gray-300 text-sm leading-relaxed">
                <h3 className="font-oswald text-white text-xl sm:text-2xl font-bold uppercase">PASSION THAT TOOK FLIGHT</h3>
                <p>"My journey into the world of drones began with a deep fascination for capturing perspectives that inspire. Over the years, this passion turned into a purpose — to help businesses, industries and communities see the bigger picture."</p>
                <p>From cinematic visual storytelling to millimeter-level topography surveys and solar thermal inspections, every mission we execute is built on precision, safety, and client trust.</p>
              </div>
              <div className="bg-[#141414] border border-white/5 p-4 rounded-xl space-y-3">
                <h4 className="font-oswald text-[var(--color-brand-orange)] text-xs font-bold uppercase tracking-widest">
                  CORE CREDENTIALS & SPECIALIZATIONS
                </h4>
                <ul className="space-y-2.5 font-inter text-xs text-gray-300">
                  {[
                    "DGCA Certified Remote Pilot Certificate (RPC) Holder",
                    "Over 8+ Years of Professional Commercial Flight Experience",
                    "Specialized in Photogrammetry, Thermal Scans & Cinematic FPV",
                    "Served Top Brands across Solar, Wind, Construction & Industrial",
                    "Passionate about Innovation, Safety and Delivering Impactful Results",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-orange)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* FLEET */}
          {activeTab === "fleet" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FLEET_ITEMS.map((drone, i) => {
                  const Icon = drone.icon;
                  return (
                    <div key={i} className="bg-[#141414] border border-white/5 p-4 rounded-xl flex flex-col gap-3">
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-white/5">
                        <Image src={drone.image} alt={drone.name} fill className="object-cover" />
                        <div className="absolute top-2 right-2 bg-black/75 p-1.5 rounded-lg text-[var(--color-brand-orange)]">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-[var(--color-brand-orange)] uppercase tracking-wider block">{drone.tag}</span>
                        <h4 className="font-oswald text-white text-base font-bold uppercase mt-0.5">{drone.name}</h4>
                        <p className="font-inter text-gray-400 text-xs leading-relaxed mt-1">{drone.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 font-semibold">
                        <span className="text-white block mb-0.5">SPECS:</span>
                        {drone.specs}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-[#141414] border border-[var(--color-brand-orange)]/20 p-4 rounded-xl flex items-start gap-3">
                <div className="p-2.5 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] rounded-xl shrink-0">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-oswald text-white text-sm font-bold uppercase">BEYOND THE STANDARD FLEET</h4>
                  <p className="font-inter text-xs text-gray-400 mt-0.5">For heavy payloads & specialized LiDAR, we design & operate custom carbon-fiber enterprise hexacopters.</p>
                </div>
              </div>
            </div>
          )}

          {/* SAFETY */}
          {activeTab === "safety" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
              {SAFETY_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-[#141414] border border-white/5 p-4 rounded-xl flex gap-3 items-start">
                    <div className="p-2.5 bg-[#1a1a1a] text-[var(--color-brand-orange)] rounded-xl shrink-0 border border-white/5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-inter text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="font-inter text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* MILESTONES */}
          {activeTab === "milestones" && (
            <div className="space-y-3 animate-fadeIn">
              {TIMELINE.map((item, i) => (
                <div key={i} className="bg-[#141414] border border-white/5 p-4 rounded-xl flex items-start gap-4">
                  <span className="font-oswald text-xl font-bold text-[var(--color-brand-orange)] shrink-0 w-14">{item.year}</span>
                  <div>
                    <h5 className="font-oswald text-white text-sm uppercase font-bold">{item.title}</h5>
                    <p className="font-inter text-gray-400 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ── SECTION 4: CTA ── */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-10 flex flex-col items-center text-center gap-5">
          <h3 className="font-oswald text-xl sm:text-4xl font-bold uppercase text-white tracking-tight">
            READY TO ELEVATE YOUR PERSPECTIVE?
          </h3>
          <p className="font-inter text-gray-400 text-xs sm:text-sm max-w-lg">
            Contact our certified flight team today for customized aerial surveys, cinematography, or industrial inspections.
          </p>
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-[var(--color-brand-orange)] hover:bg-orange-600 text-black hover:text-white px-8 py-4 rounded-xl font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            GET IN TOUCH <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </div>
  );
}
