"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Cpu, Users, ShieldAlert, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Advanced Equipment",
    description: "We use premium drones and cameras for the best results.",
    icon: Cpu
  },
  {
    title: "Experienced Team",
    description: "Skilled professionals with years of industry experience.",
    icon: Users
  },
  {
    title: "Safe & Compliant",
    description: "All operations follow DGCA guidelines with full safety protocols.",
    icon: ShieldAlert
  },
  {
    title: "Timely Delivery",
    description: "On-time delivery with attention to detail and client satisfaction.",
    icon: CheckCircle
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-fade", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
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
      id="why-choose-us"
      className="py-14 sm:py-20 lg:py-24 bg-[var(--color-brand-dark)] relative overflow-hidden border-t border-white/5"
      ref={containerRef}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Logo Container */}
          <div className="w-full lg:w-1/2 why-fade rounded-2xl border border-white/5 overflow-hidden shadow-2xl relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] hover:shadow-[0_0_50px_rgba(245,133,31,0.08)] transition-shadow duration-500">
            <Image
              src="/navbar-logo.png"
              alt="SkyPilot Logo"
              fill
              className="object-cover"
              quality={100}
              priority
            />
          </div>

          {/* Right Column: Heading & 2x2 Features Grid */}
          <div className="w-full lg:w-1/2 why-fade">
            <div className="mb-7 sm:mb-10">
              <span className="font-oswald text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase text-white tracking-wider block mb-2">
                WHY CHOOSE SKYPILOT?
              </span>
              <div className="w-12 h-[3px] bg-[var(--color-brand-orange)]" />
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-8 sm:gap-y-9">
              {FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
                    <div className="text-[var(--color-brand-orange)] p-2 sm:p-2.5 bg-[#0e0e0e] border border-white/5 rounded-xl flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-inter text-white text-xs sm:text-sm lg:text-base font-bold mb-1 leading-snug">
                        {feature.title}
                      </h3>
                      <p className="font-inter text-gray-400 text-[11px] sm:text-xs lg:text-sm leading-relaxed">
                        {feature.description}
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
