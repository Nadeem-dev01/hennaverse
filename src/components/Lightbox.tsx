"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import type { Design } from "@/data/designs";

interface LightboxProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
}

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
  Expert: "bg-purple/20 text-purple border-purple/30",
};

export default function Lightbox({ design, isOpen, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && design && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-surface rounded-2xl border border-border overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:text-gold transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Image placeholder */}
            <div className="aspect-[16/10] bg-gradient-to-br from-purple-dark/40 via-surface to-gold/15 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-32 h-32 mandala" />
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 text-sm bg-surface/80 backdrop-blur-sm rounded-md">
                  {design.country}
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-md border ${
                    difficultyColor[design.difficulty] || "bg-muted/20 text-muted border-muted/30"
                  }`}
                >
                  {design.difficulty}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                {design.title}
              </h2>
              <p className="text-muted text-xs uppercase tracking-wider mb-4">
                {design.style} • {design.occasion}
              </p>
              <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                {design.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {design.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-purple/10 text-purple border border-purple/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
