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
  Target,
  Award,
  Zap,
  ChevronRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Timeline Milestones
const TIMELINE = [
  { year: "2016", title: "Flight Beginnings", desc: "Started flying initial drone models and exploring aerial photography." },
  { year: "2018", title: "Commercial Pilot", desc: "Turned passion into a licensed commercial drone service enterprise." },
  { year: "2020", title: "Industrial Expansion", desc: "Expanded into thermal solar inspections, highway mapping & CAD GIS datasets." },
  { year: "2023", title: "200+ Enterprise Clients", desc: "Trusted partner for top construction, energy & manufacturing brands." },
  { year: "2026", title: "Next-Gen Fleet", desc: "Operating triple-lens RTK platforms & custom heavy-lift LiDAR hexacopters." }
];

// Fleet Data
const FLEET_ITEMS = [
  {
    name: "DJI Air 3S",
    tag: "Tactical Cinematography",
    image: "/images/fleet_air_3s.png",
    icon: Camera,
    specs: "Dual-camera • 1-inch CMOS • 48MP • 4K/60fps HDR",
    desc: "Optimized for rapid site assessments, real estate promotions & dynamic event cinematography."
  },
  {
    name: "DJI Mavic 3 Classic",
    tag: "Professional Survey & Mapping",
    image: "/images/fleet_mavic_3.png",
    icon: Compass,
    specs: "4/3 CMOS Hasselblad • 5.1K Video • 46-min Flight Time",
    desc: "The workhorse for high-precision topographic mapping, orthomosaics & volume calculations."
  },
  {
    name: "DJI Mavic 4 Pro",
    tag: "Flagship Aerial Intelligence",
    image: "/images/fleet_mavic_4.png",
    icon: Cpu,
    specs: "Triple-camera array • Multi-spectral • RTK centimeter accuracy",
    desc: "Engineered for complex structural inspections, 3D digital twin modeling & film production."
  }
];

// Safety Pillars
const SAFETY_ITEMS = [
  {
    title: "DGCA Certified Pilots",
    desc: "Every mission is flown by fully licensed Remote Pilot Certificate (RPC) holders in strict legal compliance.",
    icon: ShieldCheck
  },
  {
    title: "Digital Sky Airspace Clearance",
    desc: "We clear flight zones through Digital Sky & coordinate with ATC prior to every commercial launch.",
    icon: Landmark
  },
  {
    title: "Third-Party Liability Insurance",
    desc: "Operations are backed by comprehensive commercial drone insurance covering equipment & site assets.",
    icon: HeartHandshake
  },
  {
    title: "Rigorous Pre-Flight SOPs",
    desc: "Strict site risk audits, real-time telemetry checks, and pre-flight safety verification workflows.",
    icon: CheckSquare
  }
];

export default function AboutMaster() {
  const [activeTab, setActiveTab] = useState<"story" | "fleet" | "safety" | "milestones">("story");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from(".hero-anim-text", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out"
      });

      // Founder Image float
      gsap.from(".hero-portrait-wrap", {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2
      });

      // Stats Bar reveal
      gsap.from(".hero-stat-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero-stats-bar",
          start: "top 90%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-brand-dark)] text-white min-h-screen pt-20 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-brand-orange)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION 1: HERO & FOUNDER OVERVIEW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-12 sm:mb-24">
          
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-anim-text inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase">
              <Star className="w-3.5 h-3.5" />
              ABOUT SKYPILOT DRONE SERVICES
            </div>

            <h1 className="hero-anim-text font-oswald text-3xl sm:text-5xl xl:text-7xl font-extrabold uppercase tracking-tight leading-[0.95]">
              PRECISION FROM ABOVE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[var(--color-brand-orange)]">
                PURPOSE ON THE GROUND.
              </span>
            </h1>

            <p className="hero-anim-text font-inter text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Founded by DGCA-certified pilot <strong className="text-white">Vinay Kanth</strong>, SkyPilot combines high-resolution optics, photogrammetry LiDAR, and cinematic drone technology to help industries, civil engineers, and media creators see the bigger picture.
            </p>

            {/* Founder Sign-off Badge */}
            <div className="hero-anim-text pt-4 flex items-center gap-6 border-t border-white/10">
              <div>
                <p className="font-serif italic text-3xl text-[var(--color-brand-orange)]">Vinay Kanth</p>
                <p className="font-oswald text-xs uppercase font-bold text-white tracking-widest mt-0.5">
                  FOUNDER & CHIEF DRONE PILOT
                </p>
                <p className="font-inter text-[10px] text-gray-400 uppercase tracking-widest">
                  DGCA CERTIFIED • LICENSED OPERATOR
                </p>
              </div>
              <div className="hidden sm:block h-12 w-px bg-white/10" />
              <div className="hidden sm:flex flex-col gap-1 text-xs text-gray-400">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <UserCheck className="w-4 h-4 text-[var(--color-brand-orange)]" />
                  100% Commercial Legal Airspace Operations
                </span>
                <span className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  Kurnool, Andhra Pradesh • Pan-India Deployments
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Founder Portrait Card */}
          <div className="lg:col-span-5 hero-portrait-wrap">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/10 p-2 shadow-2xl group">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black">
                <Image
                  src="/images/founder_portrait_vinay.png"
                  alt="Vinay Kanth - Founder"
                  fill
                  className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Floating Badge on Portrait */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-oswald text-white font-bold text-base uppercase">VINAY KANTH</h3>
                    <p className="font-inter text-[10px] text-[var(--color-brand-orange)] font-bold tracking-wider">8+ YEARS COMMERCIAL FLIGHT LOGS</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[var(--color-brand-orange)] text-black flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= SECTION 2: STATS BAR ================= */}
        <div className="hero-stats-bar grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-24">
          {[
            { icon: ShieldCheck, title: "DGCA CERTIFIED", desc: "Licensed Commercial Pilot" },
            { icon: Star, title: "8+ YEARS", desc: "Industry Flight Experience" },
            { icon: CheckCircle2, title: "1000+ PROJECTS", desc: "Surveys, Audits & Films" },
            { icon: MapPin, title: "PAN INDIA", desc: "Deployments Across India" }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="hero-stat-card bg-[#0e0e0e] border border-white/5 hover:border-[var(--color-brand-orange)]/30 p-6 rounded-2xl transition-all duration-300 flex items-center gap-4">
                <div className="p-3 bg-[#161616] rounded-xl text-[var(--color-brand-orange)] border border-white/5 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-oswald text-white font-bold text-base tracking-wide uppercase">{stat.title}</h4>
                  <p className="font-inter text-gray-400 text-xs">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= SECTION 3: THE SKYPILOT DASHBOARD (INTERACTIVE TABS) ================= */}
        <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 sm:p-10 mb-20 shadow-2xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/5">
            <div>
              <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] font-black uppercase mb-1 block">
                EXPLORE OUR CAPABILITIES
              </span>
              <h2 className="font-oswald text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
                THE SKYPILOT DIFFERENCE
              </h2>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 bg-[#121212] p-1.5 rounded-xl border border-white/5">
              {[
                { id: "story", label: "FOUNDER & STORY" },
                { id: "fleet", label: "OUR AERIAL FLEET" },
                { id: "safety", label: "SAFETY & COMPLIANCE" },
                { id: "milestones", label: "MILESTONES" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-lg font-inter text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[var(--color-brand-orange)] text-black shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB CONTENT 1: FOUNDER & STORY */}
          {activeTab === "story" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-6 space-y-4 font-inter text-gray-300 text-sm leading-relaxed">
                <h3 className="font-oswald text-white text-2xl font-bold uppercase mb-4">
                  PASSION THAT TOOK FLIGHT
                </h3>
                <p>
                  "My journey into the world of drones began with a deep fascination for capturing perspectives that inspire. Over the years, this passion turned into a purpose - to help businesses, industries and communities see the bigger picture."
                </p>
                <p>
                  From cinematic visual storytelling to millimeter-level topography surveys and solar thermal inspections, every single mission we execute is built on absolute precision, safety, and client trust.
                </p>
              </div>

              <div className="lg:col-span-6 bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
                <h4 className="font-oswald text-[var(--color-brand-orange)] text-xs font-bold uppercase tracking-widest mb-3">
                  CORE CREDENTIALS & SPECIALIZATIONS
                </h4>
                <ul className="space-y-3 font-inter text-xs text-gray-300">
                  {[
                    "DGCA Certified Remote Pilot Certificate (RPC) Holder",
                    "Over 8+ Years of Professional Commercial Flight Experience",
                    "Specialized in Photogrammetry, Thermal Scans & Cinematic FPV",
                    "Served Top Brands across Solar, Wind, Construction & Industrial",
                    "Passionate about Innovation, Safety and Delivering Impactful Results"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-orange)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: FLEET */}
          {activeTab === "fleet" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FLEET_ITEMS.map((drone, i) => {
                  const Icon = drone.icon;
                  return (
                    <div key={i} className="bg-[#141414] border border-white/5 hover:border-[var(--color-brand-orange)]/30 p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between group">
                      <div>
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 border border-white/5">
                          <Image src={drone.image} alt={drone.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-2 right-2 bg-black/75 p-1.5 rounded-lg text-[var(--color-brand-orange)]">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-[var(--color-brand-orange)] uppercase tracking-wider block mb-1">{drone.tag}</span>
                        <h4 className="font-oswald text-white text-lg font-bold uppercase mb-2">{drone.name}</h4>
                        <p className="font-inter text-gray-400 text-xs leading-relaxed mb-4">{drone.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-white/5 text-[10px] text-gray-400 font-semibold">
                        <span className="text-white block mb-0.5">SPECS:</span>
                        {drone.specs}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enterprise Hexacopter Highlight */}
              <div className="bg-[#141414] border border-[var(--color-brand-orange)]/20 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] rounded-xl">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-oswald text-white text-sm font-bold uppercase">BEYOND THE STANDARD FLEET</h4>
                    <p className="font-inter text-xs text-gray-400">For heavy payloads & specialized LiDAR, we design & operate custom carbon-fiber enterprise hexacopters.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 3: SAFETY */}
          {activeTab === "safety" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeIn">
              {SAFETY_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-[#141414] border border-white/5 p-6 rounded-2xl flex gap-4 items-start">
                    <div className="p-3 bg-[#1a1a1a] text-[var(--color-brand-orange)] rounded-xl shrink-0 border border-white/5">
                      <Icon className="w-6 h-6" />
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

          {/* TAB CONTENT 4: MILESTONES */}
          {activeTab === "milestones" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="bg-[#141414] border border-white/5 p-5 rounded-2xl text-center space-y-2">
                    <span className="font-oswald text-2xl font-bold text-[var(--color-brand-orange)] block">{item.year}</span>
                    <h5 className="font-oswald text-white text-sm uppercase font-bold">{item.title}</h5>
                    <p className="font-inter text-gray-400 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ================= SECTION 4: CALL TO ACTION ================= */}
        <div className="bg-gradient-to-r from-[#121212] via-[#161616] to-[#121212] border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-oswald text-2xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              READY TO ELEVATE YOUR PERSPECTIVE?
            </h3>
            <p className="font-inter text-gray-400 text-xs sm:text-sm">
              Contact our certified flight team today for customized aerial surveys, cinematography, or industrial inspections.
            </p>
          </div>

          <Link
            href="/contact"
            className="bg-[var(--color-brand-orange)] hover:bg-orange-600 text-black hover:text-white px-8 py-4 rounded-xl font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300 shrink-0 flex items-center gap-2 shadow-[0_0_25px_rgba(245,133,31,0.2)]"
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
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}} />
    </div>
  );
}
