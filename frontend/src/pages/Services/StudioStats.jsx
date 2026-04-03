import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Award, Building2, Home, MapPin } from "lucide-react";

// 1. STATS DATA (Trust & Scale)
const stats = [
  {
    id: 1,
    icon: Home,
    value: 50,
    suffix: "+",
    label: "Luxury Villas",
    bgText: "Sanctuaries",
  },
  {
    id: 2,
    icon: Building2,
    value: 25,
    suffix: "+",
    label: "Commercial Hubs",
    bgText: "Workspace",
  },
  {
    id: 3,
    icon: Award,
    value: 12,
    suffix: "",
    label: "Global Awards",
    bgText: "Excellence",
  },
  {
    id: 4,
    icon: MapPin,
    value: 5,
    suffix: "",
    label: "Countries Present",
    bgText: "Footprint",
  },
];

const CountUp = ({ value, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return; 

    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 2000; 
    let incrementTime = Math.abs(Math.floor(totalDuration / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span className="text-7xl md:text-8xl lg:text-[9vw] font-serif text-gold italic font-light leading-none">
      {count}
      <span className="text-gold/50 not-italic text-5xl md:text-7xl lg:text-[7vw]">
        {suffix}
      </span>
    </span>
  );
};

const StudioStats = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
    {
      stiffness: 100,
      damping: 30,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-charcoal min-h-[90vh] py-32 px-6 md:px-20 lg:px-32 relative overflow-hidden flex flex-col justify-center"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 flex flex-col justify-center select-none pointer-events-none"
      >
        <div className="text-[35vw] font-serif italic text-white/[0.02] leading-none whitespace-nowrap opacity-70">
          Scale & Trust
        </div>
      </motion.div>

      <div className="relative z-10 space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left space-y-4"
        >
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
            The Impact
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-ivory leading-tight italic max-w-4xl">
            Numbers that <br /> Define{" "}
            <span className="text-gold not-italic font-sans font-extralight">
              Legacy.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-20 border-t border-white/5 pt-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative group text-center flex flex-col items-center gap-12"
              >
                <div className="relative aspect-square flex items-center justify-center">
                  <div className="h-0 overflow-hidden group-hover:h-32 transition-all duration-700 delay-500 absolute -top-16">
                    <p className="text-[8vw] font-serif italic text-ivory/5 uppercase select-none">
                      {stat.bgText}
                    </p>
                  </div>

                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </div>

                <div className="space-y-4 flex flex-col items-center text-center">
                  <div className="p-4 bg-black/20 border border-white/5 rounded-full text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-500">
                    <Icon size={24} strokeWidth={1} />
                  </div>
                  <h4 className="text-[11px] uppercase tracking-[0.4em] text-ivory font-bold max-w-[120px]">
                    {stat.label}
                  </h4>
                </div>

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-0 bg-gold/30 group-hover:h-12 transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default StudioStats;
