"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const ScrollyCanvas = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameCount = 120;

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedIndex}.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = useCallback((index: number) => {
    if (images.length < frameCount) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    const { width, height } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    // High quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * frameCount),
      frameCount - 1
    );
    renderFrame(frameIndex);
  });

  useEffect(() => {
    if (images.length > 0) {
      renderFrame(0);
    }
  }, [images, renderFrame]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(
          Math.floor(currentProgress * frameCount),
          frameCount - 1
        );
        renderFrame(frameIndex);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full opacity-60" />
      </div>
      {children}
    </div>
  );
};
