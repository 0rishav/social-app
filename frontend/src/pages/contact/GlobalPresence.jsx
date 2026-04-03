import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Globe } from "lucide-react";

const GlobalPresence = () => {
  return (
    <section className="relative h-[70vh] w-full bg-[#1A1A1A] overflow-hidden">
      {/* 1. THE MAP IMAGE / WRAPPER */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full grayscale contrast-125 brightness-50 opacity-40"
      >
        {/* Replace this with a real Google Maps static image or a styled Mapbox integration */}
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066" 
          alt="Mumbai Map" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 2. OVERLAY GRADIENT (Taaki form se smoothly merge ho) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF8] via-transparent to-black/80" />

      {/* 3. THE GOLD PULSE MARKER (Actual Location) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative flex items-center justify-center">
          {/* Animated Rings */}
          <motion.div 
            animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-20 h-20 border border-[#C5A059] rounded-full"
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            className="absolute w-20 h-20 border border-[#C5A059] rounded-full"
          />
          
          {/* Main Pin */}
          <div className="bg-[#C5A059] p-4 rounded-full shadow-[0_0_30px_rgba(197,160,89,0.5)]">
            <MapPin size={24} className="text-[#1A1A1A]" />
          </div>
        </div>
      </div>

      {/* 4. COORDINATE DATA (Floating UI) */}
      <div className="absolute bottom-12 left-6 md:left-20 z-30">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <Navigation size={14} className="text-[#C5A059] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#FDFCF8]/40 font-mono">
              18.9220° N, 72.8347° E
            </span>
          </div>
          <h4 className="text-2xl md:text-4xl font-serif italic text-[#FDFCF8]">
            Visit the Atelier
          </h4>
        </motion.div>
      </div>

      {/* 5. "BACK TO TOP" OR SECONDARY NAV */}
      <div className="absolute bottom-12 right-6 md:right-20 z-30">
        <motion.button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -5 }}
          className="flex flex-col items-center gap-3 group"
        >
          <div className="w-[1px] h-12 bg-[#C5A059]/30 group-hover:h-16 transition-all duration-500" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] rotate-90 origin-left mt-8">Scroll_Up</span>
        </motion.button>
      </div>

      {/* TOP LABEL */}
      <div className="absolute top-12 left-6 md:left-20 z-30">
        <div className="flex items-center gap-4">
          <Globe size={16} className="text-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#1A1A1A]/40 font-black">Global_Footprint</span>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;