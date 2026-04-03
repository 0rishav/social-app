import React from "react";
import { motion } from "framer-motion";
import { Check, Minus, Info } from "lucide-react";

const ComparisonMatrix = () => {
  const categories = [
    {
      feature: "Site Analysis & Planning",
      residential: "Detailed",
      commercial: "Technical",
      furniture: "Basic",
      landscape: "Full-Scale"
    },
    {
      feature: "3D VR Walkthrough",
      residential: true,
      commercial: true,
      furniture: false,
      landscape: true
    },
    {
      feature: "Bespoke Material Sourcing",
      residential: "Global",
      commercial: "Standard",
      furniture: "Custom",
      landscape: "Natural"
    },
    {
      feature: "On-site Supervision",
      residential: "Daily",
      commercial: "Shift-based",
      furniture: "Installation Only",
      landscape: "Weekly"
    },
    {
      feature: "Post-Project Support",
      residential: "2 Years",
      commercial: "1 Year",
      furniture: "6 Months",
      landscape: "Season-based"
    }
  ];

  return (
    <section className="bg-ivory py-32 px-6 md:px-20 lg:px-40">
      
      {/* --- Section Header --- */}
      <div className="text-center mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold"
        >
          Clarity in Process
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-serif text-charcoal italic mt-4">
          Compare Our Expertise
        </h2>
      </div>

      {/* --- THE MATRIX TABLE --- */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-charcoal/10">
              <th className="py-10 text-left text-charcoal/30 font-sans text-[10px] uppercase tracking-[0.3em]">Scope of Work</th>
              <th className="py-10 text-center font-serif text-xl italic text-charcoal px-4">Residential</th>
              <th className="py-10 text-center font-serif text-xl italic text-charcoal px-4">Commercial</th>
              <th className="py-10 text-center font-serif text-xl italic text-charcoal px-4">Furniture</th>
              <th className="py-10 text-center font-serif text-xl italic text-charcoal px-4">Landscape</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-charcoal/5">
            {categories.map((item, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-gold/[0.03] transition-colors"
              >
                {/* Feature Name */}
                <td className="py-8 flex items-center gap-3">
                  <span className="text-charcoal font-sans text-xs uppercase tracking-widest font-bold group-hover:text-gold transition-colors">
                    {item.feature}
                  </span>
                  <Info size={12} className="text-charcoal/20 cursor-help" />
                </td>

                {/* Data Cells */}
                {[item.residential, item.commercial, item.furniture, item.landscape].map((val, i) => (
                  <td key={i} className="py-8 text-center">
                    {typeof val === "boolean" ? (
                      <div className="flex justify-center">
                        {val ? (
                          <Check size={18} className="text-gold" />
                        ) : (
                          <Minus size={18} className="text-charcoal/20" />
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] uppercase tracking-widest text-charcoal/60 font-medium">
                        {val}
                      </span>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- BOTTOM NOTE --- */}
      <div className="mt-16 flex flex-col md:flex-row justify-between items-center py-10 border-t border-charcoal/10 gap-6">
        <p className="text-charcoal/40 text-[10px] uppercase tracking-widest max-w-sm">
          *Custom packages are available upon request based on project scale and architectural complexity.
        </p>
        <button className="group flex items-center gap-4 text-charcoal hover:text-gold transition-colors">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black underline underline-offset-8">Download Full PDF</span>
          <div className="w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-gold">
            <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
               ↓
            </motion.div>
          </div>
        </button>
      </div>

    </section>
  );
};

export default ComparisonMatrix;