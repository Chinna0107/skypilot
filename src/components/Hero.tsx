"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SLIDES = [
  {
    badge: "DGCA CERTIFIED DRONE SERVICES",
    titleWhite: "PRECISION FROM ABOVE.",
    titleOrange: "EXCELLENCE ON GROUND.",
    description: "Professional drone solutions for industrial inspection, construction, mapping, and cinematic production."
  },
  {
    badge: "CINEMATIC AERIAL PRODUCTION",
    titleWhite: "VISUALS THAT INSPIRE.",
    titleOrange: "MOMENTS THAT EMOTION.",
    description: "Hollywood-grade aerial cinematography for feature films, commercials, and luxury real estate."
  },
  {
    badge: "ACCURATE LAND SURVEYING",
    titleWhite: "SURVEY-GRADE MAPPING.",
    titleOrange: "CENTIMETER ACCURACY.",
    description: "High-precision orthomosaics, 3D digital elevation models, and volumetric analysis."
  },
  {
    badge: "INDUSTRIAL THERMAL SCANNING",
    titleWhite: "INFRARED INSPECTIONS.",
    titleOrange: "PREVENTIVE MAINTENANCE.",
    description: "Detect anomalies in solar panels, wind turbines, and industrial assets using radiometric thermal mapping."
  },
  {
    badge: "CONSTRUCTION PROGRESS",
    titleWhite: "TRACK SITE PROGRESS.",
    titleOrange: "REAL-TIME MONITORING.",
    description: "Weekly orthomosaics and 3D site captures for stakeholders, project management, and inspections."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [currentSlide]);

  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-black text-white"
      ref={heroRef}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none gpu-accelerated">
        <video
          src="https://res.cloudinary.com/p8auppz8/video/upload/v1786115590/hero-bg-compressed_wlgi5s.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Left side: Vertical dots indicator (Hidden on extra small screens for more room) */}
      <div className="absolute left-4 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? "bg-[var(--color-brand-orange)] scale-125 shadow-[0_0_8px_rgba(245,133,31,0.8)]"
                : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-8xl mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-center h-full pt-12 sm:pt-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="hero-fade inline-flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-orange)] animate-pulse" />
            <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.2em] text-[10px] sm:text-xs font-black uppercase">
              {SLIDES[currentSlide].badge}
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-fade font-oswald text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight uppercase mb-1 sm:mb-2">
            {SLIDES[currentSlide].titleWhite}
          </h1>
          <h1 className="hero-fade font-oswald text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-brand-orange)] uppercase mb-6 sm:mb-8">
            {SLIDES[currentSlide].titleOrange}
          </h1>

          {/* Description */}
          <p className="hero-fade font-inter text-gray-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mb-8 sm:mb-10">
            {SLIDES[currentSlide].description}
          </p>

          {/* Buttons */}
          <div className="hero-fade flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] hover:bg-orange-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded font-inter text-[10px] sm:text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              BOOK A DRONE SURVEY <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="#portfolio"
              className="border border-white/20 hover:border-white text-white hover:bg-white/5 px-6 sm:px-8 py-3 sm:py-4 rounded font-inter text-[10px] sm:text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              VIEW PROJECTS <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Right: Slide Counter and Navigation */}
      <div className="absolute right-6 sm:right-12 md:right-16 lg:right-24 bottom-6 sm:bottom-12 z-30 flex flex-col items-end gap-2 sm:gap-4">
        {/* Pagination text */}
        <div className="font-oswald text-sm sm:text-lg tracking-widest text-white/50">
          <span className="text-white font-extrabold">0{currentSlide + 1}</span> / 0{SLIDES.length}
        </div>

        {/* Action Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 border border-white/10 hover:border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-300"
            aria-label="Previous slide"
          >
            <span className="text-xs sm:text-sm font-semibold">←</span>
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 border border-white/10 hover:border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-300"
            aria-label="Next slide"
          >
            <span className="text-xs sm:text-sm font-semibold">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
