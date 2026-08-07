"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFrameSequenceProps {
  frameCount: number;
  frameBasePath: (index: number) => string;
  scrollHeight?: string; // e.g., '300vh'
  children?: React.ReactNode;
}

export default function ScrollFrameSequence({
  frameCount,
  frameBasePath,
  scrollHeight = "300vh",
  children,
}: ScrollFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Store the images in a ref to avoid re-renders
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // 1. Preload images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = frameBasePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      // Handle error gracefully by just counting it as loaded to not block the whole page
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    return () => {
      // Cleanup ScrollTriggers if unmounted during load
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [frameCount, frameBasePath]);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current || !wrapperRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 2. Setup Canvas Size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(0);
    };

    const renderFrame = (index: number) => {
      if (!imagesRef.current[index] || !imagesRef.current[index].complete) return;
      const img = imagesRef.current[index];

      // Calculate object-cover dimensions
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Optional: fill with brand dark to prevent flashes
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      try {
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } catch (e) {
        // Ignore draw errors for missing/broken frames
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 3. GSAP ScrollTrigger Setup
    const playhead = { frame: 0 };
    
    const ctxGSAP = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: wrapperRef.current,
        scrub: 0.5, // Smooth scrubbing
        onUpdate: (self) => {
          // Map scroll progress to frame index
          const frameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(self.progress * frameCount))
          );
          


          if (playhead.frame !== frameIndex) {
            playhead.frame = frameIndex;
            requestAnimationFrame(() => renderFrame(frameIndex));
          }
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ctxGSAP.revert();
    };
  }, [imagesLoaded, frameCount]);

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative w-full">
      <div ref={wrapperRef} className="w-full h-screen overflow-hidden relative">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-brand-dark)] z-10 pointer-events-auto">
            <div className="w-12 h-12 border-4 border-gray-800 border-t-[var(--color-brand-orange)] rounded-full animate-spin mb-4"></div>
            <p className="font-oswald text-[var(--color-brand-orange)] tracking-widest uppercase">
              Loading Experience {loadProgress}%
            </p>
          </div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        


        {/* We expose a generic overlay slot for the parent to pass content */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full relative pointer-events-auto">
             {children}
          </div>
        </div>
      </div>
    </div>
  );
}
