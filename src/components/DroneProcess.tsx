"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DroneSVG = () => (
  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48">
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      {/* Flared Body Connectors */}
      <path d="M100 120 L65 85 L85 65 L120 100 Z" fill="#1a1a1a" />
      <path d="M200 120 L235 85 L215 65 L180 100 Z" fill="#1a1a1a" />
      <path d="M100 180 L65 215 L85 235 L120 200 Z" fill="#1a1a1a" />
      <path d="M200 180 L235 215 L215 235 L180 200 Z" fill="#1a1a1a" />
      
      {/* Motors */}
      <circle cx="75" cy="75" r="22" fill="#444" />
      <circle cx="75" cy="75" r="14" fill="#222" />
      <circle cx="225" cy="75" r="22" fill="#444" />
      <circle cx="225" cy="75" r="14" fill="#222" />
      <circle cx="75" cy="225" r="22" fill="#444" />
      <circle cx="75" cy="225" r="14" fill="#222" />
      <circle cx="225" cy="225" r="22" fill="#444" />
      <circle cx="225" cy="225" r="14" fill="#222" />

      {/* Main Central Body */}
      <rect x="90" y="110" width="120" height="80" rx="6" fill="#1a1a1a" />

      {/* Company Logo and Text */}
      <text x="150" y="148" fill="white" fontSize="18" fontFamily="var(--font-oswald), sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">SKYPILOT</text>
      
      {/* Little colorful triangle logo */}
      <g transform="translate(195, 125) scale(0.6)">
        <path d="M0 0 L15 0" stroke="#00d2ff" strokeWidth="4" strokeLinecap="round" />
        <path d="M15 0 L10 12" stroke="#ff0055" strokeWidth="4" strokeLinecap="round" />
        <path d="M15 0 L20 12" stroke="#ffcc00" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Propeller Blades with CSS animation */}
      <g className="origin-[75px_75px] animate-[spin_0.15s_linear_infinite]">
        <line x1="40" y1="40" x2="110" y2="110" stroke="#f5851f" strokeWidth="14" strokeLinecap="round" />
      </g>
      <g className="origin-[225px_75px] animate-[spin_0.15s_linear_infinite_reverse]">
        <line x1="190" y1="110" x2="260" y2="40" stroke="#f5851f" strokeWidth="14" strokeLinecap="round" />
      </g>
      <g className="origin-[75px_225px] animate-[spin_0.15s_linear_infinite_reverse]">
        <line x1="40" y1="260" x2="110" y2="190" stroke="#f5851f" strokeWidth="14" strokeLinecap="round" />
      </g>
      <g className="origin-[225px_225px] animate-[spin_0.15s_linear_infinite]">
        <line x1="190" y1="190" x2="260" y2="260" stroke="#f5851f" strokeWidth="14" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

export default function DroneProcess() {
  const containerRef = useRef<HTMLElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: "Pre-Flight Planning", desc: "Detailed consultation, airspace checks, and mission planning.", side: "left" },
    { title: "Precision Flight", desc: "State-of-the-art drones execute the mission safely.", side: "right" },
    { title: "Data Capture", desc: "High-resolution media and sensory data collected perfectly.", side: "left" },
    { title: "Post-Processing", desc: "Professional editing, color grading, and final delivery.", side: "right" },
  ];

  useEffect(() => {
    if (!containerRef.current || !droneRef.current) return;

    // Use mm to make it responsive
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });

      // Fly to Step 1 (Left)
      tl.to(droneRef.current, { x: "-25vw", rotation: -15, duration: 1 })
        // Fly to Step 2 (Right)
        .to(droneRef.current, { x: "25vw", rotation: 15, duration: 2 })
        // Fly to Step 3 (Left)
        .to(droneRef.current, { x: "-25vw", rotation: -15, duration: 2 })
        // Fly to Step 4 (Right)
        .to(droneRef.current, { x: "25vw", rotation: 15, duration: 2 })
        // Return to center
        .to(droneRef.current, { x: 0, rotation: 0, duration: 1 });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile Animation (less horizontal movement)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });

      tl.to(droneRef.current, { x: "-10vw", rotation: -10, duration: 1 })
        .to(droneRef.current, { x: "10vw", rotation: 10, duration: 2 })
        .to(droneRef.current, { x: "-10vw", rotation: -10, duration: 2 })
        .to(droneRef.current, { x: "10vw", rotation: 10, duration: 2 })
        .to(droneRef.current, { x: 0, rotation: 0, duration: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--color-brand-dark)] py-20">
      
      {/* Background Styling */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, var(--color-brand-orange) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="text-center mb-12 md:mb-20 relative z-10 px-4">
        <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl uppercase font-bold text-white mb-4">
          Our <span className="text-[var(--color-brand-orange)]">Process</span>
        </h2>
        <p className="font-inter text-gray-400 max-w-2xl mx-auto uppercase tracking-widest text-sm md:text-base">
          From planning to delivery, we ensure perfection at every step.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Sticky Drone Container */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
          <div className="sticky top-[50vh] w-full flex justify-center -translate-y-1/2">
            <div ref={droneRef} className="relative">
              <DroneSVG />
            </div>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="relative z-20 flex flex-col w-full">
          {/* A subtle center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`min-h-[30vh] md:min-h-[50vh] py-12 md:py-0 w-full flex items-center px-4 md:px-0 ${
                step.side === 'left' ? 'justify-start md:justify-end' : 'justify-end md:justify-start'
              }`}
            >
              <div 
                className={`w-[80%] md:w-[40%] bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-xl shadow-2xl relative ${
                  step.side === 'left' ? 'md:mr-16' : 'md:ml-16'
                }`}
              >
                {/* Connecting Dot */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--color-brand-orange)] hidden md:block shadow-[0_0_15px_var(--color-brand-orange)] ${
                  step.side === 'left' ? '-right-2' : '-left-2'
                }`} />

                <div className="text-[var(--color-brand-orange)] font-oswald text-5xl md:text-7xl font-bold opacity-20 absolute -top-4 md:-top-8 left-4 md:left-6">
                  0{index + 1}
                </div>
                
                <h3 className="font-oswald text-2xl md:text-3xl text-white font-bold uppercase mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="font-inter text-gray-400 text-sm md:text-base relative z-10 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
