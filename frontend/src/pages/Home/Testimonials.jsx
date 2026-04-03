import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Vikram Singhania",
    role: "CEO, Stellar Groups",
    text: "Unparalleled attention to detail. They didn't just build an office; they built a cathedral of productivity. The marble work in the lobby is a masterpiece.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  },
  {
    id: 2,
    name: "Aman Sharma",
    role: "Art Curator",
    text: "The way they play with natural light is poetic. My villa feels like it's breathing. It's rare to find architects who understand the soul of a space.",
    img: "https://images.unsplash.com/photo-1723990720514-65968a7d517b?q=80&w=779&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Rohan Kumar",
    role: "Restaurateur",
    text: "Precision, luxury, and a deep understanding of functional aesthetics. Our flagship restaurant has become an architectural landmark in Milan.",
    img: "https://plus.unsplash.com/premium_photo-1682089804117-cea5d901647f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  return (
    <section className="relative min-h-[90vh] bg-charcoal overflow-hidden flex items-center">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif italic text-white/[0.02] pointer-events-none whitespace-nowrap">
        Voices of Trust
      </div>

      <div className="container mx-auto px-6 md:px-20 lg:px-40 relative z-10 mb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: The Portrait with Curtain Animation */}
          <div className="relative group">
            <div className="relative w-full aspect-[4/5] md:w-[450px] overflow-hidden rounded-sm shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{ clipPath: "inset(0 0 0 100%)" }}
                  transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                  className="w-full h-full"
                >
                  <motion.img
                    src={reviews[current].img}
                    alt={reviews[current].name}
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                </motion.div>
              </AnimatePresence>
              {/* Gold Border Frame */}
              <div className="absolute inset-4 border border-gold/20 pointer-events-none" />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute -bottom-10 right-0 flex gap-4">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-gold hover:text-charcoal transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-gold hover:text-charcoal transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Right: The Content */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-block"
            >
              <Quote
                className="text-gold opacity-30 mb-6"
                size={60}
                strokeWidth={1}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-2xl md:text-4xl font-serif text-ivory leading-relaxed italic">
                    "{reviews[current].text}"
                  </p>

                  <div className="mt-12 flex items-center gap-6">
                    <div className="h-[1px] w-12 bg-gold" />
                    <div>
                      <h4 className="text-ivory text-xl font-serif">
                        {reviews[current].name}
                      </h4>
                      <p className="text-gold/50 text-[10px] uppercase tracking-[0.3em] font-bold mt-1">
                        {reviews[current].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Pagination Indicators */}
            <div className="flex gap-3 pt-8">
              {reviews.map((_, i) => (
                <div
                  key={i}
                  className={`h-[2px] transition-all duration-500 ${current === i ? "w-12 bg-gold" : "w-4 bg-white/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
