import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Search, Palette, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Mehndi Design Henna",
  description: "The mehndi design or page you were looking for could not be found. Browse our gallery of 5000+ henna designs or explore our blog.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.06)_0%,transparent_50%)]" />

      <div className="max-w-xl w-full text-center relative z-10 py-16">
        {/* Large 404 Number with Mandala outline effect */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute w-64 h-64 border border-gold/10 rounded-full animate-spin-slow opacity-60" />
          <div className="absolute w-48 h-48 border border-purple/10 rounded-full animate-spin-slow opacity-40" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
          
          <h1 className="font-serif text-8xl sm:text-9xl font-bold tracking-wider text-gradient-gold select-none">
            404
          </h1>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-foreground">
          Design Not Found
        </h2>
        
        <p className="text-muted text-base sm:text-lg mb-10 max-w-md mx-auto">
          We couldn&apos;t find the mehndi design or page you were looking for. It might have been moved, renamed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-gold text-background font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-all hover:shadow-lg hover:shadow-gold/20"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/gallery"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:border-gold/50 hover:text-gold transition-all"
          >
            <Search size={18} />
            Search Designs
          </Link>
        </div>

        {/* Suggestion list */}
        <div className="mt-12 pt-8 border-t border-border/60 max-w-sm mx-auto">
          <p className="text-muted text-xs font-semibold uppercase tracking-wider mb-4">
            Popular Categories
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/mehndi-designs/arabic"
              className="px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-medium hover:border-gold/30 hover:text-gold transition-all"
            >
              Arabic Designs
            </Link>
            <Link
              href="/mehndi-designs/bridal"
              className="px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-medium hover:border-gold/30 hover:text-gold transition-all"
            >
              Bridal Designs
            </Link>
            <Link
              href="/mehndi-designs/simple"
              className="px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-medium hover:border-gold/30 hover:text-gold transition-all"
            >
              Simple Patterns
            </Link>
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-medium hover:border-gold/30 hover:text-gold transition-all"
            >
              Mehndi Tutorials
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
