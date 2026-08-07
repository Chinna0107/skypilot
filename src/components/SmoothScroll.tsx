"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when layout calculations settle
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleLoad);

    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Defer a refresh to ensure all components have hydrated and computed heights
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Multiple secondary refreshes to catch lazy-loaded images and dynamic DOM updates
    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleLoad);
      clearTimeout(timer);
      clearTimeout(timer2);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
