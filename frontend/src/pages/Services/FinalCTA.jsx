import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, PhoneCall } from "lucide-react";

const FinalCTA = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xPos = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const springX = useSpring(xPos, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="bg-ivory py-40 px-6 md:px-20 lg:px-40 relative overflow-hidden"
    >
      <motion.div
        style={{ x: springX }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap select-none pointer-events-none opacity-[0.03]"
      >
        <h2 className="text-[30vw] font-serif italic font-black text-charcoal">
          START YOUR PROJECT • START YOUR PROJECT •
        </h2>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-10 block"
        >
          Ready to build your legacy?
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-[10vw] font-serif text-charcoal leading-[0.9] mb-20"
        >
          Let’s weave <br />
          <span className="italic text-gold">Greatness </span>
          together.
        </motion.h2>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <Link
            to="/contact"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-charcoal flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 group-hover:bg-gold"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-white/5 rounded-full"
            />

            <ArrowUpRight
              className="text-gold group-hover:text-charcoal transition-colors duration-500 mb-4"
              size={40}
              strokeWidth={1}
            />
            <span className="text-ivory group-hover:text-charcoal text-[10px] uppercase tracking-[0.4em] font-black transition-colors duration-500">
              Inquire Now
            </span>
          </Link>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 border border-charcoal/10 rounded-full border-dashed pointer-events-none group-hover:border-gold/50"
          />
        </motion.div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl border-t border-charcoal/5 pt-10">
          <div className="flex items-center justify-center md:justify-start gap-6 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:bg-charcoal group-hover:text-ivory transition-all">
              <Mail size={18} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-bold">
                Write to us
              </p>
              <p className="text-lg font-serif italic text-charcoal">
                Contacts.KSMUI@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-6 group cursor-pointer">
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-bold">
                Speak with us
              </p>
              <p className="text-lg font-serif italic text-charcoal">
                +91 9036341052
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:bg-charcoal group-hover:text-ivory transition-all">
              <PhoneCall size={18} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default FinalCTA;
