import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Architectural Design",
    description:
      "We don't just build structures; we sculpt landmarks. Our process integrates advanced thermal modeling with avant-garde aesthetics to ensure your space is as sustainable as it is breathtaking.",
    tags: [
      "Master Planning",
      "3D Visualization",
      "Sustainable Specs",
      "Permit Logic",
    ],
    process: "Concept → Schematic → Technical → Reality",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
  },
  {
    id: "02",
    title: "Interior Curation",
    description:
      "Every texture tells a story. From hand-burnished brass to rare Italian marbles, we source globally and curate locally to create interiors that are a sensory extension of your personality.",
    tags: [
      "Bespoke Furniture",
      "Lighting Art",
      "Material Sourcing",
      "Art Consulting",
    ],
    process: "Palette → Sourcing → Installation → Styling",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
  },
  {
    id: "03",
    title: "Landscape Artistry",
    description:
      "Blurring the line between shelter and nature. We design ecosystem-driven landscapes that provide a sanctuary for both local biodiversity and the human spirit.",
    tags: ["Eco-Pools", "Native Flora", "Outdoor Kitchens", "Water Features"],
    process: "Terrain Analysis → Flora Mapping → Hardscape → Growth",
    img: "https://images.unsplash.com/photo-1558603668-6570496b66f8?q=80&w=1200",
  },
  {
    id: "04",
    title: "Project Management",
    description:
      "Precision is our religion. We manage the delicate dance between contractors, timelines, and budgets, ensuring the final result is a perfect mirror of the original vision.",
    tags: [
      "Risk Mitigation",
      "Cost Control",
      "Timeline Audit",
      "Quality Assurance",
    ],
    process: "Strategy → Coordination → Oversight → Handover",
    img: "https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="relative min-h-screen bg-charcoal py-32 px-6 md:px-20 lg:px-40">
      {/* Header Section */}
      <div className="mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4"
        >
          Our Capabilities
        </motion.p>
        <h2 className="text-5xl md:text-7xl font-serif text-ivory italic leading-tight">
          The DNA of <br /> Excellence
        </h2>
      </div>

      {/* Services Accordion List */}
      <div className="border-t border-white/10">
        {services.map((service, index) => {
          const isOpen = expandedIndex === index;

          return (
            <div
              key={service.id}
              className={`border-b border-white/10 transition-colors duration-500 ${isOpen ? "bg-white/[0.01]" : ""}`}
            >
              {/* Top Bar (Visible) - Added horizontal padding for alignment */}
              <div
                onMouseEnter={() => setExpandedIndex(index)}
                className="flex items-center justify-between py-12 px-2 md:px-8 cursor-pointer group"
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="text-gold/40 font-serif italic text-xl group-hover:text-gold transition-colors">
                    {service.id}
                  </span>
                  <h3
                    className={`text-2xl md:text-5xl font-serif transition-all duration-500 ${isOpen ? "text-gold italic md:pl-4" : "text-ivory pl-0"}`}
                  >
                    {service.title}
                  </h3>
                </div>
                <div
                  className={`p-3 md:p-4 rounded-full border transition-all duration-500 ${isOpen ? "bg-gold border-gold text-charcoal rotate-90" : "border-white/10 text-white"}`}
                >
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    {/* Inner Padding matched with Top Bar */}
                    <div className="pb-20 px-2 md:px-20 flex flex-col lg:flex-row gap-16 items-center">
                      {/* Left Side: Detailed Info */}
                      <div className="flex-1 space-y-10 order-2 lg:order-1">
                        <p className="text-ivory/70 text-base md:text-lg leading-relaxed max-w-xl">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-2 gap-10">
                          <div>
                            <h4 className="text-gold text-[10px] uppercase tracking-widest mb-5 font-bold opacity-80">
                              Expertise
                            </h4>
                            <ul className="space-y-3">
                              {service.tags.map((tag) => (
                                <li
                                  key={tag}
                                  className="text-ivory/40 text-[11px] flex items-center gap-3"
                                >
                                  <div className="w-1.5 h-[1px] bg-gold" />{" "}
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-gold text-[10px] uppercase tracking-widest mb-5 font-bold opacity-80">
                              The Path
                            </h4>
                            <p className="text-ivory/40 text-[10px] leading-loose uppercase tracking-[0.2em]">
                              {service.process.split(" → ").join("\n")}
                            </p>
                          </div>
                        </div>

                        <button className="flex items-center gap-6 text-ivory group pt-6">
                          <span className="text-[10px] uppercase tracking-[0.5em] font-bold border-b border-gold/30 group-hover:border-gold pb-2 transition-colors">
                            Enquire Project
                          </span>
                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-ivory group-hover:text-charcoal transition-all">
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </button>
                      </div>

                      {/* Right Side: Scaled Image Container */}
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full lg:w-[400px] xl:w-[450px] aspect-[4/5] overflow-hidden rounded-sm order-1 lg:order-2 shadow-2xl grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                      >
                        <img
                          src={service.img}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
