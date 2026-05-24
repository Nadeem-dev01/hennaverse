"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Wrench, Search } from "lucide-react";
import Logo from "@/components/Logo";
import { mehndiTools, mehndiToolCategories } from "@/data/mehndiTools";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/styles", label: "Styles" },
  { href: "/eidhennaz", label: "Eid Special" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsToolsOpen(false);
    setIsMobileToolsOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/gallery?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileOpen(false);
    }
  };

  const isToolsActive = pathname.startsWith("/tools");

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "shadow-md shadow-black/5"
            : "backdrop-blur-sm border-b border-gray-200/50"
        }`}
        style={{ backgroundColor: "#FCF2E5" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="outline-none flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative py-2 text-sm font-medium tracking-wide uppercase transition-colors"
                  >
                    <span className={isActive ? "text-gold font-bold" : "text-slate-600 hover:text-black"}>
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gold rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Tools Mega Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-colors flex items-center gap-1 ${
                    isToolsActive ? "text-gold font-bold" : "text-slate-600 hover:text-black"
                  }`}
                >
                  Tools
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isToolsOpen ? "rotate-180" : ""}`}
                  />
                  {isToolsActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gold rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {isToolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full -right-32 mt-4 w-[80vw] max-w-5xl border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50 p-6"
                      style={{ backgroundColor: "#FCF2E5" }}
                    >
                      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-slate-900">Mehndi Design Tools</h3>
                          <p className="text-sm text-slate-500 mt-1">Explore our collection of 100+ free mehndi tools and generators.</p>
                        </div>
                        <Link 
                          href="/tools" 
                          className="px-5 py-2 bg-gold/10 text-gold hover:bg-gold hover:text-white rounded-lg font-medium transition-colors text-sm"
                          onClick={() => setIsToolsOpen(false)}
                        >
                          View All Tools
                        </Link>
                      </div>

                      <div className="grid grid-cols-4 gap-x-8 gap-y-10 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {mehndiToolCategories.map((cat) => {
                          const catTools = mehndiTools.filter(t => t.category === cat.id);
                          if (catTools.length === 0) return null;
                          return (
                            <div key={cat.id} className="flex flex-col gap-3">
                              <h4 className="flex items-center gap-2 font-semibold text-slate-900 border-b border-gray-100 pb-2">
                                <span>{cat.emoji}</span>
                                {cat.label}
                              </h4>
                              <div className="flex flex-col gap-1.5">
                                {catTools.slice(0, 10).map((tool) => (
                                  <Link
                                    key={tool.slug}
                                    href={`/tools/${tool.slug}`}
                                    className="text-sm text-slate-600 hover:text-gold hover:translate-x-1 transition-all"
                                    onClick={() => setIsToolsOpen(false)}
                                  >
                                    <span className="opacity-70 mr-1.5 text-xs">{tool.emoji}</span>
                                    {tool.title.replace(' Generator', '').replace(' Preview', '').replace(' Tool', '').replace(' Finder', '')}
                                  </Link>
                                ))}
                                {catTools.length > 10 && (
                                  <Link 
                                    href={`/tools#${cat.id}`}
                                    className="text-xs font-medium text-gold mt-1 hover:underline"
                                    onClick={() => setIsToolsOpen(false)}
                                  >
                                    + {catTools.length - 10} more
                                  </Link>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center justify-end flex-shrink-0">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-gray-100/80 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-slate-700 placeholder-slate-400 group-hover:bg-gray-100"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-gold transition-colors" />
                <button type="submit" className="hidden">Search</button>
              </form>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-slate-800 p-2 hover:text-gold transition-colors ml-4"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 border-l border-gray-100 z-50 md:hidden overflow-y-auto"
              style={{ backgroundColor: "#FCF2E5" }}
            >
              <div className="flex flex-col h-full pt-20 px-6">
                
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-slate-700 placeholder-slate-400"
                  />
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </form>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`block py-3 px-4 rounded-xl text-base font-medium transition-all ${
                            isActive
                              ? "text-gold bg-gold/5"
                              : "text-slate-600 hover:text-black hover:bg-gray-50"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile Tools accordion */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="mt-2"
                  >
                    <button
                      onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                      className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-all ${
                        isToolsActive ? "text-gold bg-gold/5" : "text-slate-600 hover:text-black hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Wrench size={18} className={isToolsActive ? "text-gold" : "text-slate-400"} />
                        Mehndi Tools
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${isMobileToolsOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isMobileToolsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pl-4 pr-2 py-4 bg-gray-50/50 rounded-xl mt-2">
                            <Link 
                              href="/tools" 
                              className="font-medium text-gold text-sm py-2 px-3 bg-gold/10 rounded-lg text-center"
                            >
                              View All 100+ Tools →
                            </Link>
                            
                            {mehndiToolCategories.map((cat) => {
                              const catTools = mehndiTools.filter(t => t.category === cat.id);
                              if (catTools.length === 0) return null;
                              return (
                                <div key={cat.id}>
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-2">
                                    {cat.emoji} {cat.label}
                                  </h4>
                                  <div className="flex flex-col gap-1">
                                    {catTools.slice(0, 5).map(tool => (
                                      <Link
                                        key={tool.slug}
                                        href={`/tools/${tool.slug}`}
                                        className="text-sm text-slate-600 py-1.5 px-2 hover:text-gold transition-colors"
                                        onClick={() => setIsMobileOpen(false)}
                                      >
                                        {tool.title}
                                      </Link>
                                    ))}
                                    {catTools.length > 5 && (
                                      <Link 
                                        href="/tools" 
                                        className="text-xs text-gold py-1 px-2 hover:underline"
                                        onClick={() => setIsMobileOpen(false)}
                                      >
                                        + See all {cat.label.toLowerCase()} tools
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Decorative element at bottom */}
                <div className="mt-auto pb-8 pt-8">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6" />
                  <p className="text-xs text-slate-400 text-center font-medium">
                    HennaVerse
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
