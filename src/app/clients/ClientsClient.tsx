"use client";

import PageHeader from "@/components/PageHeader";
import { Quote, Star, ArrowUpRight, Award, Handshake, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const API = process.env.NEXT_PUBLIC_API_URL ?? "https://skypilot-be.vercel.app/api";


interface Client { id: number; name: string; logo_url: string; location: string; projects: string; }
interface Testimonial { id: number; tag: string; quote: string; author: string; role: string; rating: number; }

export default function ClientsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/clients`).then(r => r.json()),
      fetch(`${API}/clients/testimonials`).then(r => r.json()),
    ]).then(([c, t]) => {
      setClients(Array.isArray(c) ? c : []);
      setTestimonials(Array.isArray(t) ? t : []);
    });
  }, []);

  useEffect(() => {
    if (!clients.length && !testimonials.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".stat-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out" });
      gsap.fromTo(".logo-card", { scale: 0.92, y: 25, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: "power2.out", delay: 0.2 });
      gsap.fromTo(".review-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: "power3.out", delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, [clients, testimonials]);

  const TRUST_STATS = [
    { value: "50+",  label: "Projects Delivered", icon: Award },
    { value: `${clients.length}`, label: "Active Clients", icon: Handshake },
    { value: "5",    label: "States Covered",     icon: Globe },
    { value: "100%", label: "Satisfaction Rate",  icon: Star },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-brand-dark)]">
      <PageHeader
        title="Our Clients"
        description="Trusted by leading organizations across India for precision drone services, aerial surveys, and cinematic productions."
        bgVideo="https://res.cloudinary.com/p8auppz8/video/upload/v1786115164/port-4_zyhxz2.mp4"
        showOverlay={true}
      />

      {/* Trust Stats */}
      <section className="py-12 border-b border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_STATS.map((stat, i) => (
              <div key={i} className="stat-card flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--color-brand-orange)]/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-orange)]/10 border border-[var(--color-brand-orange)]/15 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-4 h-4 text-[var(--color-brand-orange)]" />
                </div>
                <div>
                  <p className="font-oswald text-2xl font-extrabold text-white leading-none">{stat.value}</p>
                  <p className="font-inter text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 border-b border-white/5">
        <div className="text-center mb-14">
          <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] font-black uppercase mb-3 block">PARTNERS IN SUCCESS</span>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-none">COMPANIES WE&apos;VE WORKED WITH</h2>
          <div className="w-16 h-[2px] bg-[var(--color-brand-orange)] mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {clients.map((client) => (
            <div key={client.id} className="logo-card group relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-[var(--color-brand-orange)]/30 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer flex flex-col items-center text-center gap-4 hover:shadow-[0_8px_40px_rgba(245,133,31,0.08)] hover:-translate-y-1">
              <div className="h-16 w-full flex items-center justify-center bg-white rounded-xl p-3 shadow-sm">
                <img src={client.logo_url} alt={`${client.name} Logo`} className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <div>
                <h3 className="font-oswald text-xs font-bold text-white tracking-widest uppercase mb-1">{client.name}</h3>
                <p className="font-inter text-gray-500 text-[9px] uppercase tracking-wider font-semibold mb-1">{client.location}</p>
                {client.projects && (
                  <span className="inline-block font-inter text-[9px] text-[var(--color-brand-orange)] font-bold tracking-wider bg-[var(--color-brand-orange)]/10 px-2 py-0.5 rounded-full">{client.projects}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] font-black uppercase mb-3 block">TESTIMONIALS</span>
            <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-none">WHAT OUR CLIENTS SAY</h2>
            <div className="w-16 h-[2px] bg-[var(--color-brand-orange)] mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((review) => (
              <div key={review.id} className="review-card relative bg-white/[0.02] border border-white/5 rounded-2xl p-7 hover:border-[var(--color-brand-orange)]/25 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between group hover:shadow-[0_8px_40px_rgba(245,133,31,0.06)] hover:-translate-y-1">
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-orange)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span className="inline-block bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[var(--color-brand-orange)]/15">{review.tag}</span>
                    <Quote className="w-7 h-7 text-[var(--color-brand-orange)]/20 group-hover:text-[var(--color-brand-orange)]/35 transition-colors duration-300" />
                  </div>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[var(--color-brand-orange)] text-[var(--color-brand-orange)]" />)}
                  </div>
                  <p className="font-inter text-gray-300 text-sm leading-relaxed mb-7 italic">&ldquo;{review.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 border-t border-white/[0.05] pt-5">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-brand-orange)]/15 border border-[var(--color-brand-orange)]/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-oswald text-xs font-bold text-[var(--color-brand-orange)]">{review.author[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-oswald text-white text-sm font-bold uppercase tracking-wider leading-none">{review.author}</h4>
                    <p className="font-inter text-gray-500 text-[10px] mt-0.5">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/40 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <span className="font-inter text-[var(--color-brand-orange)] tracking-[0.25em] text-[10px] font-black uppercase mb-4 block">JOIN OUR CLIENTS</span>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white mb-6 leading-tight">READY TO COLLABORATE WITH US?</h2>
          <p className="font-inter text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">Contact our drone service team today to discuss your next project, survey, or visual cinematography goals.</p>
          <Link href="/contact" className="bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] hover:bg-orange-500 px-8 py-4 rounded-xl font-inter text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 inline-flex items-center gap-2 shadow-[0_4px_25px_rgba(245,133,31,0.3)] hover:shadow-[0_4px_40px_rgba(245,133,31,0.5)] hover:-translate-y-0.5">
            START YOUR PROJECT <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
