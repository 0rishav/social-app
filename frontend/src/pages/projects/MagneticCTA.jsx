import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

const MagneticCTA = () => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Magnetic Effect Logic
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate distance from center of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Pull intensity (Higher number = less pull)
    setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen py-32 bg-charcoal overflow-hidden flex items-center justify-center">
      {/* 1. CINEMATIC BACKGROUND NOISE */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 2. AMBIENT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* SUB-TEXT */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-gold text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-black mb-8"
        >
          Is your vision next?
        </motion.p>

        {/* MAIN HEADING */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[10vw] font-serif italic text-ivory leading-[0.9] mb-16 select-none"
        >
          Let’s build <br /> 
          <span className="text-gold">something timeless.</span>
        </motion.h2>

        {/* MAGNETIC BUTTON CONTAINER */}
        <div 
          className="relative py-20 w-full flex justify-center items-center"
          onMouseMove={handleMouse}
          onMouseLeave={resetPosition}
        >
          <motion.a
            ref={buttonRef}
            href="/contact"
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="group relative w-64 h-64 rounded-full border border-ivory/10 flex items-center justify-center bg-transparent hover:bg-gold transition-colors duration-700"
          >
            {/* Rotating Text/Circle inside button */}
            <div className="absolute inset-0 border border-dashed border-gold/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:scale-110 transition-transform" />
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-ivory group-hover:text-charcoal text-lg font-serif italic transition-colors">Start Inquiry</span>
              <ArrowUpRight className="text-gold group-hover:text-charcoal transition-colors" size={32} strokeWidth={1} />
            </div>
          </motion.a>
        </div>

        {/* 3. FOOTER INFO (Quick Contact) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 w-full max-w-4xl border-t border-ivory/5 pt-12"
        >
          <ContactDetail icon={Mail} label="Inquiries" value="studio@legacy.com" />
          <ContactDetail icon={Phone} label="Studio Line" value="+91 98765 43210" />
          <ContactDetail icon={MapPin} label="The Vault" value="Colaba, Mumbai, India" />
        </motion.div>
      </div>

      {/* DECORATIVE ELEMENT */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <p className="text-ivory/10 text-[12vw] font-serif leading-none select-none">2026</p>
      </div>
    </section>
  );
};

const ContactDetail = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center md:items-start gap-3 group cursor-pointer">
    <div className="flex items-center gap-3">
      <Icon size={14} className="text-gold opacity-50 group-hover:opacity-100 transition-opacity" />
      <span className="text-[9px] uppercase tracking-[0.4em] text-ivory/30">{label}</span>
    </div>
    <p className="text-ivory/70 font-serif italic text-sm group-hover:text-gold transition-colors">{value}</p>
  </div>
);

export default MagneticCTA;