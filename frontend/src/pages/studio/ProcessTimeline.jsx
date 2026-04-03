import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Pen, Box, Hammer, Key } from "lucide-react";

const steps = [
  {
    title: "Concept Mapping",
    desc: "Initial sketches and psychological profiling of the space. We map the soul before the soil.",
    icon: <Pen size={20} />,
    tag: "Phase_01",
  },
  {
    title: "Precision Blueprint",
    desc: "Translating vision into technical accuracy. Every millimeter is calculated for structural legacy.",
    icon: <Box size={20} />,
    tag: "Phase_02",
  },
  {
    title: "Brutal Construction",
    desc: "The raw transformation. Honoring materials like concrete and steel in their purest form.",
    icon: <Hammer size={20} />,
    tag: "Phase_03",
  },
  {
    title: "Final Handover",
    desc: "The transition from a project to a home. We don't just give keys; we pass on a legacy.",
    icon: <Key size={20} />,
    tag: "Phase_04",
  },
];

const ProcessTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] py-32 px-6 md:px-20 overflow-hidden"
    >
      <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[25vw] font-black text-[#FDFCF8] whitespace-nowrap">
          TIMELINE
        </h2>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#FDFCF8]/10 -translate-x-1/2">
          <motion.div
            style={{ scaleY }}
            className="w-full h-full bg-[#C5A059] origin-top shadow-[0_0_15px_rgba(197,160,89,0.5)]"
          />
        </div>

        <div className="space-y-40 md:space-y-64 relative z-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-[45%] space-y-6"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#C5A059] font-mono text-xs tracking-[0.3em]">
                    {step.tag}
                  </span>
                  <div className="h-[1px] w-12 bg-[#C5A059]/30" />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif italic text-[#FDFCF8]">
                  {step.title}
                </h3>
                <p className="text-[#FDFCF8]/40 leading-relaxed font-light text-lg italic">
                  "{step.desc}"
                </p>
              </motion.div>

              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 bg-[#0A0A0A] border border-[#C5A059] rounded-full flex items-center justify-center z-20 shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                <div className="text-[#C5A059] scale-75">{step.icon}</div>
              </div>

              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-40 text-center relative z-10"
      >
        <p className="text-[#FDFCF8]/30 text-[10px] uppercase tracking-[0.5em] mb-4">
          Ready_to_Begin?
        </p>
        <button className="text-[#C5A059] text-2xl font-serif italic hover:tracking-widest transition-all duration-500">
          Let's draw the first line together.
        </button>
      </motion.div>
    </section>
  );
};

export default ProcessTimeline;
