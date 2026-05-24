"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
  const [imgError, setImgError] = useState(false);
  const hasRealImage = !!design.imageUrl;

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
        {/* Real image */}
        {hasRealImage && !imgError && (
          <Image
            src={design.imageUrl}
            alt={design.title}
            fill
            priority={index < 4}
            quality={60}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
            className="object-cover"
          />
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
        {design.photographer && (
          <div className="absolute bottom-2 right-2 bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-muted z-10">
            📷 {design.photographer}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-20">
          <div className="text-center mb-3">
            <p className="text-foreground/90 text-sm leading-relaxed line-clamp-3">
              {design.description}
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!design.imageUrl) return;
                
                const img = new window.Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                  const canvas = document.createElement("canvas");
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext("2d");
                  if (!ctx) return;
                  ctx.fillStyle = "#FFFFFF";
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, 0, 0);
                  
                  canvas.toBlob((blob) => {
                    if (!blob) return;
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    const cleanTitle = design.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    link.download = `mehndi-design-${cleanTitle}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  }, "image/jpeg", 0.95);
                };
                img.onerror = () => {
                  // Fallback
                  const link = document.createElement("a");
                  link.href = design.imageUrl;
                  link.download = `mehndi-design-${design.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                };
                img.src = design.imageUrl;
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-background text-xs font-bold rounded-lg hover:bg-gold-light transition-colors shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const shareUrl = `${window.location.origin}/gallery?search=${encodeURIComponent(design.title)}`;
                navigator.clipboard.writeText(shareUrl).then(() => {
                  alert("Link copied to clipboard!");
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-foreground hover:text-gold text-xs font-bold rounded-lg transition-colors shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
              Share
            </button>
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
