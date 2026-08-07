"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Target, Zap, Award, Smile, CheckCircle, Crosshair } from "lucide-react";
import SplitType from "split-type";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Text Split Animation
      if (headerRef.current) {
        const text = new SplitType(headerRef.current, { types: 'chars,words' });

        gsap.fromTo(
          text.chars,
          { opacity: 0, y: 50, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Sticky Scroll Pinning
      if (stickyContainerRef.current && leftPanelRef.current) {
        // Only pin on desktop
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          ScrollTrigger.create({
            trigger: stickyContainerRef.current,
            start: "top top+=100", // Start pinning when top of container hits 100px below viewport top
            end: "bottom bottom",   // Stop pinning when bottom of container hits bottom of viewport
            pin: leftPanelRef.current,
            pinSpacing: false,
          });
        });
      }

      // 3. Right side text blocks fade in
      const storyBlocks = gsap.utils.toArray('.story-block');
      storyBlocks.forEach((block: any) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
            }
          }
        );
      });

      // 4. Bento Grid Entrance
      if (bentoRef.current) {
        gsap.fromTo(
          bentoRef.current.children,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bentoRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // 5. Mouse Follow Glow on Bento Cards
      const bentoCards = document.querySelectorAll('.bento-card');
      bentoCards.forEach((card: any) => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-14 lg:py-32 bg-[var(--color-brand-dark)] relative overflow-hidden text-gray-300">
      <div ref={containerRef} className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-32">
        
        {/* Sticky Scroll Section */}
        <div ref={stickyContainerRef} className="relative flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Pinned Image */}
          <div ref={leftPanelRef} className="w-full lg:w-1/2 lg:h-[80vh] flex flex-col justify-center">
            <h2 ref={headerRef} className="font-oswald text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider mb-6 text-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0% 120%)' }}>
              <span className="text-gradient-silver mr-4">About</span>
              SkyPilot
            </h2>
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-3/4 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group">
              <img 
                src="/images/drone_photography_1783188542223.png" 
                alt="SkyPilot Drone Operations" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <p className="font-oswald uppercase tracking-widest text-[var(--color-brand-orange)] text-sm font-bold mb-1">Precision & Power</p>
                <p className="font-inter text-white text-lg">Heavy-lift cinema drones.</p>
              </div>
            </div>
          </div>

          {/* Right Scrolling Content */}
          <div ref={rightPanelRef} className="w-full lg:w-1/2 flex flex-col gap-12 lg:gap-24 lg:pt-[20vh] lg:pb-[20vh]">
            
            {/* Block 1 */}
            <div className="story-block space-y-6">
              <div className="inline-flex items-center gap-3 text-[var(--color-brand-orange)] font-oswald uppercase tracking-widest text-sm font-bold border border-[var(--color-brand-orange)]/30 rounded-full px-4 py-2 bg-orange-500/10">
                <Crosshair className="w-4 h-4" /> The SkyPilot Story
              </div>
              <h3 className="font-oswald text-xl sm:text-3xl md:text-4xl uppercase tracking-wide text-white font-bold">
                Redefining Aerial Cinematography
              </h3>
              <p className="font-inter text-sm sm:text-base lg:text-lg leading-relaxed">
                Founded in Kurnool, Andhra Pradesh, SkyPilot Drone Services began with a simple mission: to provide unparalleled visual perspectives that were previously impossible or prohibitively expensive. Today, we are the premier choice for directors, developers, and surveyors who demand uncompromising quality.
              </p>
              <p className="font-inter text-sm sm:text-base lg:text-lg leading-relaxed">
                By merging deep technical expertise in unmanned aviation with a cinematic eye, we transform ordinary landscapes into breathtaking narratives and complex industrial sites into precise, actionable data.
              </p>
            </div>

            {/* Block 2 */}
            <div className="story-block space-y-6">
              <div className="inline-flex items-center gap-3 text-[var(--color-brand-orange)] font-oswald uppercase tracking-widest text-sm font-bold border border-[var(--color-brand-orange)]/30 rounded-full px-4 py-2 bg-orange-500/10">
                <Zap className="w-4 h-4" /> Our Arsenal
              </div>
              <h3 className="font-oswald text-xl sm:text-3xl md:text-4xl uppercase tracking-wide text-white font-bold">
                Aerospace-Grade Technology
              </h3>
              <p className="font-inter text-sm sm:text-base lg:text-lg leading-relaxed">
                We do not compromise on gear. Our fleet is anchored by industry-leading platforms including the DJI Inspire 3 for Hollywood-level cinema tracking, and heavy-lift hexacopters capable of flying RED and ARRI cinema cameras with master primes.
              </p>
              <p className="font-inter text-sm sm:text-base lg:text-lg leading-relaxed">
                For our industrial clients, we deploy RTK and PPK-enabled mapping drones equipped with radiometric thermal sensors, LiDAR, and high-megapixel optical zooms, guaranteeing survey-grade accuracy down to the centimeter.
              </p>
            </div>

            {/* Block 3 */}
            <div className="story-block space-y-6">
              <div className="inline-flex items-center gap-3 text-[var(--color-brand-orange)] font-oswald uppercase tracking-widest text-sm font-bold border border-[var(--color-brand-orange)]/30 rounded-full px-4 py-2 bg-orange-500/10">
                <ShieldCheck className="w-4 h-4" /> Safety Standards
              </div>
              <h3 className="font-oswald text-xl sm:text-3xl md:text-4xl uppercase tracking-wide text-white font-bold">
                Zero Compromise Operations
              </h3>
              <p className="font-inter text-sm sm:text-base lg:text-lg leading-relaxed">
                Aviation safety is the bedrock of our agency. Every SkyPilot operator is DGCA certified with hundreds of logged flight hours across complex environments. 
              </p>
              <p className="font-inter text-sm sm:text-base lg:text-lg leading-relaxed">
                We execute rigorous pre-flight inspections, comprehensive airspace authorizations, and redundant safety protocols. When you hire SkyPilot, you are securing a liability-free, perfectly orchestrated aerial operation.
              </p>
            </div>

          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="pt-24 border-t border-gray-800/50">
          <div className="text-center mb-16">
            <h3 className="font-oswald text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              The SkyPilot <span className="text-[var(--color-brand-orange)]">Advantage</span>
            </h3>
          </div>

          <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[280px]">
            
            {/* Vision - spans 2 cols */}
            <div className="bento-card hover-target md:col-span-2 relative bg-[#111111] rounded-2xl p-8 border border-gray-800 overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(245,133,31,0.1), transparent 40%)' }}></div>
              <Target className="w-10 h-10 text-[var(--color-brand-orange)] mb-6" />
              <h4 className="font-oswald text-2xl uppercase text-white font-bold mb-4">Our Vision</h4>
              <p className="font-inter text-gray-400 text-lg max-w-lg leading-relaxed">
                To become India's most trusted drone solutions company by pioneering cutting-edge aerial technology and setting the ultimate benchmark for safety and cinematic precision.
              </p>
            </div>

            {/* Stat 1 */}
            <div className="bento-card hover-target relative bg-[#111111] rounded-2xl p-8 border border-gray-800 overflow-hidden group flex flex-col justify-center items-center text-center">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(245,133,31,0.15), transparent 40%)' }}></div>
              <span className="font-oswald text-6xl font-bold text-[var(--color-brand-orange)] mb-2">5+</span>
              <span className="font-inter uppercase tracking-widest text-sm text-gray-300">Years Experience</span>
            </div>

            {/* Stat 2 */}
            <div className="bento-card hover-target relative bg-[#111111] rounded-2xl p-8 border border-gray-800 overflow-hidden group flex flex-col justify-center items-center text-center">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(245,133,31,0.15), transparent 40%)' }}></div>
              <span className="font-oswald text-6xl font-bold text-white mb-2">100<span className="text-3xl">%</span></span>
              <span className="font-inter uppercase tracking-widest text-sm text-gray-300">Safety Record</span>
            </div>

            {/* Mission - spans 2 cols */}
            <div className="bento-card hover-target md:col-span-2 relative bg-[#111111] rounded-2xl p-8 border border-gray-800 overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(245,133,31,0.1), transparent 40%)' }}></div>
              <Award className="w-10 h-10 text-[var(--color-brand-orange)] mb-6" />
              <h4 className="font-oswald text-2xl uppercase text-white font-bold mb-4">Our Mission</h4>
              <p className="font-inter text-gray-400 text-lg max-w-lg leading-relaxed">
                To provide world-class drone cinematography, highly accurate survey-grade mapping, and reliable industrial inspections using advanced platforms, while ensuring 100% compliance and client satisfaction.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
