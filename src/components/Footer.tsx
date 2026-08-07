"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-dark)] pt-14 sm:pt-20 pb-8 border-t border-white/5 font-inter text-gray-400">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-start">
            <div className="relative h-14 w-48 sm:h-20 sm:w-80 mb-2 overflow-visible">
              <Image
                src="/navbar-logo.png"
                alt="SkyPilot Drone Services"
                fill
                className="object-contain object-left scale-[1.5] sm:scale-[2.2] origin-left"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm text-gray-300 font-medium">
              Professional drone services for industrial, construction, inspection & cinematic visuals across India.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919391705935" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-oswald text-white text-sm tracking-wider uppercase font-bold mb-6">QUICK LINKS</h3>
            <ul className="space-y-3 text-xs font-semibold">
              <li><Link href="/" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Home</Link></li>
              <li><Link href="/services" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Services</Link></li>
              <li><Link href="/career" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Career</Link></li>
              <li><Link href="/portfolio" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Portfolio</Link></li>
              <li><Link href="/clients" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Clients</Link></li>
              <li><Link href="/about" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-oswald text-white text-sm tracking-wider uppercase font-bold mb-6">SERVICES</h3>
            <ul className="space-y-3 text-xs font-semibold">
              <li><Link href="/services" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Drone Survey</Link></li>
              <li><Link href="/services" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Industrial Inspection</Link></li>
              <li><Link href="/services" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Solar Plant Inspection</Link></li>
              <li><Link href="/services" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Construction Monitoring</Link></li>
              <li><Link href="/services" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Mapping & GIS</Link></li>
              <li><Link href="/services" className="hover:text-[var(--color-brand-orange)] transition-colors duration-300">Event Cinematography</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-oswald text-white text-sm tracking-wider uppercase font-bold mb-6">CONTACT</h3>
            <ul className="space-y-4 text-xs font-semibold">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--color-brand-orange)] shrink-0" />
                <span>+91 91 0000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--color-brand-orange)] shrink-0" />
                <span>info@skypilotdrones.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--color-brand-orange)] shrink-0 mt-0.5" />
                <span>Kurnool, Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 SkyPilot Drone Services. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed with precision <span className="text-[var(--color-brand-orange)]">🧡</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
