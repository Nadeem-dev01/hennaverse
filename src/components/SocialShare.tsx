"use client";

import { useState } from "react";
import { Share2, Check, Copy, MessageCircle, Send } from "lucide-react";

interface SocialShareProps {
  title: string;
  excerpt?: string;
  urlPath: string;
}

export default function SocialShare({ title, excerpt = "", urlPath }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${urlPath}`;
    }
    return `https://www.mehndidesignhenna.com${urlPath}`;
  };

  const shareUrl = getFullUrl();
  const shareText = `${title} - Mehndi Design Henna`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-y border-border/40 my-8">
      <span className="text-sm font-medium text-muted flex items-center gap-2">
        <Share2 size={16} className="text-gold" /> Share Article:
      </span>

      <div className="flex items-center gap-2">
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-surface hover:bg-gold/10 text-foreground hover:text-gold border border-border/40 transition-colors text-xs flex items-center gap-1.5"
          title="Share on WhatsApp"
        >
          <MessageCircle size={15} className="text-emerald-500" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-surface hover:bg-gold/10 text-foreground hover:text-gold border border-border/40 transition-colors text-xs flex items-center gap-1.5"
          title="Share on X (Twitter)"
        >
          <Send size={15} className="text-sky-400" />
          <span className="hidden sm:inline">X / Twitter</span>
        </a>

        {/* Pinterest */}
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-surface hover:bg-gold/10 text-foreground hover:text-gold border border-border/40 transition-colors text-xs flex items-center gap-1.5"
          title="Share on Pinterest"
        >
          <span className="font-bold text-xs text-rose-500">P</span>
          <span className="hidden sm:inline">Pinterest</span>
        </a>

        {/* Native / Copy Link */}
        <button
          onClick={handleNativeShare}
          className="p-2.5 rounded-xl bg-surface hover:bg-gold/10 text-foreground hover:text-gold border border-border/40 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
          title="Copy Link"
        >
          {copied ? (
            <>
              <Check size={15} className="text-emerald-500" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={15} className="text-gold" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
