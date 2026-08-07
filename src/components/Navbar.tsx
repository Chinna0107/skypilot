"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/services" },
    { name: "CAREER", href: "/career" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "CLIENTS", href: "/clients" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black shadow-lg"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-28">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-full" style={{zIndex: 1}}>
            <Link href="/" className="flex items-center" style={{pointerEvents: 'auto'}}>
              <div className="relative h-16 w-[16rem] sm:h-16 sm:w-[16rem] lg:h-20 lg:w-[22rem] overflow-visible flex items-center" style={{zIndex: 1}}>
                <Image
                  src="/logo.png"
                  alt="SkyPilot Drone Services"
                  fill
                  className="object-contain object-left scale-[2.2] sm:scale-[2.0] lg:scale-[2.4] origin-left"
                  style={{pointerEvents: 'none'}}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 relative z-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-widest hover:text-[var(--color-brand-orange)] transition-colors text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex relative z-10">
            <Link
              href="/contact"
              className="btn-swipe-dark bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] px-6 py-2.5 rounded font-inter text-xs font-bold tracking-widest flex items-center gap-2"
            >
              GET A QUOTE <span className="text-sm font-semibold">↗</span>
            </Link>
          </div>

          {/* Mobile: CTA + menu button */}
          <div className="flex lg:hidden items-center gap-3 relative z-10">
            <Link
              href="/contact"
              className="bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] px-4 py-2 rounded font-inter text-[10px] font-bold tracking-widest whitespace-nowrap"
            >
              GET A QUOTE
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[var(--color-brand-orange)] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[var(--color-brand-dark)] border-t border-white/10 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3.5 text-[11px] font-bold tracking-widest hover:text-[var(--color-brand-orange)] border-b border-white/5 text-white transition-colors"
              >
                {link.name}
                <span className="text-[var(--color-brand-orange)] text-xs">↗</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
