import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight, Layers3 } from "lucide-react";
import { masterServices } from "../data/data";

const ServiceCategories = () => {
  return (
    <section className="bg-ivory py-32 px-6 md:px-20 lg:px-40">
      
      <div className="mb-24 space-y-4">
        <span className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold">Categories</span>
        <h2 className="text-5xl md:text-7xl font-serif text-charcoal italic leading-none">
          Specialized <br /> Vertical Design.
        </h2>
      </div>

      <div className="space-y-40">
        {masterServices.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col lg:flex-row gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            
            {/* LEFT: Visual Stack */}
            <div className="lg:w-1/2 relative group">
              {/* Main Card */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm z-20 shadow-2xl">
                <img 
                  src={service.mainImg} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt={service.categoryName} 
                />
              </div>
              
              {/* Decorative "Sub-Project" Count Badge */}
              <div className="absolute -bottom-10 -right-10 bg-charcoal p-8 z-30 hidden md:block">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-serif italic text-gold">{service.subProjects.length}</span>
                  <p className="text-ivory/50 text-[10px] uppercase tracking-widest leading-tight">
                    Active <br /> Designs
                  </p>
                </div>
              </div>

              {/* Shadow Layer (The "Double Card" Effect) */}
              <div className="absolute top-6 left-6 w-full h-full border border-charcoal/10 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
            </div>

            {/* RIGHT: Content & CTA */}
            <div className="lg:w-1/2 space-y-8">
              <h3 className="text-4xl md:text-5xl font-serif text-charcoal italic">
                {service.categoryName}
              </h3>
              <p className="text-charcoal/60 text-xl font-light leading-relaxed max-w-md italic">
                "{service.heroTeaser}"
              </p>

              {/* Quick Preview of Sub-Projects (Visual Pills) */}
              <div className="flex flex-wrap gap-3">
                {service.subProjects.map((sub, i) => (
                  <span key={i} className="px-4 py-2 bg-charcoal/5 border border-charcoal/10 rounded-full text-[10px] text-charcoal/40 font-bold uppercase tracking-widest">
                    {sub.projectName}
                  </span>
                ))}
              </div>

              <div className="pt-10">
                <Link 
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-6 group"
                >
                  <div className="w-16 h-16 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                    <MoveRight className="text-charcoal group-hover:text-ivory" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-black text-charcoal border-b border-charcoal/20 pb-2">
                    Explore Collection
                  </span>
                </Link>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCategories;