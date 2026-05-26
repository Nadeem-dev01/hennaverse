"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, Copy, Check } from "lucide-react";


interface LightboxDesign {
  id: number;
  title: string;
  description: string;
  country: string;
  style: string;
  occasion: string;
  difficulty: string;
  imageUrl: string;
  tags: string[];
  views?: number;
  likes?: number;
  photographer?: string | null;
}

interface LightboxProps {
  design: LightboxDesign | null;
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
  const [copied, setCopied] = useState(false);

  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          window.open(imageUrl, "_blank");
          return;
        }
        // Fill white background (crucial for transparent PNGs converted to JPG)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            window.open(imageUrl, "_blank");
            return;
          }
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          link.setAttribute("download", `mehndi-design-${cleanTitle}.jpg`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, "image/jpeg", 0.95); // High quality JPG
      };
      img.onerror = () => {
        // Fallback directly to URL if canvas fails (e.g. strict CORS on external images)
        window.open(imageUrl, "_blank");
      };
      img.src = imageUrl;
    } catch (error) {
      console.error("Failed to download image:", error);
      window.open(imageUrl, "_blank");
    }
  };

  const handleShare = async (title: string, description: string) => {
    const shareUrl = `${window.location.origin}/gallery?search=${encodeURIComponent(title)}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} | HennaVerse`,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    if (!design) return;
    const shareUrl = `${window.location.origin}/gallery?search=${encodeURIComponent(design.title)}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

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

            {/* Image area */}
            <div className="aspect-[16/10] bg-gradient-to-br from-purple-dark/40 via-surface to-gold/15 relative overflow-hidden">
              {design.imageUrl ? (
                <Image
                  src={design.imageUrl}
                  alt={design.title}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-32 h-32 mandala" />
                </div>
              )}
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
              {design.photographer && (
                <div className="absolute bottom-4 right-4 bg-background/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted">
                  📷 {design.photographer}
                </div>
              )}
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
              <div className="flex flex-wrap gap-2 mb-6">
                {design.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-purple/10 text-purple border border-purple/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Download and Share */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-border mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleDownload(design.imageUrl, design.title)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-background font-bold text-sm transition-all duration-300 shadow-md shadow-gold/10 hover:shadow-lg hover:shadow-gold/25 cursor-pointer"
                  >
                    <Download size={18} />
                    Download Free
                  </button>
                  <button
                    onClick={() => handleShare(design.title, design.description)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border hover:border-gold/50 text-foreground hover:text-gold font-semibold text-sm transition-all duration-300 cursor-pointer"
                  >
                    <Share2 size={18} />
                    Share Design
                  </button>
                </div>

                {/* Quick Share Links */}
                <div className="flex items-center gap-2 justify-center sm:justify-end">
                  <button
                    onClick={() => handleCopyLink()}
                    className="p-2.5 rounded-lg bg-surface border border-border hover:border-gold/50 text-muted hover:text-gold transition-all duration-300 cursor-pointer"
                    title={copied ? "Copied!" : "Copy Link"}
                  >
                    {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `${design.title} - Beautiful Mehndi Design: ${window.location.origin}/gallery?search=${encodeURIComponent(design.title)}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-surface border border-border hover:border-gold/50 text-muted hover:text-[#25D366] transition-all duration-300 cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.713-1.463L0 24zm6.275-3.859c1.623.963 3.22 1.488 4.887 1.488 5.485 0 9.948-4.461 9.952-9.948.002-2.659-1.03-5.158-2.905-7.036C16.4 2.766 13.9 1.734 11.238 1.734 5.753 1.734 1.29 6.195 1.286 11.683c-.001 1.747.464 3.447 1.345 4.957l-.994 3.633 3.738-.981.282.167zm12.333-7.558c-.305-.153-1.808-.891-2.088-.992-.28-.102-.484-.153-.688.153-.203.305-.788.992-.966 1.196-.178.203-.356.229-.661.076-.305-.153-1.289-.475-2.456-1.517-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.621.137-.136.305-.356.457-.534.153-.178.203-.305.305-.509.102-.203.051-.381-.025-.533-.076-.153-.688-1.659-.942-2.269-.247-.595-.5-.515-.688-.525-.178-.009-.382-.01-.586-.01-.204 0-.535.076-.814.381-.28.305-1.068 1.042-1.068 2.542 0 1.5 1.093 2.947 1.246 3.151.153.203 2.15 3.284 5.209 4.605.728.314 1.296.502 1.739.643.731.233 1.396.2 1.921.122.585-.087 1.808-.738 2.062-1.45.254-.712.254-1.323.178-1.45-.076-.127-.28-.203-.586-.356z" />
                    </svg>
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                      `${window.location.origin}/gallery?search=${encodeURIComponent(design.title)}`
                    )}&media=${encodeURIComponent(
                      design.imageUrl.startsWith("http") ? design.imageUrl : `${window.location.origin}${design.imageUrl}`
                    )}&description=${encodeURIComponent(
                      `${design.title} - Beautiful Mehndi Design. ${design.description}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-surface border border-border hover:border-gold/50 text-muted hover:text-[#BD081C] transition-all duration-300 cursor-pointer"
                    title="Share on Pinterest"
                  >
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.636 0 12.017 0z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `${window.location.origin}/gallery?search=${encodeURIComponent(design.title)}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-surface border border-border hover:border-gold/50 text-muted hover:text-[#1877F2] transition-all duration-300 cursor-pointer"
                    title="Share on Facebook"
                  >
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
