"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

// NOTE: The three floating decorative dots below use CSS `animate-float`
// (a transform-based keyframe) instead of framer-motion's `animate` prop.
// This keeps the animation on the GPU compositor thread and avoids the
// Lighthouse "Avoid non-composited animations" warning.

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-dark/20 to-background animate-gradient" />

      {/* Gold shimmer overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.1)_0%,transparent_50%)]" />

      {/* Floating mandala decorations */}
      <div className="absolute top-20 left-10 w-40 h-40 mandala animate-spin-slow opacity-20 hidden md:block" />
      <div className="absolute bottom-32 right-10 w-56 h-56 mandala animate-spin-slow opacity-15 hidden md:block" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 mandala animate-spin-slow opacity-10 hidden lg:block" style={{ animationDuration: "25s" }} />

      {/* Floating dots — CSS-only animations (compositor-thread, no JS overhead) */}
      <div
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold/30 animate-float"
        style={{ animationDuration: '6s' }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-purple/20 animate-float"
        style={{ animationDuration: '5s', animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-gold-light/20 animate-float"
        style={{ animationDuration: '7s', animationDelay: '2s' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.2em] uppercase text-gold border border-gold/30 rounded-full"
          >
            5000+ Mehndi Designs from Around the World
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
        >
          <span className="text-foreground">Easy Mehndi Designs</span>
          <br />
          <span className="text-gradient-gold">& the Art of Henna</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Explore stunning mehndi patterns from India, Arabia, Morocco, and beyond.
          Traditional bridal art, modern minimal designs, and everything in between.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/gallery"
            className="group flex items-center gap-2 bg-gold text-background font-semibold px-8 py-3.5 rounded-full hover:bg-gold-light transition-all hover:shadow-lg hover:shadow-gold/25"
          >
            Explore Gallery
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/blog"
            className="group flex items-center gap-2 border border-border text-foreground font-semibold px-8 py-3.5 rounded-full hover:border-gold/50 hover:text-gold transition-all"
          >
            <BookOpen size={18} />
            Read Blog
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted/40 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1 h-2 rounded-full bg-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
