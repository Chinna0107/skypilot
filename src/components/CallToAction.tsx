"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-anim", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 bg-[var(--color-brand-dark)]" ref={containerRef}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#111111] border border-white/5">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/cta_drone_1784385810380.png"
              alt="Drone flying"
              fill
              className="object-cover opacity-70"
            />
            {/* Gradient overlay so text on left is readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          </div>

          <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="cta-anim font-oswald text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-white mb-2 sm:mb-3 text-center md:text-left">
                LET'S BRING <span className="text-[var(--color-brand-orange)]">YOUR VISION</span> TO LIFE
              </h2>
              <p className="cta-anim font-inter text-gray-300 text-sm md:text-base">
                Get in touch today for powerful aerial solutions.
              </p>
            </div>
            
            <div className="shrink-0 cta-anim">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] hover:bg-orange-600 hover:text-white px-8 py-4 rounded font-inter text-sm font-bold tracking-widest transition-all duration-300"
              >
                GET A QUOTE <span className="text-sm font-semibold">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
