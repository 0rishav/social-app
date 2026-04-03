import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const servicesList = [
  {
    id: "residential-design",
    count: "01",
    title: "Residential Design",
    subtitle: "Private Sanctuaries",
    img: "https://plus.unsplash.com/premium_photo-1674676471339-fe57f0056992?q=80&w=743&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "commercial-interiors",
    count: "02",
    title: "Commercial Interiors",
    subtitle: "Workplace Innovation",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
  },
  {
    id: "furniture-curation",
    count: "03",
    title: "Furniture Curation",
    subtitle: "Artisanal Pieces",
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200",
  },
  {
    id: "landscape",
    count: "04",
    title: "Landscape Artistry",
    subtitle: "Natural Extensions",
    img: "https://images.unsplash.com/photo-1558603668-6570496b66f8?q=80&w=1200",
  },
];

const Hero = () => {
  return (
    <div className="bg-ivory min-h-screen pt-32 overflow-hidden">
      <section className="px-6 md:px-20 lg:px-40 mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold block mb-6"
          >
            Our Expertise
          </motion.span>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-[9vw] font-serif text-charcoal italic leading-[0.8] mb-12"
          >
            The Pillars <br /> of Legacy
          </motion.h1>
        </motion.div>
      </section>

      <section className="border-t border-charcoal/5">
        <div className="flex flex-col lg:flex-row min-h-[70vh]">
          {servicesList.map((service) => (
            <Link
              to={`/services/${service.id}`}
              key={service.id}
              className="group relative flex-1 flex flex-col min-h-[500px] lg:min-h-0 overflow-hidden border-b lg:border-r border-charcoal/5 bg-ivory cursor-pointer"
            >
              {/* Sab kuch is ek div ke andar wrap hona chahiye for stable hover trigger */}
              <div className="relative w-full h-full flex flex-col justify-between flex-1">
                {/* 1. Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1s]"
                  />
                </div>

                {/* 2. Shutter Door Overlay */}
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0 bg-ivory z-10 hidden lg:block origin-left"
                />

                {/* 3. Mobile Fallback Overlay */}
                <div className="absolute inset-0 bg-ivory/90 group-hover:bg-transparent transition-colors duration-500 lg:hidden z-10" />

                {/* 4. Content Layer */}
                <div className="relative z-20 h-full p-10 md:p-14 flex flex-col justify-between items-start flex-1">
                  <span className="font-serif italic text-charcoal/20 text-5xl lg:text-8xl group-hover:text-gold transition-colors duration-700">
                    {service.count}
                  </span>

                  <div className="w-full space-y-3 pt-20">
                    <h3 className="text-3xl md:text-5xl font-serif text-charcoal group-hover:text-ivory transition-all duration-700">
                      {service.title}
                    </h3>
                    <p className="text-gold text-[11px] uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {service.subtitle}
                    </p>
                    <div className="mt-8 pt-6 border-t border-charcoal/5 group-hover:border-white/10 flex justify-end">
                      <ArrowRight
                        className="text-charcoal group-hover:text-gold -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                        size={24}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
