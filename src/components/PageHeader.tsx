"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface PageHeaderProps {
  title: string;
  description: string;
  bgImage?: string;
  bgVideo?: string;
  showOverlay?: boolean;
  scrollingItems?: string[];
}

export default function PageHeader({ 
  title, 
  description, 
  bgImage, 
  bgVideo, 
  showOverlay = true,
  scrollingItems 
}: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the background image
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Text reveal animation
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[35vh] min-h-[260px] md:h-[50vh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Parallax Background */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-[130%] -top-[15%] z-0 pointer-events-none gpu-accelerated"
      >
        {bgVideo ? (
          <video
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : bgImage ? (
          <Image
            src={bgImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        ) : null}
        {/* Overlay to ensure text readability */}
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[var(--color-brand-dark)]/70 to-[var(--color-brand-dark)] z-10" />
        )}
      </div>

      {/* Content */}
      <div 
        ref={textRef} 
        className="relative z-20 text-center max-w-4xl mx-auto px-4"
      >
        <h1 className="font-oswald text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
          {title}
        </h1>
        <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-6"></div>
        <p className="font-inter text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
 
      {scrollingItems && scrollingItems.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-black/60 backdrop-blur-sm border-t border-white/10 py-3 sm:py-4 z-20">
          <div className="animate-marquee">
            {[...scrollingItems, ...scrollingItems, ...scrollingItems].map((item, idx) => (
              <span 
                key={idx} 
                className="font-oswald text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--color-brand-orange)] mx-6 sm:mx-10 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" /> {item}
              </span>
            ))}
          </div>
          
          <style>{`
            @keyframes marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-33.3333%, 0, 0); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 25s linear infinite;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
