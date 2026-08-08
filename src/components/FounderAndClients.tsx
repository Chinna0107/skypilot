"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  { name: "APEX", logo: "/client2.png" },
  { name: "NEXUS", logo: "/client3.png" },
  { name: "LOGIC", logo: "/client1.png" },
  { name: "ECHO", logo: "/client4.png" },
  { name: "FORGE", logo: "/client5.png" },
  { name: "AND MORE" }
];

const TESTIMONIALS = [
  {
    quote: "SkyPilot delivered beyond our expectations. The quality of aerial data and professionalism was outstanding.",
    author: "LOGIC",
    role: "Project Head",
    avatar: "/images/founder_portrait_vinay.png" // using available portrait or default
  },
  {
    quote: "Highly accurate land mapping and survey data. Their DGCA certified pilot handled everything with safety first.",
    author: "NEXUS",
    role: "Lead Engineer",
    avatar: "/images/founder_portrait_vinay.png"
  },
  {
    quote: "Outstanding cinematography for our concrete factory marketing video. Absolutely stunning 4K coverage.",
    author: "FORGE",
    role: "Marketing Manager",
    avatar: "/images/founder_portrait_vinay.png"
  }
];

export default function FounderAndClients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fc-fade", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 lg:py-24 bg-[var(--color-brand-dark)] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch">
          
          {/* Left Column: Photo of Founder (Spans 4 cols) */}
          <div className="lg:col-span-4 fc-fade order-1 lg:order-none">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] bg-[#0e0e0e] border border-white/5 group">
              <img
                src="/images/founder_portrait_vinay.png"
                alt="Vinay Kanth - Founder & DGCA Licensed Drone Pilot"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-oswald text-white text-lg font-bold tracking-wider uppercase mb-1">
                  EMIDI VINAY KANTH
                </p>
                <p className="font-inter text-[var(--color-brand-orange)] text-xs font-semibold tracking-wider">
                  FOUNDER & PILOT
                </p>
              </div>
            </div>
          </div>

          {/* Center Column: Founder Bio (Spans 4 cols) */}
          <div className="lg:col-span-4 fc-fade flex flex-col order-2 lg:order-none lg:h-full justify-between">
            <div>
              <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-xs font-black uppercase mb-3 block">
                ABOUT FOUNDER
              </span>
              <h2 className="font-oswald text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-none mb-6">
                ELEVATING VISIONS, DELIVERING IMPACT.
              </h2>
              <p className="font-inter text-gray-300 text-sm leading-relaxed mb-5">
                Hi, I'm Emidi Vinay Kanth, Founder & DGCA Certified Drone Pilot. With over 8 years of experience, I help industries, businesses, and governments capture, inspect, and analyze the world from above — safely, precisely, and efficiently.
              </p>
              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-5">
                SkyPilot was founded to show stories from a new perspective — capturing moments, places, and ideas from the sky with creativity and purpose.
              </p>
              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-5">
               With deep technical expertise and a passion for visual storytelling, Vinay leads SkyPilot with a focus on safety, creativity, and precision. His experience enables the team to plan and execute cinematic aerial shots that meet both creative expectations and operational standards.

              </p>

              <p className="italic border-l-2 border-[var(--color-brand-orange)] pl-3 font-inter text-gray-400 text-sm leading-relaxed">
                "Every flight is carefully planned to balance creative ambition with professional drone operations."
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/about"
                className="border border-white/20 hover:border-white text-white hover:bg-white/5 px-6 py-3 rounded font-inter text-xs font-bold tracking-widest transition-all duration-300 inline-flex items-center gap-2"
              >
                READ MORE ABOUT ME <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Clients and Reviews (Spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-12 fc-fade">
            
            {/* Top Part: Clients Trust Us */}
            <div>
              <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] font-black uppercase mb-4 block">
                CLIENTS TRUST US
              </span>
              <div className="grid grid-cols-2 gap-3">
                {CLIENTS.map((client, idx) => (
                  <div
                    key={idx}
                    className="border border-white/5 bg-[#0e0e0e] rounded-lg p-4 text-center transition-colors duration-300 hover:border-white/15 flex items-center justify-center min-h-[100px]"
                  >
                    {client.logo ? (
                      <div className="bg-white w-full h-16 rounded-lg p-2.5 flex items-center justify-center">
                        <img
                          src={client.logo}
                          alt={`${client.name} Logo`}
                          className="max-h-full max-w-full object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <span className="font-oswald text-xs font-bold text-gray-400 tracking-wider hover:text-white transition-colors duration-300">
                        {client.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Part: What Our Clients Say */}
            <div className="border border-white/5 bg-[#0e0e0e] rounded-2xl p-6 relative">
              <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] font-black uppercase mb-4 block">
                WHAT OUR CLIENTS SAY
              </span>
              
              <div className="min-h-[120px] flex flex-col justify-between">
                <p className="font-inter italic text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                  "{TESTIMONIALS[activeReview].quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                      <img 
                        src={TESTIMONIALS[activeReview].avatar} 
                        alt={TESTIMONIALS[activeReview].author} 
                        className="w-full h-full object-cover scale-150 grayscale"
                      />
                    </div>
                    <div>
                      <h4 className="font-oswald text-white text-xs font-bold uppercase tracking-wider">
                        {TESTIMONIALS[activeReview].author}
                      </h4>
                      <p className="font-inter text-gray-400 text-[10px]">
                        {TESTIMONIALS[activeReview].role}
                      </p>
                    </div>
                  </div>

                  {/* Dot Indicators */}
                  <div className="flex gap-1.5">
                    {TESTIMONIALS.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveReview(dotIdx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeReview === dotIdx 
                            ? "bg-[var(--color-brand-orange)] w-4" 
                            : "bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Show testimonial ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
