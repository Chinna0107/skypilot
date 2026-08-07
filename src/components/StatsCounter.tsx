"use client";

import { useEffect, useRef } from "react";
import { Plane, FolderCheck, Calendar, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Plane,       value: 1000, suffix: "+", label: "Flight Hours" },
  { icon: FolderCheck, value: 500,  suffix: "+", label: "Projects Delivered" },
  { icon: Calendar,    value: 8,    suffix: "+", label: "Years Experience" },
  { icon: ShieldCheck, value: 100,  suffix: "%", label: "Safety Record" },
];

function animateCount(
  el: HTMLSpanElement,
  target: number,
  duration = 2500,
  delay = 0
) {
  setTimeout(() => {
    let current = 0;
    const totalSteps = duration / 16; // ~60fps
    const increment = target / totalSteps;

    const tick = () => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current).toString();
      if (current < target) requestAnimationFrame(tick);
      else el.textContent = target.toString(); // snap to exact value
    };

    requestAnimationFrame(tick);
  }, delay);
}

export default function StatsCounter() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animated    = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;

          // Slide-in cards with CSS class stagger
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, i * 150);
          });

          // Count-up each number
          counterRefs.current.forEach((el, i) => {
            if (!el) return;
            animateCount(el, stats[i].value, 2200, i * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-[var(--color-brand-dark)] relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 md:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-2 sm:gap-x-6 lg:gap-8 divide-x-0 lg:divide-x lg:divide-white/10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  style={{
                    opacity: 0,
                    transform: "translateY(30px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                  }}
                  className="flex flex-col items-center justify-center gap-2 sm:gap-4 lg:gap-6 px-1 sm:px-4"
                >
                  <div className="text-[var(--color-brand-orange)] flex-shrink-0">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-baseline justify-center sm:justify-start gap-0.5 mb-1">
                      <span
                        ref={(el) => { counterRefs.current[idx] = el; }}
                        className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-brand-orange)]"
                      >
                        0
                      </span>
                      <span className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-brand-orange)]">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="font-inter text-gray-300 text-xs sm:text-sm">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
