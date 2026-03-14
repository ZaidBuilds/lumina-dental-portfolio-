import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { HeroIntro } from "@/components/HeroIntro";
import { CallToAction } from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white relative selection:bg-white selection:text-black">
      <HeroIntro />
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>
      
      <About />
      <Stats />
      <Projects />
      <Testimonials />
      <CallToAction />
      
      {/* Footer */}
      <footer className="w-full bg-[#050505] py-16 border-t border-zinc-900 border-opacity-50 text-center relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm font-medium gap-6">
          <p>&copy; {new Date().getFullYear()} Lumina Dental Clinic. All rights reserved.</p>
          <div className="flex bg-zinc-900 p-2 rounded-full border border-zinc-800 gap-2 mt-4 md:mt-0 px-4 py-2">
            <a href="https://instagram.com" target="_blank" className="hover:text-amber-500 transition-colors uppercase tracking-[0.2em] font-bold text-xs">Instagram</a>
            <span className="text-zinc-700">|</span>
            <a href="https://facebook.com" target="_blank" className="hover:text-amber-500 transition-colors uppercase tracking-[0.2em] font-bold text-xs">Facebook</a>
            <span className="text-zinc-700">|</span>
            <a href="https://linkedin.com" target="_blank" className="hover:text-amber-500 transition-colors uppercase tracking-[0.2em] font-bold text-xs">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
