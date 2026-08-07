"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Play, X, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "PRIYA CEMENTS",
    category: "Drone Survey • Progress Monitoring",
    image: "/images/portfolio_1_1784385776657.png",
    video: "/videos/hero-bg.MP4"
  },
  {
    title: "POWERGRID",
    category: "Transmission Line Inspection",
    image: "/images/portfolio_2_1784385789292.png",
    video: "/videos/port-2.MP4"
  },
  {
    title: "SOLAR PLANT",
    category: "Inspection • Thermal Analysis",
    image: "/images/service_inspection_1784385743368.png",
    video: "/videos/port-3.MP4"
  },
  {
    title: "A-MIX CONCRETE",
    category: "Construction Progress Monitoring",
    image: "/images/portfolio_3_1784385800215.png",
    video: "/videos/port-4.MP4"
  }
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const localProjects = localStorage.getItem("skypilot_projects");
    if (localProjects) {
      setProjects(JSON.parse(localProjects));
    } else {
      localStorage.setItem("skypilot_projects", JSON.stringify(PROJECTS));
      setProjects(PROJECTS);
    }
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-fade", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [projects]);

  return (
    <>
      <section
        id="portfolio"
        className="py-14 sm:py-20 lg:py-24 bg-[var(--color-brand-dark)] relative overflow-hidden border-t border-white/5"
        ref={containerRef}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading & CTA button matching the services layout screenshot */}
            <div className="w-full lg:w-1/4 portfolio-fade flex flex-col justify-between lg:min-h-[250px]">
              <div>
                <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] sm:text-xs font-black uppercase mb-3 block">
                  WHAT WE HAVE DONE
                </span>
                <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight leading-none mb-3">
                  OUR PROJECTS
                </h2>
                <div className="w-12 h-[3px] bg-[var(--color-brand-orange)] mb-6" />
                <p className="font-inter text-gray-400 text-xs sm:text-sm leading-relaxed mb-8">
                  Explore our recent aerial missions delivering high-precision topographic maps, engineering inspections, and premium cinematography.
                </p>
              </div>
              <div>
                <Link
                  href="/portfolio"
                  className="inline-flex border border-[var(--color-brand-orange)]/60 text-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)] hover:text-black px-6 py-3 rounded font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300"
                >
                  VIEW ALL PROJECTS
                </Link>
              </div>
            </div>

            {/* Right Column: Project Cards side by side */}
            <div className="w-full lg:w-3/4 portfolio-fade">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    onClick={() => setPlayingVideo(project.video)}
                    className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3] bg-gray-900"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/50 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:border-[var(--color-brand-orange)] group-hover:scale-110 transition-all duration-300">
                        <Play className="w-3.5 h-3.5 text-white group-hover:text-[var(--color-brand-orange)] fill-white group-hover:fill-[var(--color-brand-orange)] ml-0.5 transition-colors" />
                      </div>
                    </div>
                    {/* View Project label */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
                      <span className="font-inter text-white text-[10px] font-bold tracking-widest uppercase">View Project</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Video Modal */}
      {playingVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setPlayingVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setPlayingVideo(null)} 
              className="absolute top-4 right-4 text-white z-10 bg-black/50 p-2 rounded-full hover:bg-[var(--color-brand-orange)] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <video 
              src={playingVideo} 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
