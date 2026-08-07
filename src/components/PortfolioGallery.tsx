"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Play, X, Eye, ArrowUpRight } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "https://skypilot-be.vercel.app/api";


interface GalleryItem {
  id: number; title: string; category: string;
  filter: "survey" | "industrial" | "cinematography";
  image_url: string; video_url: string | null; description: string;
}

const FILTER_LABELS: Record<string, string> = {
  all: "ALL WORK", survey: "SURVEY & MAPPING", industrial: "INDUSTRIAL", cinematography: "CINEMATOGRAPHY",
};

export default function PortfolioGallery() {
  const [filter, setFilter] = useState<"all" | "survey" | "industrial" | "cinematography">("all");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeMedia, setActiveMedia] = useState<{ type: "video" | "image"; url: string; title: string } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API}/portfolio`)
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : []));
  }, []);

  const filtered = filter === "all" ? items : items.filter(i => i.filter === filter);

  const counts = {
    all: items.length,
    survey: items.filter(i => i.filter === "survey").length,
    industrial: items.filter(i => i.filter === "industrial").length,
    cinematography: items.filter(i => i.filter === "cinematography").length,
  };

  useEffect(() => {
    if (!gridRef.current || !items.length) return;
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, scale: 0.92, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power2.out", overwrite: "auto" }
    );
  }, [filter, items]);

  return (
    <section className="py-20 bg-[var(--color-brand-dark)] min-h-screen">
      <div className="max-w-8xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] font-black uppercase mb-3 block">OUR WORK</span>
          <h2 className="font-oswald text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-none mb-4">FEATURED PROJECTS</h2>
          <div className="w-16 h-[2px] bg-[var(--color-brand-orange)] mx-auto" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {(["all", "survey", "industrial", "cinematography"] as const).map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-full font-inter text-[10px] font-black tracking-[0.18em] uppercase transition-all duration-300 border flex items-center gap-2 ${
                filter === tab
                  ? "bg-[var(--color-brand-orange)] border-transparent text-[var(--color-brand-dark)] shadow-[0_0_25px_rgba(245,133,31,0.3)]"
                  : "bg-[#0e0e0e] border-white/[0.07] hover:border-white/20 text-gray-400 hover:text-white"
              }`}>
              {FILTER_LABELS[tab]}
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${filter === tab ? "bg-black/20 text-black/70" : "bg-white/5 text-gray-600"}`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div key={item.id}
              onClick={() => setActiveMedia({ type: item.video_url ? "video" : "image", url: item.video_url ?? item.image_url, title: item.title })}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-video bg-neutral-900"
            >
              <Image src={item.image_url} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-90" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center bg-black/30 backdrop-blur-md group-hover:border-[var(--color-brand-orange)] group-hover:bg-[var(--color-brand-orange)]/20 group-hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  {item.video_url ? <Play className="w-4 h-4 text-white fill-white ml-0.5" /> : <Eye className="w-4 h-4 text-white" />}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-between items-center">
                <span className="font-inter text-white text-[10px] font-bold tracking-widest uppercase">
                  {item.video_url ? "Watch Project" : "View Project"}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeMedia && (
        <div className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl" style={{ animation: "fadeIn 0.25s ease-out forwards" }} onClick={() => setActiveMedia(null)}>
          <div className="relative w-full max-w-5xl bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] bg-[#0d0d0d]">
              <p className="font-oswald text-sm font-bold uppercase tracking-wider text-white">{activeMedia.title}</p>
              <button onClick={() => setActiveMedia(null)} className="text-gray-400 hover:text-white bg-white/5 hover:bg-[var(--color-brand-orange)] hover:text-black p-2 rounded-lg border border-white/10 hover:border-transparent transition-all duration-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video">
              {activeMedia.type === "video"
                ? <video src={activeMedia.url} controls autoPlay className="w-full h-full object-contain bg-black" />
                : <div className="relative w-full h-full"><Image src={activeMedia.url} alt={activeMedia.title} fill className="object-contain" quality={100} /></div>
              }
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }` }} />
    </section>
  );
}
