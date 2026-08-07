"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/services" },
    { name: "CAREER", href: "/career" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "CLIENTS", href: "/clients" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Track scroll for shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black transition-shadow duration-300 ${scrolled ? "shadow-xl" : "shadow-lg"}`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-28">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center h-full" style={{ zIndex: 1 }}>
              <Link href="/" className="flex items-center" style={{ pointerEvents: "auto" }}>
                <div
                  className="relative overflow-visible flex items-center"
                  style={{ height: "48px", width: "140px", zIndex: 1 }}
                >
                  <Image
                    src="/logo.png"
                    alt="SkyPilot Drone Services"
                    fill
                    className="object-contain object-left scale-[2.0] sm:scale-[2.0] lg:scale-[2.4] origin-left"
                    style={{ pointerEvents: "none" }}
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
                  className={`text-xs font-bold tracking-widest transition-colors ${
                    pathname === link.href
                      ? "text-[var(--color-brand-orange)]"
                      : "text-white hover:text-[var(--color-brand-orange)]"
                  }`}
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
            <div className="flex lg:hidden items-center gap-2 relative z-10 flex-shrink-0">
              <Link
                href="/contact"
                className="bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] px-3 py-2 rounded font-inter text-[9px] font-bold tracking-widest whitespace-nowrap"
              >
                GET A QUOTE
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[var(--color-brand-orange)] focus:outline-none p-1.5 rounded-md hover:bg-white/5 transition-colors flex-shrink-0"
                aria-label="Toggle menu"
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
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-down Menu */}
      <div
        className={`fixed top-16 sm:top-20 left-0 right-0 z-40 lg:hidden bg-[#0a0a0a] border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="px-4 py-3">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-4 text-[11px] font-bold tracking-widest border-b border-white/5 transition-all duration-200 ${
                pathname === link.href
                  ? "text-[var(--color-brand-orange)] bg-[var(--color-brand-orange)]/5"
                  : "text-white hover:text-[var(--color-brand-orange)] hover:bg-white/5"
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <span>{link.name}</span>
              <span className={`text-xs ${pathname === link.href ? "text-[var(--color-brand-orange)]" : "text-[var(--color-brand-orange)]/50"}`}>↗</span>
            </Link>
          ))}

          {/* Bottom CTA inside menu */}
          <div className="pt-4 pb-3 px-1">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] py-3.5 rounded-xl font-inter text-xs font-black tracking-widest"
            >
              GET A QUOTE ↗
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
