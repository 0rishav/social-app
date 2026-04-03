import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Layers, Award, ChevronRight } from "lucide-react";

const methods = [
  {
    step: "01",
    title: "Psychological Mapping",
    icon: Search,
    desc: "We don't just measure dimensions; we decode the psychology of your lifestyle—from how your day begins to where it finds its peace.",
    detail: "Behavioral Analysis | Space Optimization | Routine Syncing"
  },
  {
    step: "02",
    title: "The Material Audit",
    icon: Layers,
    desc: "Sourcing world-class textures. We select stones and fabrics not just for their aesthetic, but for their durability and 'aging grace'.",
    detail: "Sustainable Sourcing | Texture Grading | Longevity Testing"
  },
  {
    step: "03",
    title: "Precision Engineering",
    icon: PenTool,
    desc: "Drafting with military-grade accuracy. Our designs allow no margin for error, ensuring a seamless union of aesthetics and structural integrity.",
    detail: "BIM Modeling | Tolerance Checks | Structural Safety"
  },
  {
    step: "04",
    title: "The Final Handover",
    icon: Award,
    desc: "We don't just hand over keys; we entrust you with a legacy—complete with curated final styling and comprehensive maintenance blueprints.",
    detail: "Curated Styling | Asset Documentation | 2-Year Warranty"
  }
];

const Methodology = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-charcoal py-32 px-6 md:px-20 lg:px-40 min-h-screen flex flex-col justify-center relative overflow-hidden">
      
      {/* --- Section Background Text --- */}
      <div className="absolute top-10 left-10 text-ivory/5 text-[10vw] font-serif italic pointer-events-none uppercase">
        Process
      </div>

      <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* --- LEFT: THE CONTENT DISPLAY --- */}
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">Step — {methods[activeStep].step}</span>
            <div className="h-20 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={methods[activeStep].title}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="text-5xl md:text-7xl font-serif text-ivory italic"
                >
                  {methods[activeStep].title}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <p className="text-ivory/60 text-xl font-light leading-relaxed max-w-md">
                {methods[activeStep].desc}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {methods[activeStep].detail.split(" | ").map((tag, i) => (
                  <span key={i} className="px-4 py-2 border border-ivory/10 rounded-full text-[10px] text-gold uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Custom Navigation Tabs */}
          <div className="flex gap-4 pt-10 border-t border-ivory/5">
            {methods.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-1 cursor-pointer transition-all duration-500 ${activeStep === i ? "w-20 bg-gold" : "w-8 bg-ivory/20"}`}
              />
            ))}
          </div>
        </div>

        {/* --- RIGHT: THE RADIAL DIAL (The Unique Part) --- */}
        <div className="relative aspect-square flex items-center justify-center">
          
          {/* Main Central Circle */}
          <motion.div 
            animate={{ rotate: activeStep * 90 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="w-72 h-72 md:w-[450px] md:h-[450px] border border-ivory/5 rounded-full relative"
          >
            {methods.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`absolute w-16 h-16 md:w-20 cursor-pointer md:h-20 rounded-full flex items-center justify-center transition-all duration-500
                    ${activeStep === i ? "bg-gold text-charcoal scale-125 shadow-[0_0_30px_rgba(212,175,55,0.3)]" : "bg-charcoal border border-ivory/10 text-ivory hover:border-gold"}
                  `}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${i * -90 - (activeStep * 90)}deg) translateY(${window.innerWidth < 768 ? -140 : -225}px)`
                  }}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Inner Static Core */}
          <div className="absolute w-32 h-32 md:w-56 md:h-56 bg-ivory/5 rounded-full flex items-center justify-center backdrop-blur-3xl border border-ivory/10">
            <div className="text-center">
              <p className="text-gold text-[8px] uppercase tracking-widest mb-1">Method</p>
              <p className="text-ivory font-serif italic text-3xl">0{activeStep + 1}</p>
            </div>
          </div>
          
          {/* Pulsing Ring Animation */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-80 h-80 md:w-[500px] md:h-[500px] border border-gold/5 rounded-full pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
};

export default Methodology;