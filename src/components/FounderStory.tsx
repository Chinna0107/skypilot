"use client";

import { Target } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FounderStory() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide-in from left for story text
      gsap.from(".story-anim", {
        x: -40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
      
      // Scale-in reveal for Founder credentials card
      gsap.from(".card-reveal", {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".list-container",
          start: "top 85%",
        }
      });

      // Stagger list items inside card
      gsap.from(".list-anim", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".list-container",
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const listItems = [
    "Founder & Drone Pilot at SkyPilot Drone Services",
    "DGCA Certified & Licensed Drone Pilot",
    "8+ Years of Professional Experience",
    "Specialized in Aerial Cinematography, Drone Surveys & Industrial Inspections",
    "Worked with Leading Companies in Solar, Wind Energy, Construction & Manufacturing",
    "Passionate about Innovation, Safety and Delivering Impactful Results"
  ];

  return (
    <section className="py-10 bg-[var(--color-brand-dark)]" ref={containerRef}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Story */}
          <div className="w-full lg:w-1/2">
            <p className="story-anim font-inter text-[var(--color-brand-orange)] tracking-[0.2em] text-xs font-bold uppercase mb-4">
              FOUNDER STORY
            </p>
            <h2 className="story-anim font-oswald text-4xl lg:text-5xl uppercase font-bold text-white mb-8">
              PASSION THAT <span className="text-[var(--color-brand-orange)]">TOOK FLIGHT</span>
            </h2>
            
            <div className="story-anim space-y-6 font-inter text-gray-300 text-base leading-relaxed mb-12">
              <p>
                My journey into the world of drones began with a deep fascination for capturing perspectives that inspire. Over the years, this passion turned into a purpose - to help businesses, industries and communities see the bigger picture.
              </p>
              <p>
                From cinematic storytelling to high-precision surveys, every project we undertake is driven by a commitment to quality, safety and innovation.
              </p>
            </div>

            {/* Signature Placeholder */}
            <div className="story-anim">
              <p className="font-serif italic text-4xl text-gray-400">
                Emidi Vinay Kanth
              </p>
            </div>
          </div>

          {/* Right Column: About the Founder List */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 lg:p-12 shadow-2xl h-full card-reveal list-container">
              <h3 className="font-oswald text-xl uppercase font-bold text-white tracking-widest mb-8">
                ABOUT THE FOUNDER
              </h3>
              
              <ul className="space-y-6">
                {listItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 list-anim">
                    <Target className="w-5 h-5 text-[var(--color-brand-orange)] shrink-0 mt-0.5" />
                    <span className="font-inter text-gray-300 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
