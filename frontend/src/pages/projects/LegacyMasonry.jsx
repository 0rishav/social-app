import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, LocateFixed, Hammer, Landmark } from "lucide-react";

const LegacyMasonry = ({ projects }) => {
  return (
    <section className="py-20 px-4 md:px-10 bg-ivory">
      <div className="container mx-auto">
        {/* MASONRY GRID CONTAINER */}
        <motion.div 
          layout 
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  // Status icons mapping
  const StatusIcon = {
    completed: ArrowUpRight,
    ongoing: Hammer,
    heritage: Landmark,
  }[project.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative break-inside-avoid group cursor-none"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative overflow-hidden rounded-sm bg-charcoal">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8 }}
          src={project.image}
          alt={project.name}
          className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
        />

        {/* STATUS BADGE (Top Right) */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`p-2 backdrop-blur-md border border-white/20 rounded-full 
            ${project.status === 'heritage' ? 'bg-gold/80 text-charcoal' : 'bg-charcoal/40 text-gold'}`}>
            <StatusIcon size={16} />
          </div>
        </div>

        {/* INTERACTIVE OVERLAY (The Reveal) */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
          
          <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500 space-y-4">
            {/* Meta Data */}
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-gold/80 font-bold">
              <span>{project.year}</span>
              <div className="w-1 h-1 rounded-full bg-gold/40" />
              <span>{project.location}</span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-serif italic text-ivory leading-none">
              {project.name}
            </h3>

            {/* Divider Line */}
            <div className="w-0 group-hover:w-full h-[1px] bg-gold/50 transition-all duration-700 delay-100" />

            {/* Bottom Details */}
            <div className="flex justify-between items-end">
              <p className="text-[11px] text-ivory/60 max-w-[200px] leading-relaxed italic">
                {project.shortDesc}
              </p>
              <div className="flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-widest">
                Explore <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER (Always Visible Version for Mobile) */}
      <div className="mt-4 md:hidden px-2">
        <h4 className="font-serif italic text-xl text-charcoal">{project.name}</h4>
        <p className="text-[10px] uppercase tracking-widest text-gold">{project.status}</p>
      </div>
    </motion.div>
  );
};

export default LegacyMasonry;