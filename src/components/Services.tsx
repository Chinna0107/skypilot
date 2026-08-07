"use client";

import { useEffect, useRef, useState } from "react";
import { 
  ScanLine, 
  Factory, 
  Sun, 
  Wind, 
  HardHat, 
  Map, 
  Film, 
  Home,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  {
    title: "DRONE SURVEY",
    description: "High accuracy aerial surveys for mapping & modeling",
    icon: ScanLine,
    contactValue: "Land Survey & Mapping",
    image: "/images/services_survey.png"
  },
  {
    title: "INDUSTRIAL INSPECTION",
    description: "Inspection for industries, factories & critical assets",
    icon: Factory,
    contactValue: "Industrial Inspection",
    image: "/images/services_industrial.png"
  },
  {
    title: "SOLAR PLANT INSPECTION",
    description: "Thermal & visual inspection for solar power plants",
    icon: Sun,
    contactValue: "Solar Plant Inspection",
    image: "/images/services_solar.png"
  },
  {
    title: "WINDMILL INSPECTION",
    description: "Blade inspection and site analysis for wind turbines",
    icon: Wind,
    contactValue: "Windmill Inspection",
    image: "/images/services_windmill.png"
  },
  {
    title: "CONSTRUCTION MONITORING",
    description: "Track progress with high resolution aerial data",
    icon: HardHat,
    contactValue: "Construction Monitoring",
    image: "/images/services_construction.png"
  },
  {
    title: "MAPPING & GIS",
    description: "Orthomosaic maps, 3D models & GIS integration",
    icon: Map,
    contactValue: "Mapping & GIS",
    image: "/images/services_gis.png"
  },
  {
    title: "EVENT CINEMATOGRAPHY",
    description: "Aerial visuals for events, weddings & promotions",
    icon: Film,
    contactValue: "Drone Videography",
    image: "/images/services_event.png"
  },
  {
    title: "REAL ESTATE VISUALS",
    description: "Stunning aerial shots for real estate marketing",
    icon: Home,
    contactValue: "Real Estate Visuals",
    image: "/images/services_realestate.png"
  }
];



export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 } // trigger early
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Fallback timer: make sure it becomes visible if observer fails
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="services"
      className="py-14 sm:py-20 lg:py-24 bg-[var(--color-brand-dark)] relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div 
          className={`flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10 sm:mb-16 transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="max-w-xl">
            <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] sm:text-xs font-black uppercase mb-3 block">
              OUR SERVICES
            </span>
            <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
              SOLUTIONS THAT TAKE YOU HIGHER
            </h2>
          </div>
          <div className="max-w-lg md:text-left">
            <p className="font-inter text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
              We combine advanced drone technology with industry expertise to deliver accurate data, stunning visuals, and actionable insights.
            </p>
          </div>
        </div>

        {/* Services Grid (8 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                href={`/contact?service=${encodeURIComponent(service.contactValue)}`}
                className={`group relative overflow-hidden bg-[#0e0e0e] border border-white/5 hover:border-white/15 rounded-xl transition-all duration-500 flex flex-col justify-between hover:shadow-[0_4px_30px_rgba(245,133,31,0.05)] cursor-pointer transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${idx * 75}ms` : "0ms",
                  transitionProperty: "transform, opacity, border-color, box-shadow"
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-44 w-full overflow-hidden bg-gray-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[var(--color-brand-orange)] p-2.5 rounded-lg border border-white/10 group-hover:scale-110 group-hover:bg-[var(--color-brand-orange)] group-hover:text-black transition-all duration-300">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-oswald text-white text-base sm:text-lg font-bold uppercase tracking-wider mb-2 transition-colors duration-300 group-hover:text-[var(--color-brand-orange)]">
                      {service.title}
                    </h3>
                    <p className="font-inter text-gray-400 text-xs leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    LEARN MORE <span>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
