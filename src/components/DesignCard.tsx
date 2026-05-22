"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Accept designs from both static data and API hook
interface DesignType {
  id: number;
  title: string;
  description: string;
  country: string;
  style: string;
  occasion: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  imageUrl: string;
  tags: string[];
  views?: number;
  likes?: number;
  photographer?: string | null;
}

interface DesignCardProps {
  design: DesignType;
  index?: number;
  onClick?: () => void;
}

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-500/20 text-emerald-400",
  Medium: "bg-amber-500/20 text-amber-400",
  Hard: "bg-red-500/20 text-red-400",
  Expert: "bg-purple/20 text-purple",
};

const gradients = [
  "from-purple-dark/40 via-surface to-gold/10",
  "from-gold/20 via-surface to-purple-dark/30",
  "from-surface via-purple/10 to-surface",
  "from-gold/10 via-purple-dark/20 to-surface",
  "from-purple/15 via-surface to-gold/15",
];

export default function DesignCard({ design, index = 0, onClick }: DesignCardProps) {
  const gradient = gradients[index % gradients.length];
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hasRealImage = design.imageUrl && design.imageUrl.startsWith('http');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative bg-surface rounded-xl border border-border overflow-hidden cursor-pointer transition-all hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5"
    >
      {/* Image area */}
      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${gradient} overflow-hidden`}
      >
        {/* Real image from Pixabay/Supabase */}
        {hasRealImage && !imgError && (
          <img
            src={design.imageUrl}
            alt={design.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Shimmer loading animation */}
        {hasRealImage && !imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-border to-surface animate-pulse" />
        )}

        {/* Fallback mandala pattern if no real image */}
        {(!hasRealImage || imgError) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-24 h-24 mandala" />
          </div>
        )}

        {/* Country flag */}
        <div className="absolute top-3 left-3 bg-surface/80 backdrop-blur-sm px-2 py-1 rounded-md text-sm z-10">
          {design.country}
        </div>

        {/* Difficulty badge */}
        <div
          className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium z-10 ${
            difficultyColor[design.difficulty] || "bg-muted/20 text-muted"
          }`}
        >
          {design.difficulty}
        </div>

        {/* Photographer credit */}
        {design.photographer && imgLoaded && (
          <div className="absolute bottom-2 right-2 bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-muted z-10">
            📷 {design.photographer}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20">
          <div className="text-center">
            <p className="text-foreground/90 text-sm leading-relaxed line-clamp-4">
              {design.description}
            </p>
            {(design.views !== undefined || design.likes !== undefined) && (
              <div className="flex items-center justify-center gap-4 mt-3 text-muted text-xs">
                {design.views !== undefined && <span>👁 {design.views.toLocaleString()}</span>}
                {design.likes !== undefined && <span>❤️ {design.likes.toLocaleString()}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-gold transition-colors mb-1 line-clamp-1">
          {design.title}
        </h3>
        <p className="text-muted text-xs mb-3">
          {design.style} • {design.occasion}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {design.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-purple/10 text-purple border border-purple/20"
            >
              {tag}
            </span>
          ))}
          {design.tags.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] text-muted">
              +{design.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
