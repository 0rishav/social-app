import React from "react";
import { motion } from "framer-motion";

const Philosophy = () => {
  const text = "We don't just design rooms; we curate environments that resonate with the human soul. Every material, every shadow, and every line is a deliberate choice to elevate your daily experience of living.";
  const words = text.split(" ");

  return (
    <section className="relative min-h-screen bg-charcoal py-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* LEFT: Image Section with Scroll Reveal */}
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] w-full bg-charcoal/50 overflow-hidden group shadow-2xl"
        >
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury Interior"
            className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 transition-all duration-1000"
          />
          
          {/* Overlay Tag */}
          <div className="absolute bottom-10 left-10 text-white z-10">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold border-b border-gold/50 pb-2">
              The Studio Philosophy
            </p>
          </div>
        </motion.div>

        {/* RIGHT: Word-by-Word Reveal */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.1, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.04,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-serif text-ivory mr-4 mb-3 leading-[1.1]"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Gold Divider Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 1, duration: 1.2 }}
            className="h-[1px] bg-gold/40 my-10"
          />

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-ivory font-sans text-[11px] uppercase tracking-[0.3em] leading-relaxed max-w-sm"
          >
            Guided by heritage, inspired by modernism. We craft timeless
            narratives through architecture and emotion.
          </motion.p>
        </div>
      </div>

      {/* Large Background Number */}
      <div className="absolute bottom-0 right-10 text-gold/5 font-serif italic text-[20vw] select-none pointer-events-none translate-y-1/4">
        01
      </div>
    </section>
  );
};

export default Philosophy;