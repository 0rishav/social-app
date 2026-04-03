import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";

const Closure = () => {
  return (
    <section className="relative min-h-screen bg-charcoal flex flex-col pt-20">
      
      {/* --- Upper Section: The Final Hook --- */}
      <div className="flex-1 px-6 md:px-20 lg:px-32 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-6">
              Next Chapter
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-ivory italic leading-[1.1]">
              Every end is a <br /> 
              <span className="text-gold not-italic font-sans font-light">New Foundation.</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            className="text-ivory text-lg md:text-xl max-w-md leading-relaxed font-light"
          >
            Ready to transform your vision into an architectural legacy? Our studio is now accepting selective commissions for 2026.
          </motion.p>

          <motion.button
            whileHover={{ gap: "2rem" }}
            className="flex items-center gap-6 text-gold group border-b border-gold/20 pb-4 pr-10"
          >
            <span className="text-xs uppercase tracking-[0.4em] font-bold">Start Your Journey</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>

        {/* Right: Architectural Visual (Abstract) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-sm"
        >
          <img 
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200" 
            alt="Architectural Abstract" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
          
          {/* Overlay Stats or Small Detail */}
          <div className="absolute bottom-10 left-10 border-l border-gold pl-6">
            <p className="text-ivory text-4xl font-serif italic">12+</p>
            <p className="text-gold text-[8px] uppercase tracking-widest">Global Awards 2026</p>
          </div>
        </motion.div>
      </div>

      {/* --- Final Bottom Strip --- */}
      <div className="px-6 md:px-20 lg:px-32 py-10 flex flex-col md:flex-row justify-between items-center border-t border-white/5">
        <span className="text-[9px] uppercase tracking-[0.4em] text-ivory/20 italic font-serif">
          Crafting Space, Defining Time
        </span>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3 text-ivory/40 hover:text-gold transition-all mt-6 md:mt-0"
        >
          <span className="text-[9px] uppercase tracking-widest">Back to Top</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold">
            <ArrowUpRight size={14} />
          </div>
        </button>
      </div>

    </section>
  );
};

export default Closure;