"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, Building2, Clapperboard, Landmark, Factory, Home, TreePine } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);


const clients = [
  "Real Estate Firms",
  "Film Productions",
  "Construction Companies",
  "Government Bodies",
  "Industrial Plants",
  "Event Managers",
  "Agriculture Sector",
  "Tourism Boards",
];

export default function ClientsReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Client badges pop in
      if (clientsRef.current) {
        gsap.fromTo(
          ".client-badge",
          { opacity: 0, scale: 0.5, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: {
              amount: 0.8,
              from: "random",
            },
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: clientsRef.current,
              start: "top 85%",
            },
          }
        );
      }


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clients-reviews"
      className="py-14 sm:py-20 lg:py-24 bg-[#050505] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-[600px] h-[150vw] md:h-[600px] spotlight-glow opacity-20 pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <h2 className="font-oswald text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4 sm:mb-6">
            Companies We've <span className="text-[var(--color-brand-orange)]">Worked With</span>
          </h2>
          <p className="font-inter text-gray-400 max-w-2xl mx-auto">
            Trusted by top brands and businesses across multiple industries.
          </p>
        </div>

        {/* Client Industries Badges */}
        <div ref={clientsRef} className="mb-12 sm:mb-20">
          <h3 className="font-inter text-sm uppercase tracking-[0.3em] text-gray-500 text-center mb-8">
            Industries We Serve
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="client-badge bg-[var(--color-brand-card)] border border-gray-800 rounded-full px-6 py-3 font-inter text-sm text-gray-300 hover:border-[var(--color-brand-orange)] hover:text-white hover:shadow-[0_0_20px_rgba(245,133,31,0.15)] hover:scale-105 transition-all duration-300 cursor-default gpu-accelerated"
              >
                {client}
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos Grid */}
        <div className="w-full bg-[#111111]/50 py-12 border border-gray-800/50 mt-12 rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 px-4 md:px-8 items-center justify-items-center">
            {['/client1.png', '/client2.png', '/client3.png', '/client4.png', '/client5.png'].map((src, idx) => (
              <div key={idx} className="w-32 h-24 md:w-48 md:h-32 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300">
                <img src={src} alt={`Client ${idx + 1}`} className="w-full h-full object-contain p-2 md:p-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
