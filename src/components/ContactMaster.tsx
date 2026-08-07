"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Navigation
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactMaster() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Land Survey & Topographic Mapping",
    location: "",
    areaSize: "",
    urgency: "Standard (3-5 Days)",
    message: ""
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cnt-anim", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  // Generate pre-filled WhatsApp message URL
  const whatsappMsg = encodeURIComponent(
    `Hello SkyPilot Team! My name is ${formData.name || 'a client'}. I am looking for ${formData.service} in ${formData.location || 'India'} (${formData.areaSize || 'standard area'}). Urgency: ${formData.urgency}.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMsg}`;

  return (
    <div ref={containerRef} className="bg-[var(--color-brand-dark)] text-white min-h-screen pt-20 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
      
      {/* Spotlight Ambient Glows */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-[var(--color-brand-orange)]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION 1: HERO HEADER ================= */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-4">
          <div className="cnt-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            DIRECT FLIGHT & CONSULTATION TERMINAL
          </div>

          <h1 className="cnt-anim font-oswald text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none">
            LET'S LAUNCH YOUR MISSION.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[var(--color-brand-orange)]">
              CONTACT SKYPILOT.
            </span>
          </h1>

          <p className="cnt-anim font-inter text-gray-300 text-sm sm:text-base leading-relaxed">
            Ready to deploy high-resolution drone mapping, thermal inspection, or aerial cinematography? Fill out the quote terminal below or chat with pilot Vinay Kanth directly.
          </p>
        </div>

        {/* Quick Contact Ribbons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div className="bg-[#0e0e0e] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-[#161616] text-[var(--color-brand-orange)] rounded-xl border border-white/5 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">DIRECT PILOT LINE</span>
              <a href="tel:+919876543210" className="font-oswald text-white text-base font-bold uppercase hover:text-[var(--color-brand-orange)] transition-colors">+91 98765 43210</a>
            </div>
          </div>

          <div className="bg-[#0e0e0e] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-[#161616] text-[var(--color-brand-orange)] rounded-xl border border-white/5 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">EMAIL INQUIRIES</span>
              <a href="mailto:info@skypilot.in" className="font-oswald text-white text-base font-bold uppercase hover:text-[var(--color-brand-orange)] transition-colors">info@skypilot.in</a>
            </div>
          </div>

          <div className="bg-[#0e0e0e] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-[#161616] text-[var(--color-brand-orange)] rounded-xl border border-white/5 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">HEADQUARTERS</span>
              <span className="font-oswald text-white text-base font-bold uppercase">Kurnool, Andhra Pradesh</span>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: QUOTE TERMINAL & FORM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-12 sm:mb-20">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-7 bg-[#0e0e0e] border border-white/5 p-6 sm:p-10 rounded-3xl shadow-2xl">
            <div className="mb-8">
              <h2 className="font-oswald text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                FLIGHT QUOTE & INQUIRY FORM
              </h2>
              <p className="font-inter text-xs text-gray-400 mt-1">Provide project specs below to receive a customized scope analysis & quotation.</p>
            </div>

            {submitted ? (
              <div className="bg-[#121212] border border-[var(--color-brand-orange)]/30 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-oswald text-white text-2xl font-bold uppercase">MISSION INQUIRY RECEIVED!</h3>
                <p className="font-inter text-xs text-gray-300 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our flight operations team is reviewing your project requirements and will contact you within 4 hours.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-black hover:bg-[#20bd5a] px-6 py-3 rounded-xl font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> CHAT ON WHATSAPP NOW
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border border-white/20 text-white hover:bg-white/5 px-6 py-3 rounded-xl font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300"
                  >
                    NEW INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">FULL NAME *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full bg-[#141414] border border-white/10 focus:border-[var(--color-brand-orange)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="rajesh@company.com"
                      className="w-full bg-[#141414] border border-white/10 focus:border-[var(--color-brand-orange)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#141414] border border-white/10 focus:border-[var(--color-brand-orange)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">REQUIRED SERVICE *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-[#141414] border border-white/10 focus:border-[var(--color-brand-orange)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-all duration-300"
                    >
                      <option value="Land Survey & Topographic Mapping">Land Survey & Topographic Mapping</option>
                      <option value="Industrial & Thermal Asset Inspection">Industrial & Thermal Asset Inspection</option>
                      <option value="Construction & Infrastructure Monitoring">Construction & Infrastructure Monitoring</option>
                      <option value="Cinematic Visuals & Real Estate">Cinematic Visuals & Real Estate</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">PROJECT LOCATION</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City / District / State"
                      className="w-full bg-[#141414] border border-white/10 focus:border-[var(--color-brand-orange)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">TIMELINE URGENCY</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full bg-[#141414] border border-white/10 focus:border-[var(--color-brand-orange)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-all duration-300"
                    >
                      <option value="Standard (3-5 Days)">Standard (3-5 Days)</option>
                      <option value="Urgent (24-48 Hours)">Urgent (24-48 Hours)</option>
                      <option value="Emergency Flight Launch">Emergency Flight Launch (Same Day)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">PROJECT SCOPE / NOTES</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details regarding target acreage, site conditions, or special deliverables required..."
                    className="w-full bg-[#141414] border border-white/10 focus:border-[var(--color-brand-orange)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    className="bg-[var(--color-brand-orange)] hover:bg-orange-600 text-black hover:text-white py-3.5 px-8 rounded-xl font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 flex-grow"
                  >
                    SUBMIT INQUIRY TERMINAL <Send className="w-4 h-4" />
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1e2e22] hover:bg-[#253e2b] text-[#25D366] border border-[#25D366]/30 py-3.5 px-6 rounded-xl font-inter text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> WHATSAPP
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Information & Emergency Callout */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Emergency Hotline Card */}
            <div className="bg-gradient-to-r from-amber-950/30 to-black border border-amber-500/30 p-6 rounded-3xl space-y-3">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h3 className="font-oswald text-base font-bold uppercase tracking-wide">EMERGENCY FLIGHT DISPATCH</h3>
              </div>
              <p className="font-inter text-xs text-gray-300 leading-relaxed">
                For urgent industrial grid outages, rapid disaster assessments, or emergency insurance documentation, call our rapid response hotline directly.
              </p>
              <a 
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 font-oswald text-amber-400 text-lg font-bold tracking-wider hover:underline"
              >
                +91 98765 43210 <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Flight Operations Card */}
            <div className="bg-[#0e0e0e] border border-white/5 p-6 rounded-3xl space-y-4">
              <h3 className="font-oswald text-white text-lg font-bold uppercase tracking-wide">OPERATION HOURS & STANDARDS</h3>
              <ul className="space-y-3 text-xs text-gray-300 font-inter">
                <li className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-gray-500">Flight Operations:</span>
                  <span className="font-bold text-white">06:00 AM - 06:30 PM IST</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-gray-500">GIS Processing Desk:</span>
                  <span className="font-bold text-white">24/7 Turnaround Queue</span>
                </li>
                <li className="flex items-center justify-between py-2">
                  <span className="text-gray-500">Legal Compliance:</span>
                  <span className="font-bold text-[var(--color-brand-orange)]">DGCA / Digital Sky Cleared</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}} />
    </div>
  );
}
