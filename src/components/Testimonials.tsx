"use client";

import { motion } from "framer-motion";

const REVIEWS = [
  {
    name: "Sarah Jenkins",
    text: "The most comfortable dental experience I have ever had. The 3D imaging technology they use for implants is incredible.",
  },
  {
    name: "Michael Chen",
    text: "My Invisalign journey with Lumina was seamless. The doctors are incredibly precise and the clinic feels like a luxury spa.",
  },
  {
    name: "Emma Roberts",
    text: "I used to have severe dental anxiety, but the team here completely changed that. Painless, professional, and perfect aesthetics.",
  },
];

export const Testimonials = () => {
  return (
    <div className="w-full bg-[#050505] py-24 px-4 md:px-12 text-white relative z-20 border-t border-zinc-900 border-opacity-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">
            Patient Stories
          </h3>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Hear from our patients about their transformative experiences and 
            why they trust us with their smiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm"
            >
              <div className="text-amber-500 mb-6 text-2xl">★★★★★</div>
              <p className="text-lg text-zinc-300 font-light leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              <div className="font-medium text-white tracking-wide">
                — {review.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
