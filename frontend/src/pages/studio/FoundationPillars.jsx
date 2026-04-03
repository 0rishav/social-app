import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Layers, Leaf } from "lucide-react";

const pillars = [
  {
    id: "01",
    title: "Psychological Mapping",
    desc: "Understanding the inhabitant's subconscious before laying the first brick. Space is a reflection of the mind.",
    icon: <PenTool size={24} strokeWidth={1} />,
    img: "https://images.unsplash.com/photo-1763588122480-a0825618c781?q=80&w=765",
  },
  {
    id: "02",
    title: "Material Integrity",
    desc: "Honoring the raw state of concrete, basalt, and timber. We don't hide materials; we celebrate their brutal honesty.",
    icon: <Layers size={24} strokeWidth={1} />,
    img: "https://plus.unsplash.com/premium_photo-1712811339002-c69676d7cc22?q=80&w=1332",
  },
  {
    id: "03",
    title: "Eco-Engineering",
    desc: "Sustainability is not an add-on; it's the foundation. Net-zero structures that breathe with the environment.",
    icon: <Leaf size={24} strokeWidth={1} />,
    img: "https://images.unsplash.com/photo-1715199281917-5e5b20d5c038?q=80&w=1171",
  },
];

const FoundationalPillars = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="min-h-screen md:h-screen w-full bg-[#0A0A0A] flex flex-col md:flex-row overflow-hidden border-t border-[#C5A059]/10">
      {pillars.map((pillar, index) => {
        const isActive = expanded === index;

        return (
          <motion.div
            key={pillar.id}
            onClick={() => setExpanded(index)}
            onMouseEnter={() => window.innerWidth > 768 && setExpanded(index)}
            animate={{
              // Mobile: Height changes | Desktop: Width changes
              width:
                window.innerWidth > 768 ? (isActive ? "60%" : "20%") : "100%",
              height:
                window.innerWidth > 768 ? "100%" : isActive ? "50vh" : "15vh",
              backgroundColor: isActive ? "#111" : "#0A0A0A",
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative border-b md:border-b-0 md:border-r border-[#C5A059]/10 flex flex-col justify-between p-6 md:p-10 cursor-pointer overflow-hidden group"
          >
            {/* BACKGROUND IMAGE REVEAL */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.25, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-0"
                >
                  <img
                    src={pillar.img}
                    alt={pillar.title}
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* TOP SECTION: ID & ICON */}
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[#C5A059] font-mono text-lg md:text-xl">
                {pillar.id}
              </span>
              <div
                className={`p-2.5 md:p-3 rounded-full border border-[#C5A059]/20 text-[#C5A059] transition-transform duration-500 ${isActive ? "rotate-0" : "rotate-45"}`}
              >
                {pillar.icon}
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="relative z-10 flex flex-col h-full justify-center md:justify-end md:pb-12">
              <AnimatePresence mode="wait">
                {!isActive ? (
                  // Mobile pe title hamesha dikhega, desktop pe rotate hoga
                  <motion.h3
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FDFCF8]/40 text-2xl md:text-4xl font-serif italic md:-rotate-90 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 whitespace-nowrap tracking-widest uppercase"
                  >
                    {pillar.title.split(" ")[0]}
                  </motion.h3>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 md:space-y-6 max-w-md"
                  >
                    <h3 className="text-3xl md:text-7xl font-serif italic text-[#FDFCF8] leading-tight">
                      {pillar.title.split(" ")[0]}{" "}
                      <br className="hidden md:block" />
                      <span className="text-[#C5A059]">
                        {pillar.title.split(" ")[1]}
                      </span>
                    </h3>
                    <p className="text-[#FDFCF8]/60 text-sm md:text-lg font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                    <motion.button className="flex items-center gap-3 text-[#C5A059] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black pt-2 md:pt-4">
                      Deep_Dive{" "}
                      <div className="w-8 md:w-12 h-[1px] bg-[#C5A059]" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOTTOM SECTION: METADATA (Hidden on small mobile) */}
            <div className="relative z-10 hidden md:block">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#FDFCF8]/30">
                Structural_Pillar_Alpha
              </p>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default FoundationalPillars;
