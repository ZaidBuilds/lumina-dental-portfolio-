"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const COMPLETED_PROJECTS = [
  {
    title: "Cosmetic Dentistry",
    category: "Aesthetics",
    color: "from-blue-600/60 to-transparent",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Invisalign Aligners",
    category: "Orthodontics",
    color: "from-purple-600/60 to-transparent",
    image: "https://images.unsplash.com/photo-1598256989800-fea5f5c8180c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Dental Implants",
    category: "Restorative",
    color: "from-emerald-600/60 to-transparent",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Teeth Whitening",
    category: "Enhancement",
    color: "from-amber-600/60 to-transparent",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800"
  },
];

export const Projects = () => {
  return (
    <div className="w-full bg-[#050505] py-32 px-4 md:px-12 text-white relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
        >
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase whitespace-nowrap">
            Signature <br className="hidden md:block" /> Services
          </h3>
          <p className="max-w-md text-zinc-400 mt-6 md:mt-0 md:text-right">
            Comprehensive, world-class dental solutions. Redefining
            the standard of care to help you achieve the perfect
            and healthy smile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {COMPLETED_PROJECTS.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800/50 aspect-[4/3] md:aspect-square lg:aspect-[4/3] cursor-pointer transition-all hover:border-zinc-700 w-full"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-60 group-hover:opacity-40"
                style={{ backgroundImage: `url(${proj.image})` }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${proj.color} opacity-0 group-hover:opacity-60 transition-opacity duration-700 ease-in-out`}
              />
              <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-end bg-gradient-to-t from-black to-transparent">
                <div>
                  <p className="text-zinc-400 font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {proj.category}
                  </p>
                  <h4 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {proj.title}
                  </h4>
                </div>
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="text-white w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
