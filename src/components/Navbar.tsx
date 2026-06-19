"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Search,
  Home, Image, BookOpen, Globe, Info,
  Wrench, Sparkles, Crown, Flower2, Circle,
  Diamond, Hand, Fingerprint, Footprints,
  Baby, Star, Moon, Heart, Gem,
  Triangle, Palette, Layers, Hexagon, Wand2,
  CalendarHeart, PartyPopper, Gift, Sun, Ribbon,
  Users, Clock,
} from "lucide-react";
import Logo from "@/components/Logo";
import { mehndiTools, mehndiToolCategories } from "@/data/mehndiTools";

const categoryItems = [
  { href: "/mehndi-designs/arabic", label: "Arabic", icon: Moon },
  { href: "/mehndi-designs/indian", label: "Indian", icon: Flower2 },
  { href: "/mehndi-designs/pakistani", label: "Pakistani", icon: Star },
  { href: "/mehndi-designs/bridal", label: "Bridal", icon: Crown },
  { href: "/mehndi-designs/moroccan", label: "Moroccan", icon: Hexagon },
  { href: "/mehndi-designs/gulf", label: "Gulf Style", icon: Sparkles },
  { href: "/mehndi-designs/african", label: "African", icon: Globe },
  { href: "/mehndi-designs/turkish", label: "Turkish", icon: Diamond },
  { href: "/mehndi-designs/rajasthani", label: "Rajasthani", icon: Gem },
  { href: "/mehndi-designs/indonesian", label: "Indonesian", icon: Layers },
  { href: "/mehndi-designs/simple", label: "Simple", icon: Circle },
  { href: "/mehndi-designs/modern", label: "Modern", icon: Wand2 },
  { href: "/mehndi-designs/traditional", label: "Traditional", icon: Palette },
  { href: "/mehndi-designs/minimal", label: "Minimal", icon: Fingerprint },
  { href: "/mehndi-designs/floral", label: "Floral", icon: Flower2 },
  { href: "/mehndi-designs/mandala", label: "Mandala", icon: Circle },
  { href: "/mehndi-designs/geometric", label: "Geometric", icon: Triangle },
  { href: "/mehndi-designs/jewelry", label: "Jewelry Style", icon: Gem },
  { href: "/mehndi-designs/royal", label: "Royal", icon: Crown },
  { href: "/mehndi-designs/full-hand", label: "Full Hand", icon: Hand },
  { href: "/mehndi-designs/back-hand", label: "Back Hand", icon: Hand },
  { href: "/mehndi-designs/front-hand", label: "Front Hand", icon: Hand },
  { href: "/mehndi-designs/finger", label: "Finger", icon: Fingerprint },
  { href: "/mehndi-designs/foot", label: "Foot & Leg", icon: Footprints },
  { href: "/mehndi-designs/eid", label: "Eid Special", icon: Moon },
  { href: "/mehndi-designs/kids", label: "Kids", icon: Baby },
];

const occasionItems = [
  { href: "/occasions/wedding", label: "Wedding", icon: Heart },
  { href: "/occasions/eid", label: "Eid", icon: Moon },
  { href: "/occasions/karva-chauth", label: "Karva Chauth", icon: CalendarHeart },
  { href: "/occasions/diwali", label: "Diwali", icon: Sun },
  { href: "/occasions/teej", label: "Teej", icon: Flower2 },
  { href: "/occasions/engagement", label: "Engagement", icon: Gem },
  { href: "/occasions/party", label: "Party", icon: PartyPopper },
  { href: "/occasions/raksha-bandhan", label: "Raksha Bandhan", icon: Ribbon },
];

const bodyPartItems = [
  { href: "/body/front-hand", label: "Front Hand", icon: Hand },
  { href: "/body/back-hand", label: "Back Hand", icon: Hand },
  { href: "/body/full-hand", label: "Full Hand", icon: Hand },
  { href: "/body/finger", label: "Finger", icon: Fingerprint },
  { href: "/body/foot", label: "Foot & Leg", icon: Footprints },
  { href: "/body/arm", label: "Arm & Wrist", icon: Users },
];

type DropdownKey = "designs" | "occasions" | "body" | "tools" | null;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
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

  const toggleDropdown = (key: DropdownKey) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const toggleMobileSection = (key: DropdownKey) => {
    setMobileExpanded(mobileExpanded === key ? null : key);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "shadow-md shadow-black/5" : "backdrop-blur-sm border-b border-gray-200/50"
        }`}
        style={{ backgroundColor: "#FCF2E5" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={navRef}>
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="outline-none flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {/* Home */}
              <Link href="/" className={`px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-lg ${pathname === "/" ? "text-gold font-bold" : "text-slate-600 hover:text-black hover:bg-gray-100/60"}`}>
                Home
              </Link>

              {/* Designs Mega Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("designs")}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-lg ${
                    isActive("/mehndi-designs") || isActive("/designs") ? "text-gold font-bold" : "text-slate-600 hover:text-black hover:bg-gray-100/60"
                  }`}
                >
                  Designs
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "designs" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "designs" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50 p-5"
                      style={{ backgroundColor: "#FCF2E5" }}
                    >
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/60">
                        <h3 className="font-serif text-lg font-bold text-slate-900">Mehndi Design Categories</h3>
                        <Link href="/mehndi-designs" className="text-xs font-medium text-gold hover:underline" onClick={() => setActiveDropdown(null)}>
                          View All 26 Categories →
                        </Link>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {categoryItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-gold/10 hover:text-gold transition-all group"
                            >
                              <Icon size={16} className="text-slate-400 group-hover:text-gold transition-colors shrink-0" />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Occasions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("occasions")}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-lg ${
                    isActive("/occasions") ? "text-gold font-bold" : "text-slate-600 hover:text-black hover:bg-gray-100/60"
                  }`}
                >
                  Occasions
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "occasions" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "occasions" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[320px] border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50 p-4"
                      style={{ backgroundColor: "#FCF2E5" }}
                    >
                      <h3 className="font-serif text-sm font-bold text-slate-900 mb-3 px-2">By Occasion</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {occasionItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-gold/10 hover:text-gold transition-all group"
                            >
                              <Icon size={15} className="text-slate-400 group-hover:text-gold transition-colors shrink-0" />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Body Part Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("body")}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-lg ${
                    isActive("/body") ? "text-gold font-bold" : "text-slate-600 hover:text-black hover:bg-gray-100/60"
                  }`}
                >
                  Body Part
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "body" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "body" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[260px] border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50 p-4"
                      style={{ backgroundColor: "#FCF2E5" }}
                    >
                      <h3 className="font-serif text-sm font-bold text-slate-900 mb-3 px-2">By Placement</h3>
                      {bodyPartItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-gold/10 hover:text-gold transition-all group"
                          >
                            <Icon size={15} className="text-slate-400 group-hover:text-gold transition-colors shrink-0" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Styles */}
              <Link href="/styles" className={`px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-lg ${isActive("/styles") ? "text-gold font-bold" : "text-slate-600 hover:text-black hover:bg-gray-100/60"}`}>
                Styles
              </Link>

              {/* Blog */}
              <Link href="/blog" className={`px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-lg ${isActive("/blog") ? "text-gold font-bold" : "text-slate-600 hover:text-black hover:bg-gray-100/60"}`}>
                Blog
              </Link>

              {/* Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("tools")}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-lg ${
                    isActive("/tools") ? "text-gold font-bold" : "text-slate-600 hover:text-black hover:bg-gray-100/60"
                  }`}
                >
                  Tools
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "tools" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "tools" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-3 w-[80vw] max-w-5xl border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50 p-6"
                      style={{ backgroundColor: "#FCF2E5" }}
                    >
                      <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200/60">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-slate-900">Mehndi Design Tools</h3>
                          <p className="text-sm text-slate-500 mt-1">100+ free generators, finders, and previews</p>
                        </div>
                        <Link href="/tools" className="px-5 py-2 bg-gold/10 text-gold hover:bg-gold hover:text-white rounded-lg font-medium transition-colors text-sm" onClick={() => setActiveDropdown(null)}>
                          View All Tools
                        </Link>
                      </div>
                      <div className="grid grid-cols-4 gap-x-8 gap-y-8 max-h-[55vh] overflow-y-auto pr-2">
                        {mehndiToolCategories.map((cat) => {
                          const catTools = mehndiTools.filter(t => t.category === cat.id);
                          if (catTools.length === 0) return null;
                          return (
                            <div key={cat.id}>
                              <h4 className="flex items-center gap-2 font-semibold text-slate-900 border-b border-gray-200/60 pb-2 mb-2 text-sm">
                                <span>{cat.emoji}</span>{cat.label}
                              </h4>
                              <div className="flex flex-col gap-1">
                                {catTools.slice(0, 8).map((tool) => (
                                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="text-sm text-slate-600 hover:text-gold hover:translate-x-0.5 transition-all py-1" onClick={() => setActiveDropdown(null)}>
                                    <span className="opacity-60 mr-1.5 text-xs">{tool.emoji}</span>
                                    {tool.title.replace(/ Generator| Preview| Tool| Finder/g, "")}
                                  </Link>
                                ))}
                                {catTools.length > 8 && (
                                  <Link href="/tools" className="text-xs font-medium text-gold mt-1 hover:underline" onClick={() => setActiveDropdown(null)}>
                                    + {catTools.length - 8} more
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

            {/* Desktop Search */}
            <div className="hidden lg:flex items-center justify-end flex-shrink-0">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 xl:w-56 pl-10 pr-4 py-2 bg-gray-100/80 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-slate-700 placeholder-slate-400 group-hover:bg-gray-100"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-gold transition-colors" />
              </form>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden text-slate-800 p-2 hover:text-gold transition-colors ml-4" aria-label="Toggle menu">
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 border-l border-gray-100 z-50 lg:hidden overflow-y-auto"
              style={{ backgroundColor: "#FCF2E5" }}
            >
              <div className="flex flex-col h-full pt-20 px-5">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-5">
                  <input type="text" placeholder="Search designs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-slate-700 placeholder-slate-400" />
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </form>

                {/* Home */}
                <Link href="/" className={`flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium transition-all ${pathname === "/" ? "text-gold bg-gold/5" : "text-slate-600 hover:bg-gray-50"}`}>
                  <Home size={18} className={pathname === "/" ? "text-gold" : "text-slate-400"} /> Home
                </Link>

                {/* Designs Accordion */}
                <MobileAccordion
                  label="Designs"
                  icon={<Image size={18} />}
                  isOpen={mobileExpanded === "designs"}
                  onToggle={() => toggleMobileSection("designs")}
                  isActive={isActive("/mehndi-designs") || isActive("/designs")}
                >
                  <Link href="/mehndi-designs" className="block py-2 px-3 text-sm font-medium text-gold hover:underline" onClick={() => setIsMobileOpen(false)}>View All 26 Categories →</Link>
                  {categoryItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} className="flex items-center gap-2 py-2 px-3 text-sm text-slate-600 hover:text-gold transition-colors" onClick={() => setIsMobileOpen(false)}>
                        <Icon size={14} className="text-slate-400" /> {item.label}
                      </Link>
                    );
                  })}
                </MobileAccordion>

                {/* Occasions Accordion */}
                <MobileAccordion
                  label="Occasions"
                  icon={<CalendarHeart size={18} />}
                  isOpen={mobileExpanded === "occasions"}
                  onToggle={() => toggleMobileSection("occasions")}
                  isActive={isActive("/occasions")}
                >
                  {occasionItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} className="flex items-center gap-2 py-2 px-3 text-sm text-slate-600 hover:text-gold transition-colors" onClick={() => setIsMobileOpen(false)}>
                        <Icon size={14} className="text-slate-400" /> {item.label}
                      </Link>
                    );
                  })}
                </MobileAccordion>

                {/* Body Part Accordion */}
                <MobileAccordion
                  label="Body Part"
                  icon={<Hand size={18} />}
                  isOpen={mobileExpanded === "body"}
                  onToggle={() => toggleMobileSection("body")}
                  isActive={isActive("/body")}
                >
                  {bodyPartItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} className="flex items-center gap-2 py-2 px-3 text-sm text-slate-600 hover:text-gold transition-colors" onClick={() => setIsMobileOpen(false)}>
                        <Icon size={14} className="text-slate-400" /> {item.label}
                      </Link>
                    );
                  })}
                </MobileAccordion>

                {/* Styles */}
                <Link href="/styles" className={`flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium transition-all ${isActive("/styles") ? "text-gold bg-gold/5" : "text-slate-600 hover:bg-gray-50"}`}>
                  <Globe size={18} className={isActive("/styles") ? "text-gold" : "text-slate-400"} /> Styles
                </Link>

                {/* Blog */}
                <Link href="/blog" className={`flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium transition-all ${isActive("/blog") ? "text-gold bg-gold/5" : "text-slate-600 hover:bg-gray-50"}`}>
                  <BookOpen size={18} className={isActive("/blog") ? "text-gold" : "text-slate-400"} /> Blog
                </Link>

                {/* Tools Accordion */}
                <MobileAccordion
                  label="Tools"
                  icon={<Wrench size={18} />}
                  isOpen={mobileExpanded === "tools"}
                  onToggle={() => toggleMobileSection("tools")}
                  isActive={isActive("/tools")}
                >
                  <Link href="/tools" className="block py-2 px-3 text-sm font-medium text-gold hover:underline" onClick={() => setIsMobileOpen(false)}>View All 100+ Tools →</Link>
                  {mehndiToolCategories.map((cat) => {
                    const catTools = mehndiTools.filter(t => t.category === cat.id);
                    if (!catTools.length) return null;
                    return (
                      <div key={cat.id} className="mt-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">{cat.emoji} {cat.label}</p>
                        {catTools.slice(0, 4).map(tool => (
                          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block text-sm text-slate-600 py-1.5 px-3 hover:text-gold transition-colors" onClick={() => setIsMobileOpen(false)}>
                            {tool.title}
                          </Link>
                        ))}
                        {catTools.length > 4 && <p className="text-xs text-gold px-3 mt-0.5">+ {catTools.length - 4} more</p>}
                      </div>
                    );
                  })}
                </MobileAccordion>

                {/* About */}
                <Link href="/about" className={`flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium transition-all ${isActive("/about") ? "text-gold bg-gold/5" : "text-slate-600 hover:bg-gray-50"}`}>
                  <Info size={18} className={isActive("/about") ? "text-gold" : "text-slate-400"} /> About
                </Link>

                <div className="mt-auto pb-8 pt-8">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-4" />
                  <p className="text-xs text-slate-400 text-center">Mehndi Design Henna</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileAccordion({ label, icon, isOpen, onToggle, isActive, children }: {
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-all ${isActive ? "text-gold bg-gold/5" : "text-slate-600 hover:bg-gray-50"}`}
      >
        <span className="flex items-center gap-3">
          <span className={isActive ? "text-gold" : "text-slate-400"}>{icon}</span>
          {label}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50/50 rounded-xl mt-1 mb-2 py-2 px-1 max-h-60 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
