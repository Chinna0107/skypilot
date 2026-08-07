"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad2, Video, Map, Users, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2016",
    title: "Started my journey as a drone enthusiast",
    icon: Gamepad2
  },
  {
    year: "2018",
    title: "Turned passion into profession",
    icon: Video
  },
  {
    year: "2020",
    title: "Expanded into industrial projects & surveys",
    icon: Map
  },
  {
    year: "2023",
    title: "Trusted by 200+ clients across industries",
    icon: Users
  },
  {
    year: "2026",
    title: "Continuing to elevate perspectives, create impact",
    icon: Globe
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the connection line driven by scroll depth
      gsap.fromTo(".timeline-line", 
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
            end: "bottom 70%",
            scrub: true
          }
        }
      );

      // Staggered scale pop for milestone bubbles
      gsap.from(".milestone-bubble", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%"
        }
      });

      // Text elements fade-in
      gsap.from(".milestone-text", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 78%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-8 md:py-10 bg-[var(--color-brand-dark)]" ref={containerRef}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="font-oswald text-2xl md:text-3xl uppercase font-bold text-white tracking-widest flex items-center justify-center gap-6">
            <span className="h-px bg-gray-800 flex-1 hidden md:block"></span>
            8+ YEARS OF EXPERIENCE
            <span className="h-px bg-gray-800 flex-1 hidden md:block"></span>
          </h2>
        </div>

        <div className="relative timeline-container">
          {/* Main horizontal line (desktop) */}
          <div className="timeline-line hidden md:block absolute top-[36px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-brand-orange)] to-transparent origin-left opacity-60" />

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
            {milestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center group timeline-item">
                  
                  {/* Icon Container */}
                  <div className="milestone-bubble w-16 h-16 bg-[#111111] border border-gray-850 rounded-full flex items-center justify-center text-[var(--color-brand-orange)] mb-4 group-hover:border-[var(--color-brand-orange)] group-hover:bg-[var(--color-brand-orange)] group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(245,133,31,0.05)]">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  
                  {/* Connecting vertical line (mobile only) */}
                  {idx !== milestones.length - 1 && (
                    <div className="block md:hidden h-8 w-px bg-[var(--color-brand-orange)] opacity-20 my-1" />
                  )}

                  {/* Content */}
                  <div className="milestone-text">
                    <h3 className="font-oswald text-xl font-bold text-[var(--color-brand-orange)] mb-1 group-hover:scale-105 transition-transform">
                      {milestone.year}
                    </h3>
                    <p className="font-inter text-gray-300 text-xs sm:text-sm leading-relaxed max-w-[180px]">
                      {milestone.title}
                    </p>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
