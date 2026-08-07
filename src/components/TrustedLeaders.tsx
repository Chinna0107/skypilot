"use client";

import { Building2, Tractor, Construction, Mountain, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrustedLeaders() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".leader-item", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const leaders = [
    { name: "NEXUS", logo: "/client3.png" },
    { name: "LOGIC", logo: "/client1.png" },
    { name: "APEX", logo: "/client2.png" },
    { name: "ECHO", logo: "/client4.png" },
    { name: "FORGE", logo: "/client5.png" },
  ];

  return (
    <section className="pt-10 pb-20 bg-[var(--color-brand-dark)]" ref={containerRef}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="font-oswald text-xl uppercase font-bold text-white tracking-widest">
            TRUSTED BY <span className="text-[var(--color-brand-orange)]">INDUSTRY LEADERS</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {leaders.map((leader, idx) => (
            <div 
              key={idx}
              className="leader-item flex items-center justify-center bg-[#111111] border border-white/5 rounded-lg px-4 sm:px-8 py-4 sm:py-6 w-[calc(50%-8px)] sm:min-w-[200px] lg:min-w-[280px] min-h-[100px] sm:min-h-[140px] hover:border-[var(--color-brand-orange)]/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="bg-white w-full h-28 rounded-lg p-2 flex items-center justify-center">
                <img
                  src={leader.logo}
                  alt={`${leader.name} Logo`}
                  className="max-h-full max-w-full object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          ))}

          {/* & More Box */}
          <div className="leader-item flex items-center justify-center bg-[#111111] border border-white/5 rounded-lg px-6 py-4 sm:px-10 sm:py-6 w-[calc(50%-8px)] sm:min-w-[150px] min-h-[100px] sm:min-h-[140px] hover:border-[var(--color-brand-orange)]/50 transition-all duration-300 cursor-pointer group">
            <span className="font-oswald text-lg font-bold tracking-wider text-[var(--color-brand-orange)] uppercase">
              & MORE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
