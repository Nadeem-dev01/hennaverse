"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle";
  className?: string;
}

export default function AdSlot({ adSlot, adFormat = "auto", className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const insElement = adRef.current?.querySelector("ins");
        if (insElement && !insElement.getAttribute("data-adsbygoogle-status")) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (err: any) {
      if (err.message && err.message.includes("already have ads")) {
        // Ignore duplicate push error in React Strict Mode
      } else {
        console.error("AdSense error", err);
      }
    }
  }, []);

  return (
    <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] text-muted mb-2 uppercase tracking-widest">Advertisement</span>
      <div 
        ref={adRef}
        className="w-full min-h-[100px] bg-surface/50 border border-border/50 rounded-lg flex items-center justify-center overflow-hidden"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Placeholder, user will replace
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
