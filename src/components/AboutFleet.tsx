"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Cpu, HardHat, Camera, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DRONES = [
  {
    name: "DJI Air 3S",
    type: "Tactical Cinematography",
    specs: "Dual-camera system • 1-inch CMOS main sensor • 48MP resolution • 4K/60fps HDR",
    useCase: "Ideal for real estate visuals, event coverage, and rapid visual asset inspection.",
    image: "/images/fleet_air_3s.png",
    icon: Camera
  },
  {
    name: "DJI Mavic 3 Classic",
    type: "Professional Mapping",
    specs: "4/3 CMOS Hasselblad camera • 5.1K recording • 20MP Hasselblad photos • 46-min flight time",
    useCase: "Best for high-precision topographic mapping, orthomosaic scanning, and site monitoring.",
    image: "/images/fleet_mavic_3.png",
    icon: Compass
  },
  {
    name: "DJI Mavic 4 Pro",
    type: "Flagship Aerial Intelligence",
    specs: "Next-gen triple-camera array • Multi-spectral sensors • Omni-directional collision avoidance • RTK mapping precision",
    useCase: "Engineered for high-end cinematic videography, 3D modeling, and critical structural inspection.",
    image: "/images/fleet_mavic_4.png",
    icon: Cpu
  }
];

export default function AboutFleet() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-in
      gsap.from(".fleet-header-fade", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%"
        }
      });

      // Drone cards stagger scale reveal
      gsap.from(".fleet-card-fade", {
        y: 50,
        scale: 0.96,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fleet-grid-trigger",
          start: "top 80%"
        }
      });

      // Callout banner slide up
      gsap.from(".fleet-callout-fade", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fleet-callout-fade",
          start: "top 90%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-10 bg-[var(--color-brand-dark)] relative overflow-hidden border-t border-white/5"
    >
      {/* Subtle glow background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-brand-orange)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 sm:px-8">
        
        {/* Full-width Section Header */}
        <div className="max-w-3xl mb-16 fleet-header-fade">
          <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] sm:text-xs font-black uppercase mb-3 block">
            OUR TECHNOLOGY
          </span>
          <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight leading-none mb-3">
            OUR AERIAL FLEET
          </h2>
          <div className="w-12 h-[3px] bg-[var(--color-brand-orange)] mb-4" />
          <p className="font-inter text-gray-400 text-xs sm:text-sm leading-relaxed">
            We deploy industry-leading aerial platforms equipped with state-of-the-art optical, thermal, and multispectral sensors to guarantee precision-grade deliverables.
          </p>
        </div>

        {/* 3 Columns Side-by-Side Grid */}
        <div className="fleet-grid-trigger grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {DRONES.map((drone, idx) => {
            const Icon = drone.icon;
            return (
              <div 
                key={idx}
                className="fleet-card-fade group relative overflow-hidden bg-[#0e0e0e] border border-white/5 hover:border-[var(--color-brand-orange)]/20 p-5 rounded-2xl transition-all duration-500 hover:shadow-[0_4px_30px_rgba(245,133,31,0.03)] flex flex-col justify-between"
              >
                <div>
                  {/* Card Image section */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#111111] border border-white/5 group-hover:border-[var(--color-brand-orange)]/30 transition-colors duration-500 mb-6">
                    <Image
                      src={drone.image}
                      alt={drone.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={90}
                    />
                    
                    {/* Small Icon Overlay badge */}
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-[var(--color-brand-orange)] p-2 rounded-lg border border-white/10 group-hover:bg-[var(--color-brand-orange)] group-hover:text-black transition-all duration-300">
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title & Type */}
                  <div className="mb-3">
                    <span className="font-inter text-[9px] sm:text-[10px] text-[var(--color-brand-orange)] font-bold tracking-wider uppercase block mb-1">
                      {drone.type}
                    </span>
                    <h3 className="font-oswald text-white text-lg sm:text-xl font-bold uppercase tracking-wide group-hover:text-[var(--color-brand-orange)] transition-colors duration-300">
                      {drone.name}
                    </h3>
                  </div>

                  {/* Use case */}
                  <p className="font-inter text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {drone.useCase}
                  </p>
                </div>

                {/* Tech specs section at bottom */}
                <div className="pt-4 border-t border-white/5 text-[10px] sm:text-xs font-semibold text-gray-500 leading-relaxed">
                  <span className="text-gray-300 block mb-1">SPECIFICATIONS:</span>
                  <span>{drone.specs}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Heavy Duty Platform Banner (Full Width) */}
        <div className="fleet-callout-fade bg-[#111111]/40 border border-[var(--color-brand-orange)]/15 hover:border-[var(--color-brand-orange)]/30 p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(245,133,31,0.02)] flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex gap-4 items-start max-w-4xl">
            <div className="p-3 bg-black/50 border border-white/5 text-[var(--color-brand-orange)] rounded-xl flex-shrink-0">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-oswald text-sm sm:text-base font-bold uppercase tracking-wider text-[var(--color-brand-orange)] mb-1">
                BEYOND THE STANDARD FLEET
              </h3>
              <p className="font-inter text-gray-300 text-xs sm:text-sm leading-relaxed">
                For custom payloads, specialized LiDAR scanning, thermal analysis, and heavy equipment transportation, we design and operate custom carbon-fiber heavy-lift enterprise hexacopters engineered for high-altitude complex industrial missions.
              </p>
            </div>
          </div>
          <div className="text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase border border-[var(--color-brand-orange)]/40 rounded px-4 py-2 hover:bg-[var(--color-brand-orange)] hover:text-black transition-colors duration-300 whitespace-nowrap self-start md:self-auto cursor-pointer">
            Specialized Missions
          </div>
        </div>

      </div>
    </section>
  );
}
