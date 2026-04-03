import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Landmark, History, Quote } from "lucide-react";

const heritageProjects = [
  {
    id: 1,
    title: "The Rajputana Palace",
    year: "1850",
    location: "Jaipur, Rajasthan",
    img: "https://images.unsplash.com/photo-1670254812851-e59013163aee?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    story:
      "Restoring the intricate 'Jali' work and lime-plastered courtyards using 200-year-old techniques.",
  },
  {
    id: 2,
    title: "Victorian Dockyard",
    year: "1892",
    location: "South Mumbai",
    img: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070",
    story:
      "Structural retrofitting of British-era cast iron pillars while maintaining the industrial gothic aesthetic.",
  },
  {
    id: 3,
    title: "The Chettinad Mansion",
    year: "1910",
    location: "Karaikudi, TN",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
    story:
      "Reviving Burma teak columns and handmade Athangudi tiles for a sustainable luxury stay.",
  },
];

const HeritageSpotlight = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Horizontal move logic: -100% * (items - 1)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-charcoal">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* BACKGROUND SECTION TITLE (Parallax) */}
        <motion.div
          style={{ x: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
          className="absolute top-20 left-0 whitespace-nowrap opacity-[0.03] select-none pointer-events-none"
        >
          <span className="text-[30vh] font-serif italic text-ivory">
            HERITAGE_RESTORED_
          </span>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-20 px-[10vw]">
          {heritageProjects.map((project) => (
            <div
              key={project.id}
              className="relative w-[80vw] md:w-[60vw] h-[70vh] flex-shrink-0 flex items-center justify-center group"
            >
              {/* IMAGE WRAPPER */}
              <div className="relative w-full h-full overflow-hidden border border-ivory/10">
                <motion.img
                  src={project.img}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              {/* CONTENT CARD (Floating) */}
              <div className="absolute -bottom-10 -right-10 md:right-[-5%] bg-ivory p-8 md:p-12 max-w-md shadow-2xl z-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gold/10 text-gold rounded-full">
                    <History size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black text-charcoal/40">
                    Est. {project.year}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-serif italic text-charcoal mb-6 leading-none">
                  {project.title}
                </h3>

                <p className="text-sm text-charcoal/60 leading-relaxed italic mb-8 border-l-2 border-gold/30 pl-6">
                  "{project.story}"
                </p>

                <div className="flex justify-between items-center border-t border-charcoal/5 pt-6">
                  <div className="flex items-center gap-2">
                    <Landmark size={14} className="text-gold" />
                    <span className="text-[9px] uppercase tracking-widest font-bold text-charcoal/40">
                      {project.location}
                    </span>
                  </div>
                  <button className="text-gold text-[10px] uppercase tracking-[0.3em] font-black hover:tracking-[0.5em] transition-all">
                    View Archive
                  </button>
                </div>
              </div>

              {/* YEAR STAMP (Vertical) */}
              <div className="absolute -left-12 top-0 h-full flex flex-col justify-center">
                <span className="text-8xl font-serif text-gold/10 rotate-180 [writing-mode:vertical-lr]">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* SECTION PROGRESS INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <span className="text-[9px] text-ivory/40 uppercase tracking-widest">
          Scroll to Journey
        </span>
        <div className="w-20 h-[1px] bg-ivory/10 relative overflow-hidden">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-0 bg-gold origin-left"
          />
        </div>
      </div>
    </section>
  );
};

export default HeritageSpotlight;
