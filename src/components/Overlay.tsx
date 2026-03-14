"use client";

import { motion } from "framer-motion";

const Section = ({ title, desc, delayMargin = false }: { title: string; desc: string, delayMargin?: boolean }) => {
  return (
    <div className={`h-[150vh] w-full flex flex-col items-center justify-center pointer-events-none ${delayMargin ? 'mt-[100vh]' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ margin: "-200px" }}
        className="max-w-4xl text-center px-4"
      >
        <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl">
          {title}
        </h2>
        <p className="text-xl md:text-3xl font-light text-zinc-300 drop-shadow-lg max-w-2xl mx-auto">
          {desc}
        </p>
      </motion.div>
    </div>
  );
};

export const Overlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <Section
        title="Precision & Care"
        desc="A new era of dentistry. State-of-the-art technology meets exceptional patient comfort."
        delayMargin={true}
      />
      <Section
        title="Flawless Aesthetics"
        desc="Crafting the perfect smile with microscopic precision and customized treatments."
      />
      <Section
        title="Advanced Health"
        desc="From 3D imaging to painless procedures, we lead the future of dental wellness."
      />
      <div className="h-[50vh]" /> {/* Buffer */}
    </div>
  );
};
