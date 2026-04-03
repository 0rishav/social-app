import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { masterServices } from "../pages/data/data";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpander, setMobileExpander] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", link: "/" },
    {
      name: "Services",
      link: "/services",
      dropdown: masterServices.map((service) => ({
        name: service.categoryName,
        link: `/services/${service.id}`,
      })),
    },
    {
      name: "Projects",
      link: "/projects",
    },
    { name: "The Studio", link: "/studio" },
    { name: "Contact", link: "/contact" },
  ];

  const toggleMobileExpander = (name) => {
    setMobileExpander(mobileExpander === name ? null : name);
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-700 px-6 md:px-12 ${
        scrolled
          ? "py-4 bg-ivory/95 backdrop-blur-lg shadow-sm"
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* --- LOGO --- */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative overflow-hidden rounded-full h-10 w-10 border border-charcoal/10">
            <img
              src="/images/logo.jpeg"
              alt="Logo"
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <span className="text-xl font-serif font-bold  uppercase text-charcoal">
            KSM URBAN INTERIORS
          </span>
        </div>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden lg:flex items-center gap-12">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {/* Main Link */}
              <Link
                to={item.link || "#"}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-charcoal/70 hover:text-gold transition-colors"
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown
                    size={10}
                    className={`transition-transform duration-300 ${
                      activeDropdown === item.name ? "rotate-180 text-gold" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Dropdown Logic */}
              <AnimatePresence>
                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                    className="absolute top-full -left-6 w-72 bg-charcoal shadow-[20px_20px_60px_rgba(0,0,0,0.3)] p-8 mt-2 rounded-sm border-t-2 border-gold z-50"
                  >
                    <div className="flex flex-col gap-6">
                      {item.dropdown.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.link} // Ab ye /services/residential-design pe le jayega
                          className="group/item flex justify-between items-center transition-all"
                          onClick={() => setActiveDropdown(null)} // Click karte hi menu band
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-ivory/80 group-hover/item:text-gold transition-colors">
                              {sub.name}
                            </span>
                            {/* Subtle underline effect */}
                            <div className="w-0 h-[1px] bg-gold/30 group-hover/item:w-full transition-all duration-500" />
                          </div>

                          <ArrowRight
                            size={14}
                            className="text-gold opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300"
                          />
                        </Link>
                      ))}
                    </div>

                    {/* Decoration for Premium Look */}
                    <div className="absolute bottom-2 right-4 opacity-5 pointer-events-none">
                      <span className="text-4xl font-serif italic text-ivory tracking-tighter">
                        Legacy
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-6">
          <Search
            size={18}
            className="text-charcoal/70 cursor-pointer hover:text-gold transition-colors hidden sm:block"
          />
          <button className="lg:hidden" onClick={() => setIsOpen(true)}>
            <Menu size={28} strokeWidth={1.5} className="text-charcoal" />
          </button>
          <button className="hidden lg:block border border-charcoal/20 text-charcoal text-[9px] uppercase tracking-[0.3em] px-8 py-3.5 hover:bg-charcoal hover:text-ivory transition-all duration-500 font-bold">
            Get in touch
          </button>
        </div>
      </div>

      {/* --- TAGRA MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-full max-w-[400px] h-screen bg-ivory z-[120] shadow-2xl flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex justify-between items-center px-8 py-8 border-b border-charcoal/5">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/logo.jpeg"
                    alt="Logo"
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-sm font-serif tracking-widest uppercase font-bold">
                    KSM URBAN INTERIORS
                  </span>
                </div>
                <X
                  size={24}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-charcoal/50 hover:text-charcoal"
                />
              </div>

              {/* Sidebar Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto px-8 py-10">
                <div className="flex flex-col gap-6">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="border-b border-charcoal/5 pb-6">
                      {/* Main Item Container */}
                      <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={
                          () =>
                            item.dropdown
                              ? toggleMobileExpander(item.name)
                              : (setIsOpen(false), navigate(item.link)) // Agar dropdown nahi hai toh seedha navigate aur menu band
                        }
                      >
                        {/* Item Name - Link or Span */}
                        {item.dropdown ? (
                          <span
                            className={`text-3xl font-serif transition-colors duration-500 ${
                              mobileExpander === item.name
                                ? "text-gold italic"
                                : "text-charcoal"
                            }`}
                          >
                            {item.name}
                          </span>
                        ) : (
                          <Link
                            to={item.link}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-serif text-charcoal hover:text-gold transition-colors"
                          >
                            {item.name}
                          </Link>
                        )}

                        {/* Chevron Icon for Dropdown */}
                        {item.dropdown && (
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-500 ${
                              mobileExpander === item.name
                                ? "rotate-180 text-gold"
                                : "text-charcoal/30"
                            }`}
                          />
                        )}
                      </div>

                      {/* Mobile Dropdown (Accordion with Motion) */}
                      <AnimatePresence>
                        {item.dropdown && mobileExpander === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-6 pt-8 pl-4">
                              {item.dropdown.map((sub, i) => (
                                <Link
                                  key={i}
                                  to={sub.link} // Dynamic Link from MasterData
                                  onClick={() => {
                                    setIsOpen(false); // Menu close
                                    setMobileExpander(null); // Accordion reset
                                  }}
                                  className="group flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
                                    <span className="text-[12px] uppercase tracking-[0.3em] text-charcoal/60 group-hover:text-charcoal group-hover:font-black transition-all">
                                      {sub.name}
                                    </span>
                                  </div>
                                  <ArrowUpRight
                                    size={14}
                                    className="text-gold/40 group-hover:text-gold transition-colors"
                                  />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-8 bg-charcoal text-ivory">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-6 font-bold">
                  Connect with us
                </p>
                <div className="flex gap-8">
                  <Instagram
                    size={18}
                    className="hover:text-gold cursor-pointer transition-colors"
                  />
                  <Facebook
                    size={18}
                    className="hover:text-gold cursor-pointer transition-colors"
                  />
                  <Twitter
                    size={18}
                    className="hover:text-gold cursor-pointer transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
