import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Twitter,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  Hash,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    initial: { y: 50, opacity: 0 },
    whileInView: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
  };

  return (
    <footer className="relative bg-[#0D0D0D] pt-24 pb-10 px-6 md:px-20 overflow-hidden text-[#FDFCF8] border-t border-[#C5A059]/10">
      {/* 1. BACKGROUND WATERMARK */}
      <div className="absolute -bottom-10 -left-10 w-full overflow-hidden pointer-events-none select-none opacity-[0.02]">
        <h2 className="text-[20vw] font-black whitespace-nowrap leading-none tracking-tighter">
          KSM_URBAN_INTERIORS
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="container mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* COLUMN 1: BRAND & MISSION */}
          <div className="md:col-span-5 space-y-8">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-[1px] bg-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-bold text-nowrap">
                KSM Urban Interiors
              </span>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif italic leading-[1.1]"
            >
              Transforming <span className="text-[#C5A059]">Skylines</span>,{" "}
              <br />
              Casting{" "}
              <span className="opacity-50 text-[#FDFCF8]">Shadows.</span>
            </motion.h3>

            <motion.div variants={itemVariants} className="flex gap-5 pt-4">
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Linkedin} />
              <SocialIcon Icon={Twitter} />
            </motion.div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="md:col-span-2 space-y-6">
            <motion.h4
              variants={itemVariants}
              className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-bold"
            >
              Studio
            </motion.h4>
            <ul className="space-y-3 font-light text-sm text-[#FDFCF8]/50">
              <FooterLink label="Our Archive" />
              <FooterLink label="Methodology" />
              <FooterLink label="Sustainability" />
              <FooterLink label="Bespoke Series" />
            </ul>
          </div>

          {/* COLUMN 3: CORPORATE DETAILS (OFFICE & GST) */}
          <div className="md:col-span-5 space-y-8">
            <motion.h4
              variants={itemVariants}
              className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-bold underline underline-offset-8"
            >
              Registered HQ
            </motion.h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-4">
              {/* ADDRESS */}
              <div className="space-y-4">
                <ContactItem Icon={MapPin} title="Address">
                  #43, K. Channasandra Village, <br />
                  K.R Puram Post, <br />
                  Bangalore - 560043
                </ContactItem>
                <ContactItem Icon={Hash} title="GSTIN" text="29BZGPK7585L1ZG" />
              </div>

              {/* CONTACTS */}
              <div className="space-y-4">
                <ContactItem Icon={Phone} title="Direct Line">
                  +91 9945638452 <br />
                  +91 9036341052
                </ContactItem>
                <ContactItem Icon={Mail} title="Official Enquiries">
                  info.KSMUI@gmail.com <br />
                  Contacts.KSMUI@gmail.com
                </ContactItem>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: ATTRIBUTION */}
        <div className="pt-8 border-t border-[#FDFCF8]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <motion.p
              variants={itemVariants}
              className="text-[9px] uppercase tracking-widest text-[#FDFCF8]/30"
            >
              © {currentYear} KSM Urban Interiors. Developed by
              Studio_Perspective.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[8px] uppercase tracking-widest text-[#C5A059]/40"
            >
              Principal Architect: Sriram Kumar
            </motion.p>
          </div>

          <motion.button
            variants={itemVariants}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex cursor-pointer items-center gap-3 group px-4 py-2 border border-[#C5A059]/10 rounded-full hover:border-[#C5A059]/50 transition-all"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059]">
              Back to Top
            </span>
            <ArrowUp
              size={12}
              className="text-[#C5A059] group-hover:-translate-y-1 transition-transform"
            />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};

// Sub-components for better Clean Code
const FooterLink = ({ label }) => (
  <motion.li
    whileHover={{ x: 5, color: "#C5A059" }}
    className="cursor-pointer transition-all duration-300"
  >
    {label}
  </motion.li>
);

const SocialIcon = ({ Icon }) => (
  <motion.a
    href="#"
    whileHover={{ y: -3 }}
    className="text-[#FDFCF8]/30 hover:text-[#C5A059] transition-colors"
  >
    <Icon size={18} strokeWidth={1.5} />
  </motion.a>
);

const ContactItem = ({ Icon, title, text, children }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <Icon size={12} className="text-[#C5A059]/50" />
      <span className="text-[8px] uppercase tracking-widest text-[#FDFCF8]/30 font-bold">
        {title}
      </span>
    </div>
    <div className="text-[11px] font-light leading-relaxed text-[#FDFCF8]/60 pl-5">
      {text || children}
    </div>
  </div>
);

export default Footer;
