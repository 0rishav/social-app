import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  Maximize2,
  Calendar,
  Quote,
} from "lucide-react";
import { masterServices } from "../data/data";
import LegacyLoader from "../../components/LegacyLoader";

const StatItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center md:items-start gap-2">
    <div className="flex items-center gap-2 text-gold">
      <Icon size={14} strokeWidth={1.5} />
      <span className="text-[9px] uppercase tracking-[0.4em] font-black text-charcoal/40">
        {label}
      </span>
    </div>
    <span className="text-[12px] font-serif italic text-charcoal whitespace-nowrap">
      {value}
    </span>
  </div>
);

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const containerRef = useRef(null);

  const data = masterServices.find((item) => item.id === id);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) return <LegacyLoader />;

  return (
    <main ref={containerRef} className="bg-ivory min-h-screen overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen overflow-hidden bg-charcoal">
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img 
            src={data.mainImg} 
            className="w-full h-full object-cover opacity-50"
            alt={data.categoryName}
          />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-charcoal via-transparent to-transparent">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mb-10"
          >
            <Link to="/services" className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.4em] group">
              <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
              Expertise Index
            </Link>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-[10vw] font-serif text-ivory italic leading-[0.8]"
            >
              {data.categoryName}
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gold/80 mt-8 max-w-xl text-lg font-light italic tracking-wide"
          >
            — {data.heroTeaser}
          </motion.p>
        </div>
      </section>

      {/* --- PROJECTS LOOP --- */}
      <section className="py-32">
        {data.subProjects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </section>

      {/* --- NEXT NAVIGATION FOOTER --- */}
      <section className="h-[70vh] flex flex-col items-center justify-center border-t border-charcoal/5 bg-charcoal">
        <motion.div
          whileInView={{ y: [50, 0], opacity: [0, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gold/30 text-[10px] uppercase tracking-[0.5em] mb-12 font-bold">Evolution Continues</p>
          <Link 
            to={`/services/${masterServices[(masterServices.findIndex(s => s.id === id) + 1) % masterServices.length].id}`}
            className="group relative inline-block"
          >
            <span className="text-5xl md:text-[9vw] font-serif italic text-ivory group-hover:text-gold transition-all duration-700 leading-none">
               Next Legacy
            </span>
            <div className="w-0 h-[1px] bg-gold mx-auto mt-6 group-hover:w-full transition-all duration-1000" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

// --- INDIVIDUAL PROJECT SECTION ---
const ProjectSection = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgSkew = useTransform(scrollYProgress, [0, 1], [3, -3]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <div ref={ref} className="container mx-auto px-6 md:px-20 mb-[40vh] relative">
      
      {/* Background Counter */}
      <motion.span 
        style={{ y: textY }}
        className="text-[20vw] font-serif text-charcoal/[0.03] absolute -top-20 -left-10 pointer-events-none select-none"
      >
        0{index + 1}
      </motion.span>

      <div className="flex flex-col gap-12 mb-16 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-8xl font-serif text-charcoal italic leading-tight">
            {project.projectName}
          </h2>
          <p className="text-gold font-bold text-[10px] uppercase tracking-[0.5em] mt-4">
            {project.tagline}
          </p>
        </div>
      </div>

      <div className={`flex flex-col lg:flex-row gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Visual Content */}
        <motion.div 
          style={{ skewY: imgSkew }}
          className="lg:w-3/5 relative group"
        >
          <div className="overflow-hidden aspect-video shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1 }}
              src={project.images[0]} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>

          {/* DYNAMIC STATS CARD (Using StatItem) */}
          <div className="absolute -bottom-12 -right-6 md:right-10 bg-white p-8 shadow-2xl border border-charcoal/5 z-20">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
               <StatItem icon={Star} label="Grade" value={project.stats.rating} />
               <StatItem icon={MapPin} label="Site" value={project.stats.location} />
               <StatItem icon={Maximize2} label="Scale" value={project.stats.area} />
               <StatItem icon={Calendar} label="Dated" value={project.stats.year} />
             </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="lg:w-2/5 space-y-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl text-charcoal/80 font-light leading-relaxed italic border-l-2 border-gold/20 pl-8"
          >
            {project.description}
          </motion.p>
          
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-charcoal/30">Material Palette</h4>
            <div className="flex flex-wrap gap-3">
              {project.materials.map((m, i) => (
                <span key={i} className="px-5 py-2 border border-charcoal/10 rounded-full text-[9px] uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-500">
                  {m.name}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-charcoal p-10 relative overflow-hidden group">
            <Quote className="absolute -top-4 -right-4 text-white/5 w-24 h-24" />
            <p className="text-ivory/80 italic font-serif text-lg leading-relaxed mb-6 relative z-10">
              "{project.clientVerdict.text}"
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <img src={project.clientVerdict.avatar} className="w-10 h-10 rounded-full border border-gold" alt="Client" />
              <p className="text-gold text-[10px] uppercase tracking-widest font-bold">{project.clientVerdict.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;