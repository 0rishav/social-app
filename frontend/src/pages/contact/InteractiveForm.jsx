import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";

const InteractiveForm = () => {
  const [focused, setFocused] = useState(null);

  return (
    <section className="py-24 bg-[#FDFCF8] px-6 md:px-20 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* LEFT SIDE: STUDIO CREDENTIALS */}
        <div className="lg:col-span-5 space-y-16">
          {/* STUDIO LOCATION */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-black">
              Studio_Details
            </h3>
            <div className="space-y-3">
              <p className="text-3xl font-serif italic text-[#1A1A1A]">
                KSM_Urban_Interiors, HQ
              </p>
              <p className="text-[#1A1A1A]/60 font-light leading-relaxed max-w-sm">
                #43, K. Channasandra Village, <br />
                K.R Puram Post, Bangalore - 560043
              </p>
              <div className="pt-2">
                <span className="text-[9px] px-2 py-1 border border-[#C5A059]/30 text-[#C5A059] uppercase font-bold tracking-widest">
                  GST: 29BZGPK7585L1ZG
                </span>
              </div>
            </div>
          </div>

          {/* CONTACT LINKS */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
              <ContactLink
                label="General Enquiries"
                value="info.KSMUI@gmail.com"
              />
              <ContactLink
                label="Strategic Contacts"
                value="Contacts.KSMUI@gmail.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
              <ContactLink
                label="Principal Architect"
                value="+91 99456 38452"
              />
              <ContactLink label="Studio Liaison" value="+91 90363 41052" />
            </div>
          </div>

          {/* SOCIALS */}
          <div className="pt-10 flex items-center gap-10">
            <div className="flex gap-8">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#C5A059" }}
                  className="text-[#1A1A1A]/30 transition-colors"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>

            {/* Decorative status indicator */}
            <div className="flex items-center gap-2 border-l border-[#1A1A1A]/10 pl-10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#1A1A1A]/40 font-bold italic">
                Active_Status
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: THE INTERACTIVE FORM */}
        <div className="lg:col-span-7">
          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <InputField
                num="01"
                label="Full Name"
                placeholder="What should we call you?"
                onFocus={() => setFocused(1)}
                onBlur={() => setFocused(null)}
                isFocused={focused === 1}
              />
              <InputField
                num="02"
                label="Email Address"
                placeholder="Where should we reply?"
                onFocus={() => setFocused(2)}
                onBlur={() => setFocused(null)}
                isFocused={focused === 2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <InputField
                num="03"
                label="Project Type"
                placeholder="Residential / Commercial..."
                onFocus={() => setFocused(3)}
                onBlur={() => setFocused(null)}
                isFocused={focused === 3}
              />
              <InputField
                num="04"
                label="Location"
                placeholder="City, Country"
                onFocus={() => setFocused(4)}
                onBlur={() => setFocused(null)}
                isFocused={focused === 4}
              />
            </div>

            <div className="relative pt-6">
              <span className="text-[10px] font-mono text-[#C5A059] absolute top-0 left-0">
                05
              </span>
              <label className="block text-[10px] uppercase tracking-widest text-black/40 mb-4 ml-6">
                The Vision
              </label>
              <textarea
                rows="4"
                placeholder="Tell us about the legacy you want to build..."
                className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-black transition-colors resize-none ml-6"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-6 bg-[#1A1A1A] text-[#FDFCF8] px-10 py-6 rounded-full overflow-hidden relative"
            >
              <span className="text-sm uppercase tracking-[0.3em] font-bold z-10">
                Transmit Inquiry
              </span>
              <div className="bg-[#C5A059] absolute right-0 top-0 h-full w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
              <ArrowRight
                className="z-10 group-hover:translate-x-2 transition-transform"
                size={18}
              />
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Helper Components
const ContactLink = ({ label, value }) => (
  <div className="group cursor-pointer">
    <p className="text-[9px] uppercase tracking-widest text-black/30 mb-1 group-hover:text-[#C5A059] transition-colors">
      {label}
    </p>
    <p className="text-xl font-serif text-[#1A1A1A]">{value}</p>
  </div>
);

const InputField = ({
  num,
  label,
  placeholder,
  onFocus,
  onBlur,
  isFocused,
}) => (
  <div className="relative pt-6 group">
    <span
      className={`text-[10px] font-mono absolute top-0 left-0 transition-colors ${isFocused ? "text-[#C5A059]" : "text-black/20"}`}
    >
      {num}
    </span>
    <label className="block text-[10px] uppercase tracking-widest text-black/40 mb-2 ml-6 transition-colors group-hover:text-black">
      {label}
    </label>
    <input
      type="text"
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-black/10 py-3 outline-none ml-6 placeholder:text-black/10 text-[#1A1A1A] focus:border-black transition-colors"
    />
    {/* Animated Underline */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isFocused ? 1 : 0 }}
      className="absolute bottom-0 left-6 right-0 h-[1px] bg-[#C5A059] origin-left"
      transition={{ duration: 0.4 }}
    />
  </div>
);

export default InteractiveForm;
