import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ArrowRight } from "lucide-react";

const team = [
  {
    id: "01",
    name: "Aryan Mehra",
    role: "Lead Architect",
    specialty: "Brutalist Minimalism",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000",
  },
  {
    id: "02",
    name: "Sanya Malhotra",
    role: "Sustainability Head",
    specialty: "Biophilic Design",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000",
  },
  {
    id: "03",
    name: "Vikram Rathore",
    role: "Heritage Restorer",
    specialty: "Indo-Gothic Restoration",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000",
  }
];

const Masterminds = () => {
  return (
    <section className="relative bg-[#0A0A0A] py-32 px-6 md:px-20 overflow-hidden">
      
      {/* SECTION HEADER */}
      <div className="mb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-[1px] bg-[#C5A059]" />
          <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.5em] font-black">Leadership_Core</span>
        </motion.div>
        <h2 className="text-6xl md:text-[8vw] font-serif italic text-[#FDFCF8] leading-none">
          The <span className="text-[#C5A059]">Masterminds</span>
        </h2>
      </div>

      {/* TEAM VERTICAL STACK - NO FATTING GUARANTEED */}
      <div className="space-y-40 md:space-y-64 max-w-7xl mx-auto">
        {team.map((member, index) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
          >
            {/* IMAGE BLOCK */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] group">
              <div className="absolute inset-0 border border-[#C5A059]/20 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
              <div className="relative w-full h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            {/* INFO BLOCK */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-2">
                <p className="text-[#C5A059] font-mono text-sm tracking-widest uppercase">Member_{member.id}</p>
                <h3 className="text-4xl md:text-6xl font-serif italic text-[#FDFCF8]">{member.name}</h3>
                <p className="text-[#FDFCF8]/40 text-lg uppercase tracking-widest">{member.role}</p>
              </div>

              <div className="h-[1px] w-full bg-[#C5A059]/10" />

              <div className="flex items-start gap-4">
                <Award className="text-[#C5A059] shrink-0" size={20} />
                <p className="text-[#FDFCF8]/60 leading-relaxed max-w-xs font-light tracking-wide">
                  Specializing in {member.specialty}, bringing architectural narratives to life with structural precision.
                </p>
              </div>

              <motion.button 
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-black group"
              >
                Full Portfolio 
                <div className="w-8 h-[1px] bg-[#C5A059] group-hover:w-16 transition-all" />
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DECORATIVE BACKGROUND TEXT */}
      <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-[0.02] rotate-90">
        <h2 className="text-[20vw] font-black text-[#FDFCF8] whitespace-nowrap">ARCHITECT_CORE</h2>
      </div>
    </section>
  );
};

export default Masterminds;