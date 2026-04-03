import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "The Concrete Oasis",
    location: "Mumbai, IN",
    type: "Residential",
    img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "02",
    title: "Marble Monolith",
    location: "Delhi, IN",
    type: "Commercial",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
  },
  {
    id: "03",
    title: "Zen Studio Loft",
    location: "Banglore, IN",
    type: "Boutique",
    img: "https://plus.unsplash.com/premium_photo-1681113076872-c74b8926e70c?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "04",
    title: "Golden Hour Villa",
    location: "Chennai, IN",
    type: "Luxury",
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "05",
    title: "The Obsidian Suite",
    location: "Kolkata, IN",
    type: "Minimalist",
    img: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=1213&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "06",
    title: "Terrace of Echoes",
    location: "Gurgaon, IN",
    type: "Penthouse",
    img: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Projects = () => {
  const targetRef = useRef(null);
  const [range, setRange] = useState(["1%", "-215%"]); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRange(["1%", "-480%"]);
      } else {
        setRange(["1%", "-215%"]);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // Ab range variable use karenge
  const x = useSpring(useTransform(scrollYProgress, [0, 1], range), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [0, -10, 0]);

  return (
    <section ref={targetRef} className="relative h-[800vh] bg-charcoal">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-12 left-6 md:left-20 right-6 md:right-20 flex justify-between items-end z-30">
          <div>
            <span className="text-gold text-[10px] uppercase tracking-[0.6em] block mb-4 font-bold">
              Selected Portfolio
            </span>
            <h2 className="text-ivory text-5xl md:text-8xl font-serif italic leading-none">
              Archives
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-gold/50 text-[10px] uppercase tracking-widest mb-1">
              Scroll to Explore
            </p>
            <div className="w-32 h-[1px] bg-gold/20 relative">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="absolute inset-0 bg-gold origin-left"
              />
            </div>
          </div>
        </div>

        {/* --- Horizontal Track --- */}
        <motion.div
          style={{ x, skewX }}
          className="flex gap-24 items-center pl-[10vw]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative h-[65vh] w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0"
            >
              {/* Project Card */}
              <div className="relative w-full h-full overflow-hidden bg-ivory/5 border border-white/5 rounded-sm">
                {/* Index Number Layer */}
                <span className="absolute top-6 left-8 text-[12vw] font-serif font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-gold/10 transition-colors duration-700">
                  {project.id}
                </span>

                {/* Image Wrap */}
                <div className="absolute inset-0 p-12 md:p-20">
                  <div className="relative w-full h-full overflow-hidden shadow-2xl">
                    <motion.img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-[0.22, 1, 0.36, 1]"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                </div>

                {/* Info Overlay (The "Tagra" Part) */}
                <div className="absolute inset-0 flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-end justify-between border-b border-white/20 pb-6">
                    <div>
                      <p className="text-gold text-[10px] uppercase tracking-[0.4em] mb-3 font-bold">
                        {project.type}
                      </p>
                      <h3 className="text-white text-3xl md:text-5xl font-serif italic">
                        {project.title}
                      </h3>
                      <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">
                        {project.location}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-charcoal -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <ArrowUpRight size={28} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Outside Card Title (Always Visible) */}
              <div className="mt-6 flex justify-between items-center px-2">
                <h4 className="text-ivory/40 group-hover:text-gold text-[10px] uppercase tracking-[0.4em] font-bold transition-colors">
                  {project.title}
                </h4>
                <div className="h-[1px] flex-grow mx-8 bg-white/10" />
                <span className="text-ivory/20 font-serif italic text-sm">
                  {project.id}
                </span>
              </div>
            </motion.div>
          ))}

          {/* View All "Giant" Button */}
          <div className="pr-[20vw] flex-shrink-0">
            <button className="group relative">
              <span className="text-[10vw] font-serif italic text-white/5 group-hover:text-gold transition-colors duration-700">
                View All
              </span>
              <div className="absolute top-1/2 left-full ml-10 -translate-y-1/2">
                <div className="w-24 h-24 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold transition-all duration-500">
                  <ArrowUpRight
                    className="text-gold group-hover:text-charcoal"
                    size={40}
                  />
                </div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* --- Bottom Ambient Text --- */}
        <div className="absolute bottom-10 left-6 md:left-20 flex gap-12 text-white/10 text-[10px] uppercase tracking-[0.5em] font-bold">
          <span>Aesthetics</span>
          <span>Functionality</span>
          <span>Innovation</span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
