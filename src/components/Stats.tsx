"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="w-full bg-[#050505] py-40 px-4 md:px-12 text-white relative z-20 overflow-hidden border-t border-zinc-900 border-opacity-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_50%)]" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
        <motion.div style={{ y: y1 }} className="flex flex-col items-center text-center">
          <h4 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-xl">15+</h4>
          <p className="text-amber-500 tracking-[0.2em] uppercase text-sm font-bold">Years Experience</p>
        </motion.div>
        
        <motion.div style={{ y: y2 }} className="flex flex-col items-center text-center">
          <h4 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-xl">10k+</h4>
          <p className="text-amber-500 tracking-[0.2em] uppercase text-sm font-bold">Smiles Restored</p>
        </motion.div>
        
        <motion.div style={{ y: y3 }} className="flex flex-col items-center text-center">
          <h4 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-xl">100%</h4>
          <p className="text-amber-500 tracking-[0.2em] uppercase text-sm font-bold">Client Satisfaction</p>
        </motion.div>
      </div>
    </div>
  );
};
