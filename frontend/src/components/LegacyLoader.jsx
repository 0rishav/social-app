import React from "react";
import { motion } from "framer-motion";

const LegacyLoader = () => {
  return (
    <div className="h-screen w-full bg-charcoal flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* 1. BACKGROUND GRID (Architectural Graph Paper Feel) */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#f4f1ea 1px, transparent 1px), linear-gradient(90deg, #f4f1ea 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* 2. THE ANIMATED SVG LOGO/SHAPE */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-8"
        >
          {/* External Square Frame (Drawing itself) */}
          <motion.path
            d="M10 10 H90 V90 H10 Z"
            stroke="#d4af37" // Gold
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Inner Abstract "L" or Building Shape */}
          <motion.path
            d="M40 30 V70 H60"
            stroke="#f4f1ea" // Ivory
            strokeWidth="2"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          />
          
          {/* Moving "Drafting" Point */}
          <motion.circle
            cx="40"
            cy="30"
            r="2"
            fill="#d4af37"
            animate={{
              cx: [40, 40, 60],
              cy: [30, 70, 70],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          />
        </svg>

        {/* 3. TEXT & PROGRESS */}
        <div className="overflow-hidden h-8">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-gold font-serif italic text-xl tracking-[0.3em] uppercase"
          >
            Constructing Legacy
          </motion.h2>
        </div>

        {/* 4. PERCENTAGE COUNTER (Visual Fake Progress for Polish) */}
        <motion.div className="mt-4 flex items-center gap-4">
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gold"
            />
          </div>
          <span className="text-[10px] font-mono text-ivory/40 tracking-widest">
            ESTABLISHING_PRECISION
          </span>
        </motion.div>
      </div>

      {/* Subtle Bottom Quote */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 text-[9px] text-ivory uppercase tracking-[0.5em]"
      >
        © 2026 Studio Legacy • Architecture & Beyond
      </motion.p>
    </div>
  );
};

export default LegacyLoader;