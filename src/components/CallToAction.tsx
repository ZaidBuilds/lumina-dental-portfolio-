"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";

export const CallToAction = () => {
  return (
    <div className="w-full bg-[#0a0a0a] py-32 px-4 md:px-12 text-white relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1] uppercase">
            Ready to <br/> Reclaim Your Smile?
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-md">
            Schedule your comprehensive consultation today. We offer flexible appointments and premium care tailored to your unique needs.
          </p>
          
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Phone className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Call Us Now</p>
                <p className="text-lg">+965 2200 1234</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Mail className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Send an Email</p>
                <p className="text-lg">hello@luminadental.com</p>
              </div>
            </div>
          </div>
          
          <button className="px-8 py-4 bg-amber-500 text-black font-bold flex items-center gap-3 rounded-full hover:bg-amber-400 transition-colors uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]">
            Book Appointment <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2"
        >
          <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-3xl border border-zinc-800 p-2 bg-zinc-900">
            <div className="w-full h-full rounded-2xl overflow-hidden relative group">
              {/* Optional: Actual Google Maps iframe embed, right now an aesthetic placeholder mapping to Google maps functionality */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-amber-500/20 animate-bounce">
                    <MapPin className="w-7 h-7 text-black" />
                 </div>
                 <div className="bg-black/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-zinc-700 text-center shadow-2xl">
                    <p className="font-bold text-white mb-1">Lumina Dental Clinic</p>
                    <p className="text-sm text-zinc-400">Salem Al Mubarak St, Salmiya<br/>Kuwait City, Kuwait</p>
                    <a href="https://maps.google.com/?q=kuwait+city" target="_blank" className="mt-4 inline-block text-amber-500 text-xs font-bold uppercase tracking-wider hover:text-amber-400 cursor-none">
                      Get Directions
                    </a>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
