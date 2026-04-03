import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ContactHero = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };
    updateClock();
    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  const cubicVariants = {
    initial: { rotateX: 90, opacity: 0, y: 50 },
    animate: (i) => ({
      rotateX: 0,
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const titleWords = ["Start", "a", "Conversation", "with", "us."];

  return (
    <section className="relative h-[80vh] w-full bg-[#FDFCF8] flex items-center overflow-hidden px-6 md:px-20 border-b border-black/5">
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* FIX: perspective moved to inline style to avoid div errors */}
        <div 
          className="md:col-span-9 flex flex-wrap gap-x-4 gap-y-2"
          style={{ perspective: "1000px" }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="initial"
              animate="animate"
              variants={cubicVariants}
              className={`text-6xl md:text-[8vw] font-serif italic text-[#1A1A1A] leading-none origin-bottom 
                ${word === "Conversation" ? "text-[#C5A059] font-normal non-italic" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="md:col-span-3 flex flex-col items-center md:items-end justify-center h-full relative"
        >
          <div className="relative w-40 h-40 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-[#C5A059]/30 rounded-full"
            />
            <div className="text-center z-10 bg-[#FDFCF8] p-4 rounded-full shadow-inner border border-black/5">
              <p className="text-[9px] uppercase tracking-[0.5em] text-black/40 mb-1">Local_Time</p>
              <p className="text-2xl font-serif italic text-[#1A1A1A] whitespace-nowrap">{time}</p>
              <p className="text-[8px] uppercase tracking-widest text-[#C5A059] mt-1">MUMBAI_STUDIO</p>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="text-black/60 mt-10 text-right text-sm font-light leading-relaxed max-w-[200px] hidden md:block"
          >
            A legacy is built one dialogue at a time. Tell us about your vision.
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[#C5A059]/20 m-6 opacity-30" />
    </section>
  );
};

export default ContactHero;