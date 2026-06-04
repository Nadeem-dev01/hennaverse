"use client";

import { Download, Share2, Check, Link2 } from "lucide-react";
import { useState } from "react";

export function useImageActions() {
  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const canvas = document.createElement("canvas");
      const img = new window.Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) { reject(new Error("no canvas context")); return; }
          ctx.drawImage(img, 0, 0);
          resolve();
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(blob);
      });

      canvas.toBlob((jpgBlob) => {
        if (!jpgBlob) return;
        const url = URL.createObjectURL(jpgBlob);
        const link = document.createElement("a");
        link.href = url;
        const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60);
        link.setAttribute("download", `${cleanTitle}.jpg`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/jpeg", 0.92);
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  const handleShare = async (title: string, description: string, urlPath: string) => {
    const shareUrl = `${window.location.origin}${urlPath}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} | HennaVerse`, text: description, url: shareUrl });
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  return { handleDownload, handleShare };
}

export function DownloadButton({ imageUrl, title, size = "md" }: { imageUrl: string; title: string; size?: "sm" | "md" }) {
  const { handleDownload } = useImageActions();
  const [downloading, setDownloading] = useState(false);

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDownloading(true);
    await handleDownload(imageUrl, title);
    setTimeout(() => setDownloading(false), 1500);
  };

  const sizeClasses = size === "sm"
    ? "p-1.5 rounded-lg"
    : "px-4 py-2.5 rounded-xl gap-2";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-gold text-black font-medium hover:bg-gold-light transition-all duration-300 cursor-pointer shadow-lg shadow-gold/20 hover:shadow-gold/40 ${sizeClasses}`}
      title="Download as JPG"
    >
      {downloading ? (
        <Check size={size === "sm" ? 14 : 18} className="text-black" />
      ) : (
        <Download size={size === "sm" ? 14 : 18} />
      )}
      {size === "md" && <span className="text-sm">{downloading ? "Downloaded!" : "Download JPG"}</span>}
    </button>
  );
}

export function ShareButton({ title, description, urlPath, size = "md" }: { title: string; description: string; urlPath: string; size?: "sm" | "md" }) {
  const { handleShare } = useImageActions();
  const [copied, setCopied] = useState(false);

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasCopied = await handleShare(title, description, urlPath);
    if (wasCopied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sizeClasses = size === "sm"
    ? "p-1.5 rounded-lg"
    : "px-4 py-2.5 rounded-xl gap-2";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center border border-border text-foreground hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer ${sizeClasses}`}
      title="Share Design"
    >
      {copied ? (
        <Check size={size === "sm" ? 14 : 18} className="text-green-400" />
      ) : (
        <Share2 size={size === "sm" ? 14 : 18} />
      )}
      {size === "md" && <span className="text-sm">{copied ? "Link Copied!" : "Share"}</span>}
    </button>
  );
}

export function ImageOverlayActions({ imageUrl, title, description, urlPath }: { imageUrl: string; title: string; description: string; urlPath: string }) {
  return (
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 z-10">
      <div className="flex justify-end gap-1.5">
        <DownloadButton imageUrl={imageUrl} title={title} size="sm" />
        <ShareButton title={title} description={description} urlPath={urlPath} size="sm" />
      </div>
      <span className="text-sm font-medium text-white truncate">{title}</span>
    </div>
  );
}
