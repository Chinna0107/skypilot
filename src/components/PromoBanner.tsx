"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PromoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".promo-fade", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 bg-[var(--color-brand-dark)] relative overflow-hidden"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/5 min-h-[300px] flex items-center">
          
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/cta_drone_1784385810380.png"
              alt="Promo Banner Drone Background"
              className="w-full h-full object-cover opacity-30 object-right-bottom scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
          </div>

          {/* Banner content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-16 max-w-2xl">
            <h2 className="promo-fade font-oswald text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-none mb-3">
              SEE MORE. DO MORE. MAKE AN IMPACT.
            </h2>
            <p className="promo-fade font-inter text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Aerial perspectives that drive better decisions.
            </p>
            <div className="promo-fade">
              <Link
                href="/portfolio"
                className="bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] hover:bg-orange-600 hover:text-white px-8 py-3.5 rounded font-inter text-xs font-bold tracking-widest transition-all duration-300 inline-flex items-center gap-2"
              >
                EXPLORE OUR WORK <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
