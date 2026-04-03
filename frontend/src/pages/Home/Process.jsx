import { motion } from "framer-motion";

const steps = [
  {
    no: "01",
    title: "Discovery & Vision",
    desc: "We immerse ourselves in your lifestyle and aspirations. This phase transcends mere conversation; it is a deep psychological mapping designed to ensure the architecture reflects your very soul",
    details: ["Site Analysis", "Lifestyle Mapping", "Budget Strategy"],
  },
  {
    no: "02",
    title: "The Master Blueprint",
    desc: "This is where concepts find their structure. Through intricate 3D visuals and curated material palettes, we manifest a world that once existed only on paper",
    details: ["3D Visualization", "Material Selection", "Structural Planning"],
  },
  {
    no: "03",
    title: "Artisanal Execution",
    desc: "Not just building, but crafting. We execute every structural detail with military precision, adhering to a philosophy that places enduring quality above rapid completion",
    details: ["On-site Supervision", "Quality Audits", "Vendor Coordination"],
  },
  {
    no: "04",
    title: "The Grand Reveal",
    desc: "Beyond the final refinement. We don't just hand over keys; we deliver a timeless legacy that will breathe for generations to come",
    details: ["Final Styling", "Handover Documentation", "Post-Move Support"],
  },
];

const Process = () => {
  return (
    <section className="bg-ivory py-32 px-6 md:px-20 lg:px-40 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-charcoal/[0.02] -z-0" />

      <div className="relative z-10">
        <div className="max-w-4xl mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4"
          >
            How We Work
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-serif text-charcoal italic leading-none">
            From Thought <br /> to Concrete
          </h2>
        </div>

        <div className="space-y-32">
          {steps.map((step) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-12 md:gap-24 items-start"
            >
              {/* Step Number & Line */}
              <div className="flex flex-row md:flex-col items-center gap-6">
                <span className="text-6xl md:text-8xl font-serif font-black text-charcoal/5 group-hover:text-gold transition-colors">
                  {step.no}
                </span>
                <div className="w-12 md:w-[1px] h-[1px] md:h-32 bg-gold/30" />
              </div>

              {/* Content Side */}
              <div className="flex-1 pt-4 md:pt-10">
                <h3 className="text-3xl md:text-5xl font-serif text-charcoal mb-8 italic">
                  {step.title}
                </h3>

                <div className="grid md:grid-cols-2 gap-12">
                  <p className="text-charcoal/70 text-lg leading-relaxed font-sans">
                    {step.desc}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-gold text-[10px] uppercase tracking-widest font-bold border-b border-gold/20 pb-2 inline-block">
                      Key Deliverables
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {step.details.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-charcoal/50 text-sm uppercase tracking-tighter"
                        >
                          <div className="w-1 h-1 bg-gold rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Call to Action at the end of process */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="mt-40 p-12 bg-charcoal text-center rounded-sm shadow-2xl"
      >
        <h3 className="text-ivory text-3xl md:text-5xl font-serif italic mb-8">
          Ready to build your legacy?
        </h3>
        <button className="px-10 py-4 bg-gold text-charcoal font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors duration-500">
          Start a Conversation
        </button>
      </motion.div>
    </section>
  );
};

export default Process;
