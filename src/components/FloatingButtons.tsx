"use client";

import { Phone, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-center gap-3">
      {/* Phone Call Button */}
      <a
        href="tel:+919391705935"
        aria-label="Call SkyPilot"
        className="floating-btn-phone w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--color-brand-orange)] text-white flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_rgba(245,133,31,0.5)] transition-all duration-300"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919391705935"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="floating-btn-phone w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--color-brand-orange)] text-white flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_rgba(245,133,31,0.5)] transition-all duration-300"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
      </a>
    </div>
  );
}
