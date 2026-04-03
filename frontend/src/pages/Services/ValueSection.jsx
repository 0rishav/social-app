import React from "react";
import { motion } from "framer-motion";
import { Leaf, Cpu, Wind, ShieldCheck, Droplets, Zap } from "lucide-react";

const ValuesSection = () => {
  return (
    <section className="bg-ivory py-32 px-6 md:px-20 lg:px-40 overflow-hidden">
      {/* --- Section Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
            Ethical Foundation
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-charcoal italic leading-none">
            Built for{" "}
            <span className="not-italic font-sans font-light text-gold">
              2050.
            </span>
          </h2>
        </div>
        <p className="text-charcoal/40 text-xs uppercase tracking-widest max-w-[200px] leading-relaxed border-l border-gold pl-6">
          Sustainability is not a feature; it's our core structural DNA.
        </p>
      </div>

      {/* --- THE FEATURE WALL (Asymmetric Layout) --- */}
      <div className="grid lg:grid-cols-12 gap-6 h-auto lg:h-[800px]">
        {/* 1. BIG CARD: ECO-CENTRIC MATERIALS (Left - 7 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 relative group overflow-hidden bg-charcoal rounded-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            alt="Natural Materials"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

          <div className="relative z-10 h-full p-10 flex flex-col justify-end">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gold rounded-full text-charcoal">
                <Leaf size={24} />
              </div>
              <h3 className="text-3xl md:text-5xl font-serif text-ivory italic">
                Bio-Luxe Sourcing
              </h3>
            </div>
            <p className="text-ivory/60 text-lg max-w-md font-light mb-8">
              We exclusively utilize materials that breathe. From reclaimed
              teakwood to local lime-plaster, every stone we select is
              Earth-certified and ethically sourced.
            </p>
            <div className="flex gap-10 border-t border-white/10 pt-8">
              <div>
                <p className="text-gold font-bold text-2xl">85%</p>
                <p className="text-ivory/40 text-[9px] uppercase tracking-widest">
                  Local Sourced
                </p>
              </div>
              <div>
                <p className="text-gold font-bold text-2xl">Zero</p>
                <p className="text-ivory/40 text-[9px] uppercase tracking-widest">
                  Toxic VOCs
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. RIGHT COLUMN: TECH STACK (Right - 5 Columns) */}
        <div className="lg:col-span-5 grid grid-rows-2 gap-6">
          {/* Top Mini Card: Smart Integration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gold p-10 flex flex-col justify-between group"
          >
            <Cpu
              size={40}
              strokeWidth={1}
              className="text-charcoal group-hover:rotate-12 transition-transform"
            />
            <div>
              <h4 className="text-2xl font-serif text-charcoal mb-4">
                Neural Home Automation
              </h4>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                Seamless AI ecosystems that calibrate lighting and climate to
                align with your rhythm. Intelligent living, intuitively
                redefined.
              </p>
            </div>
          </motion.div>

          {/* Bottom Mini Card: Energy & Water */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-charcoal/5 border border-charcoal/10 p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <Zap size={32} className="text-gold" />
              <div className="text-right">
                <span className="block text-2xl font-serif text-charcoal italic">
                  Eco-Flow
                </span>
                <span className="text-[10px] text-charcoal/40 uppercase tracking-widest">
                  Resource Management
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Droplets size={16} className="text-gold" />
                <span className="text-xs font-bold text-charcoal/60 uppercase tracking-tighter">
                  Greywater Recycling System
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Wind size={16} className="text-gold" />
                <span className="text-xs font-bold text-charcoal/60 uppercase tracking-tighter">
                  Passive Solar Cooling
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- BOTTOM ROW: THE TRUST BADGE --- */}
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="mt-20 py-10 border-y border-charcoal/10 flex flex-wrap justify-between items-center gap-10"
      >
        <div className="flex items-center gap-4 text-charcoal/40 uppercase text-[10px] tracking-[0.4em]">
          <ShieldCheck size={20} className="text-gold" />
          Certified Sustainable Practice 2026
        </div>
        <div className="flex gap-16">
          <span className="text-charcoal font-serif italic text-xl underline decoration-gold/30">
            LEED Platinum
          </span>
          <span className="text-charcoal font-serif italic text-xl underline decoration-gold/30">
            GRIHA 5-Star
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default ValuesSection;
