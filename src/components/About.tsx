"use client";

import { motion } from "framer-motion";

export const About = () => {
  return (
    <div className="w-full bg-[#050505] py-32 px-4 md:px-12 text-white relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl border border-zinc-800/50">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800)` }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-4">Meet The Doctor</h3>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Artistry & <br/> Science Combined.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-8">
            Dr. Lumina believes that your smile is your greatest asset. With over fifteen years of specialized experience in cosmetic and restorative dentistry, every treatment is approached as a bespoke piece of art.
          </p>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12">
            Our clinic integrates the latest advancements in 3D scanning, laser therapy, and digital smile design. We don't just fix teeth—we engineer confidence.
          </p>
          
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors uppercase tracking-wider text-sm">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
};
