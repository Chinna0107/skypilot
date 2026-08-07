"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Landmark, CheckSquare, HeartHandshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SAFETY_PILLARS = [
  {
    title: "DGCA Licensed Pilots",
    description: "All flights are piloted by fully certified operators holding valid Remote Pilot Certificates (RPC) in strict compliance with government standards.",
    icon: ShieldCheck
  },
  {
    title: "Digital Sky Compliance",
    description: "We obtain necessary flight permissions through the Digital Sky platform and coordinate with local Air Traffic Control (ATC) prior to takeoff.",
    icon: Landmark
  },
  {
    title: "Third-Party Liability Insurance",
    description: "For every commercial mission, our operations are backed by comprehensive drone liability insurance protecting your property and assets.",
    icon: HeartHandshake
  },
  {
    title: "Pre-Flight Risk Assessment",
    description: "Our operators execute strict standard operating procedures (SOPs), detailed weather monitoring, and rigorous pre-flight safety checklists.",
    icon: CheckSquare
  }
];

export default function AboutSafety() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side text slide-in
      gsap.from(".safety-header-fade", {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%"
        }
      });

      // Right side grid stagger reveal
      gsap.from(".safety-card-fade", {
        y: 40,
        scale: 0.94,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".safety-grid-trigger",
          start: "top 80%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-10 bg-[#0e0e0e] relative overflow-hidden border-t border-white/5"
    >
      {/* Subtle glow background */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[var(--color-brand-orange)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and intro copy */}
          <div className="w-full lg:w-1/3 safety-header-fade">
            <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] sm:text-xs font-black uppercase mb-3 block">
              COMPLIANCE FIRST
            </span>
            <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight leading-none mb-3">
              SAFETY & REGULATIONS
            </h2>
            <div className="w-12 h-[3px] bg-[var(--color-brand-orange)] mb-6" />
            <p className="font-inter text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              Aviation safety and absolute compliance are the core of our business. We operate 100% legally and safely under the latest DGCA rules and Digital Sky drone regulations across India.
            </p>
          </div>

          {/* Right Column: 4 Safety Pillars Grid */}
          <div className="w-full lg:w-2/3 safety-grid-trigger">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {SAFETY_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div 
                    key={idx}
                    className="safety-card-fade group bg-[var(--color-brand-dark)] border border-white/5 hover:border-[var(--color-brand-orange)]/20 p-6 rounded-2xl transition-all duration-500 hover:shadow-[0_4px_30px_rgba(245,133,31,0.02)] flex gap-5 items-start"
                  >
                    <div className="p-3 bg-[#111111] border border-white/5 text-[var(--color-brand-orange)] rounded-xl flex-shrink-0 group-hover:bg-[var(--color-brand-orange)] group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-inter text-white text-sm sm:text-base font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--color-brand-orange)]">
                        {pillar.title}
                      </h3>
                      <p className="font-inter text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
