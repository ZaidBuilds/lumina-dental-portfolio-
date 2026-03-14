"use client";

import { motion } from "framer-motion";

export const HeroIntro = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className="w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-start text-left"
      >
        <p className="text-amber-500 font-medium tracking-[0.3em] uppercase mb-6 text-sm">
          Welcome to Lumina Dental
        </p>
        <h1 className="text-6xl md:text-9xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl leading-[0.9]">
          Design <br /> Your Smile
        </h1>
        <p className="text-xl md:text-2xl font-light text-zinc-300 drop-shadow-lg max-w-xl mb-12">
          Experience world-class dentistry where cutting-edge medical science meets exquisite aesthetic design.
        </p>
        <button className="pointer-events-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors uppercase tracking-wider text-sm flex items-center gap-2">
          Contact Us
        </button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent animate-pulse" />
      </motion.div>
    </div>
  );
};
