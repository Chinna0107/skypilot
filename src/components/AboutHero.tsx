"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Shield, Star, CheckCircle, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text animations on load
      gsap.from(".hero-anim-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      });

      // Portrait reveal from bottom
      gsap.from(".portrait-anim", {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        ease: "power3.out"
      });

      // Parallax effect on portrait while scrolling
      gsap.to(portraitRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Stats bar horizontal stagger entry
      gsap.from(".stat-box-anim", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 90%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full pt-28 pb-10 bg-[var(--color-brand-dark)] overflow-hidden"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-brand-orange)]/5 to-transparent pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div ref={textRef} className="w-full lg:w-1/2">
            <h1 className="hero-anim-item font-oswald text-4xl lg:text-5xl uppercase font-bold text-[var(--color-brand-orange)] mb-2">
              ABOUT
            </h1>
            <h2 className="hero-anim-item font-oswald text-6xl md:text-7xl lg:text-8xl uppercase font-bold text-white mb-6 leading-none">
              SKYPILOT
            </h2>
            
            <p className="hero-anim-item font-oswald text-xl uppercase tracking-widest text-white font-bold mb-8">
              VISION. PRECISION. <span className="text-[var(--color-brand-orange)]">IMPACT.</span>
            </p>

            <p className="hero-anim-item font-inter text-gray-300 text-lg leading-relaxed max-w-lg mb-12">
              SkyPilot Drone Services was founded with a vision to redefine the way the world looks from above. We combine creativity, technology and precision to deliver aerial solutions that inspire and create impact.
            </p>

            <div className="hero-anim-item">
              <p className="font-serif italic text-4xl text-[var(--color-brand-orange)] mb-2">
                Emidi Vinay Kanth
              </p>
              <p className="font-oswald uppercase tracking-widest font-bold text-white text-sm mb-1">
                FOUNDER & DRONE PILOT
              </p>
              <p className="font-inter text-gray-400 text-xs uppercase tracking-widest">
                DGCA CERTIFIED | LICENSED PILOT
              </p>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] flex items-end justify-center overflow-hidden rounded-3xl">
            {/* Founder Portrait */}
            <div ref={portraitRef} className="portrait-anim relative w-full max-w-[500px] h-full">
              <Image
                src="/images/founder_portrait_vinay.png"
                alt="Vinay Kanth - Founder"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark)] via-transparent to-transparent z-10" />
            </div>
          </div>
          
        </div>
      </div>

      {/* Stats Bar */}
      <div ref={statsRef} className="relative z-20 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:-mt-12">
        <div className="bg-[#111111] border border-white/5 rounded-xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stat-box-anim flex items-center gap-4">
              <div className="text-[var(--color-brand-orange)]">
                <Shield className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-oswald text-white font-bold tracking-wider text-lg">DGCA CERTIFIED</h3>
                <p className="text-gray-400 text-sm">Licensed Drone Pilot</p>
              </div>
            </div>
            
            <div className="stat-box-anim flex items-center gap-4">
              <div className="text-[var(--color-brand-orange)]">
                <Star className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-oswald text-white font-bold tracking-wider text-lg">8+ YEARS</h3>
                <p className="text-gray-400 text-sm">Industry Experience</p>
              </div>
            </div>

            <div className="stat-box-anim flex items-center gap-4">
              <div className="text-[var(--color-brand-orange)]">
                <CheckCircle className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-oswald text-white font-bold tracking-wider text-lg">1000+</h3>
                <p className="text-gray-400 text-sm">Projects Completed</p>
              </div>
            </div>

            <div className="stat-box-anim flex items-center gap-4">
              <div className="text-[var(--color-brand-orange)]">
                <MapPin className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-oswald text-white font-bold tracking-wider text-lg">PAN INDIA</h3>
                <p className="text-gray-400 text-sm">Projects Across India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
