import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MoveRight, Info, HardHat, History } from "lucide-react";

const ArchiveHero = () => {
  const containerRef = useRef(null);
  
  // Mouse Tracking for subtle parallax
  const mouseRef = useRef({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40;
    const y = (clientY / window.innerHeight - 0.5) * 40;
    mouseRef.current = { x, y };
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-charcoal overflow-hidden flex items-center justify-center px-6 md:px-20"
    >
      {/* 1. BACKGROUND KINETIC TEXT (Vertical Ticker) */}
      <div className="absolute left-4 md:left-10 top-0 h-full flex flex-col justify-around pointer-events-none opacity-10 select-none">
        {[1, 2, 3, 4].map((i) => (
          <motion.span 
            key={i}
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-[12vh] font-serif italic text-ivory leading-none tracking-tighter"
          >
            THE_LEGACY_ARCHIVE
          </motion.span>
        ))}
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* 2. LEFT CONTENT: The "Why" & Description */}
        <div className="lg:col-span-4 order-2 lg:order-1 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-gold">
              <div className="w-10 h-[1px] bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-black">Introduction</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-ivory italic leading-snug">
              Mapping the intersection of <span className="text-gold">human emotion</span> and structural precision.
            </h2>
            <p className="text-ivory/50 font-light text-sm leading-relaxed max-w-sm">
              Our archive is more than a list of buildings; it's a journey through materials, heritage, and the future of living. Every line drawn is a legacy in the making.
            </p>
          </motion.div>

          {/* SOPHISTICATED BULLETS */}
          <div className="space-y-8">
            <BulletItem 
              icon={History} 
              title="Heritage" 
              desc="Preserving the soul of ancient structures with modern integrity." 
              delay={0.2}
            />
            <BulletItem 
              icon={HardHat} 
              title="Ongoing" 
              desc="Live sites where precision engineering meets real-world constraints." 
              delay={0.4}
            />
          </div>
        </div>

        {/* 3. CENTER IMAGE: The "Vault Window" */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <motion.div 
            initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full aspect-[4/5] md:w-[80%] overflow-hidden group border border-ivory/10 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              alt="Main Project"
            />
            {/* Image Overlay Label */}
            <div className="absolute bottom-6 left-6 text-ivory">
              <p className="text-[8px] uppercase tracking-[0.3em] opacity-40">Featured Archive</p>
              <p className="font-serif italic text-lg text-gold">The Obsidian Villa, 2025</p>
            </div>
          </motion.div>
        </div>

        {/* 4. RIGHT SIDE: Title & Stats */}
        <div className="lg:col-span-3 order-3 flex flex-col justify-between h-full py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-right"
          >
            <h1 className="text-8xl md:text-[12vw] font-serif text-ivory leading-[0.7] opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default select-none">
              WORKS<span className="text-gold">.</span>
            </h1>
          </motion.div>

          <div className="mt-20 space-y-4 text-right">
             <p className="text-ivory/20 text-[10px] uppercase tracking-[0.6em]">Scroll to Explore</p>
             <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
             >
                <MoveRight className="text-gold rotate-90" size={32} strokeWidth={1} />
             </motion.div>
          </div>
        </div>

      </div>

      {/* Decorative Blueprint Corner */}
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-gold/30 m-6 opacity-40" />
    </section>
  );
};

// Helper Component for Bullets
const BulletItem = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex gap-4 group"
  >
    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-500">
      <Icon size={18} strokeWidth={1} />
    </div>
    <div className="space-y-1">
      <h4 className="text-ivory font-serif italic text-lg uppercase tracking-widest">{title}</h4>
      <p className="text-ivory/40 text-[11px] leading-relaxed max-w-[200px]">{desc}</p>
    </div>
  </motion.div>
);

export default ArchiveHero;