import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  // High-quality Interior Design Images (Verified Links)
  const heroImage =
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <section className="relative min-h-screen pt-36 pb-16 px-6 md:px-12 lg:px-20 bg-ivory flex flex-col justify-between overflow-hidden">
      {/* --- Main Content Grid --- */}
      <div className="grid lg:grid-cols-12 gap-10 items-start z-10">
        <motion.div className="lg:col-span-8 flex flex-col gap-10">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[9vw] font-serif leading-[0.9] tracking-tight text-charcoal"
          >
            Crafting <br />
            <span className="italic font-extralight text-gold text-[10vw]">
              Poetic
            </span>{" "}
            Spaces.
          </motion.h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <button className="group flex items-center gap-4 bg-charcoal text-ivory text-[10px] uppercase tracking-[0.3em] font-bold px-10 py-5 hover:bg-gold transition-all duration-500 rounded-sm shadow-xl">
              Explore Projects
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>

            <div
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold group-hover:border-gold transition-all duration-500 shadow-sm">
                <Play
                  size={18}
                  className="fill-charcoal text-charcoal group-hover:fill-white group-hover:text-white transition-colors"
                />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                Watch Story
              </span>
            </div>
          </div>
        </motion.div>

        {/* Floating Description */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="lg:col-span-4 lg:pt-32 hidden lg:block"
        >
          <div className="border-l border-gold pl-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gold">
              Architecture & Interior
            </p>
            <p className="text-sm tracking-wide leading-relaxed text-charcoal/60 italic font-serif">
              "Design is not just what it looks like, it's how it feels to live
              within the art."
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- FEATURED MEDIA CONTAINER --- */}
      <div className="relative w-full h-[65vh] mt-16 lg:mt-24 overflow-hidden rounded-sm group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage} // Fallback image jab tak video load na ho
          className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-with-a-fireplace-43031-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Premium Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-0 border-[1px] border-white/10 m-4 pointer-events-none" />

        {/* Parallax Info Overlay */}
        <div className="absolute inset-0 p-10 flex flex-col justify-end pointer-events-none">
          <div className="flex justify-between items-end text-white">
            <div className="space-y-2">
              <span className="block text-[10px] uppercase tracking-[0.5em] font-light opacity-80">
                Featured Experience
              </span>
              <h3 className="text-2xl font-serif italic tracking-wide">
                The Minimalist Haven, Mumbai
              </h3>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-white/30 mb-2"></div>
          </div>
        </div>
      </div>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-charcoal/98 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-gold transition-colors p-2"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-white/5"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/S_vLpx2i1R4?autoplay=1"
                title="Premium Interior Tour"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Large Background Text */}
      <div className="absolute -bottom-20 -right-20 text-[25vw] font-serif font-black text-gold/5 select-none pointer-events-none z-0 tracking-tighter">
        EST.08
      </div>
    </section>
  );
};

export default Hero;
