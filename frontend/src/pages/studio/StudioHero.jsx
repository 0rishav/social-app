import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const StudioHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // REVEAL ANIMATION: Text niche se upar reveal hoga scroll ke saath
  // Desktop aur Mobile dono pe smooth chalega
  const textReveal = useTransform(
    scrollYProgress,
    [0, 0.3], // Pehle 30% scroll mein text reveal ho jayega
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // PARALLAX EFFECT: Image thoda slow move hogi depth dene ke liye
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // BACKGROUND TEXT PARALLAX: Peeche wala "STUDIO" text ulta move karega
  const xStudio = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative h-[200vh] md:h-[300vh] bg-[#0A0A0A] text-[#FDFCF8] overflow-x-hidden">
      
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT PANEL: THE VISUAL ANCHOR */}
        <div className="relative w-full md:w-1/2 h-[40vh] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-[#C5A059]/10">
          <motion.div 
            style={{ scale: scaleImage, y: yImage }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
              className="w-full h-full object-cover grayscale brightness-50"
              alt="Architecture Monolith"
            />
          </motion.div>
          
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 overflow-hidden">
            <motion.p 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] md:tracking-[1em] text-[#C5A059] font-black"
            >
              The_Studio_Perspective
            </motion.p>
          </div>
        </div>

        {/* RIGHT PANEL: THE MANIFESTO CONTENT */}
        <div className="relative w-full md:w-1/2 h-[60vh] md:h-full flex flex-col justify-center px-6 md:px-20">
          
          <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 md:gap-4 font-mono text-xs md:text-sm">
            <span className="text-[#C5A059]">01</span>
            <motion.div 
              style={{ scaleX: scrollYProgress }} 
              className="w-8 md:w-12 h-[1px] bg-[#C5A059] origin-left" 
            />
            <span className="text-[#FDFCF8]/30">04</span>
          </div>

          <div className="space-y-6 md:space-y-12">
            {/* YE RAHA TERA ANIMATION BHAI */}
            <motion.h2 
              className="text-4xl md:text-7xl font-serif italic leading-[1.1]"
              style={{ clipPath: textReveal }}
            >
              Building <span className="text-[#C5A059]">Silences</span>, <br />
              Structuring <span className="text-[#C5A059]">Legacies.</span>
            </motion.h2>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2, duration: 1 }}
               className="max-w-md space-y-6 md:space-y-8"
            >
              <p className="text-base md:text-xl text-[#FDFCF8]/60 font-light leading-relaxed italic border-l border-[#C5A059] pl-4 md:pl-8">
                "We don't just occupy space; we interrogate it. Our studio is an altar for raw material and precision engineering."
              </p>
              
              <div className="flex items-center gap-4 md:gap-6 pt-2 md:pt-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#C5A059]/50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#C5A059] rounded-full animate-pulse" />
                </div>
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold text-[#C5A059]">Active_In_Mumbai</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CENTER DECORATIVE LINE */}
        <motion.div 
          style={{ scaleY: scrollYProgress }}
          className="absolute left-1/2 top-0 w-[1px] h-full bg-[#C5A059] origin-top hidden md:block"
        />
      </div>

      {/* BACKGROUND TEXT OVERLAY - With Parallax */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none overflow-hidden text-[#C5A059]">
        <motion.h1 
          style={{ x: xStudio }}
          className="text-[35vw] font-black leading-none whitespace-nowrap"
        >
          STUDIO
        </motion.h1>
      </div>
    </section>
  );
};

export default StudioHero;