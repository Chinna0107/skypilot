"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // smooth scrubbing
        }
      });

      // Background moves slightly up (parallax)
      tl.to(bgRef.current, { yPercent: -15, ease: "none" }, 0);
      
      // Text moves up faster than background
      tl.to(textRef.current, { yPercent: -40, ease: "none" }, 0);
      
      // Floating Left Image (moves fast up)
      tl.fromTo(imgLeftRef.current, 
        { yPercent: 40 },
        { yPercent: -80, ease: "none" }, 
      0);

      // Floating Right Image (moves even faster up)
      tl.fromTo(imgRightRef.current, 
        { yPercent: 80 },
        { yPercent: -100, ease: "none" }, 
      0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[var(--color-brand-dark)] h-[200vh] md:h-[300vh]"
    >
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* Background Layer with Dark Overlay to match theme */}
        <div ref={bgRef} className="absolute inset-[-10%] w-[120%] h-[120%] z-0">
          <Image 
            src="/images/drone_videography_1783188561895.png" 
            alt="Drone Videography Background" 
            fill 
            className="object-cover"
            priority
          />
          {/* Heavy dark overlay for the theme */}
          <div className="absolute inset-0 bg-[#0a0a0a] opacity-80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90" />
        </div>

        {/* Text Layer */}
        <div 
          ref={textRef} 
          className="relative z-10 text-center pointer-events-none mt-20 md:mt-32"
        >
          <h2 className="font-oswald text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter text-white opacity-20 whitespace-nowrap drop-shadow-2xl">
            ELEVATE <span className="text-[var(--color-brand-orange)] opacity-50">VISION</span>
          </h2>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 md:pt-8">
            <h3 className="font-oswald text-3xl sm:text-4xl md:text-6xl uppercase tracking-widest text-white drop-shadow-lg">
              Precision from Above
            </h3>
            <p className="font-inter text-xs sm:text-sm md:text-xl text-gray-400 mt-2 md:mt-4 tracking-[0.15em] md:tracking-[0.2em] uppercase max-w-2xl px-4">
              State-of-the-art aerial platforms
            </p>
          </div>
        </div>

        {/* Floating Image Left */}
        <div 
          ref={imgLeftRef} 
          className="absolute left-[2%] md:left-[10%] top-[20%] md:top-[30%] w-[45vw] md:w-[25vw] aspect-[4/5] z-20 shadow-2xl rounded-sm border border-[var(--color-brand-orange)] overflow-hidden gpu-accelerated"
        >
          <Image 
            src="/images/drone_photography_1783188542223.png" 
            alt="Drone Photography" 
            fill 
            className="object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>

        {/* Floating Image Right */}
        <div 
          ref={imgRightRef} 
          className="absolute right-[2%] md:right-[15%] top-[60%] md:top-[50%] w-[40vw] md:w-[22vw] aspect-square z-30 shadow-2xl rounded-sm border border-gray-700 overflow-hidden gpu-accelerated"
        >
          <Image 
            src="/images/industrial_inspection_1783188595010.png" 
            alt="Industrial Inspection" 
            fill 
            className="object-cover scale-110"
          />
          <div className="absolute inset-0 bg-[var(--color-brand-orange)] mix-blend-color opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Overlay gradient to blend bottom edge with the next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--color-brand-dark)] to-transparent z-40 pointer-events-none" />
      </div>
    </section>
  );
}
