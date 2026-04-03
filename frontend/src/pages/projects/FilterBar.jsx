import React from "react";
import { motion } from "framer-motion";

const FilterBar = ({ activeFilter, setActiveFilter, projectCounts = {} }) => {
  const filters = [
    { id: "all", label: "Archive", count: projectCounts?.all || 0 },
    { id: "completed", label: "Completed", count: projectCounts?.completed || 0 },
    { id: "ongoing", label: "Ongoing", count: projectCounts?.ongoing || 0 },
    { id: "heritage", label: "Heritage", count: projectCounts?.heritage || 0 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full py-4 md:py-6 px-4 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto bg-charcoal/80 backdrop-blur-xl border border-ivory/10 rounded-full p-1.5 flex items-center max-w-[95vw] md:max-w-none overflow-x-auto no-scrollbar shadow-2xl"
      >
        <div className="flex items-center gap-1 md:gap-2 min-w-max">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="relative px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-colors duration-500 group flex-shrink-0"
              >
                {/* LIQUID SLIDING BACKGROUND */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <span 
                    className={`text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold transition-colors duration-500 ${
                      isActive ? "text-charcoal" : "text-ivory/60 group-hover:text-ivory"
                    }`}
                  >
                    {filter.label}
                  </span>
                  
                  {/* COUNTER BADGE */}
                  <span 
                    className={`text-[7px] md:text-[8px] font-mono transition-colors duration-500 ${
                      isActive ? "text-charcoal/50" : "text-gold/50"
                    }`}
                  >
                    ({filter.count})
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* VERTICAL DIVIDER & STATUS (Desktop Only) */}
        <div className="hidden md:flex items-center">
          <div className="w-[1px] h-4 bg-ivory/10 mx-4" />
          <div className="pr-4 flex items-center gap-2 min-w-max">
             <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
             <span className="text-[9px] text-ivory/30 uppercase tracking-widest italic">Live_Vault</span>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default FilterBar;