"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto glass border border-border shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex-1">
          <h3 className="text-lg font-serif font-bold text-gold mb-2">We value your privacy</h3>
          <p className="text-sm text-muted">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link> for more details.
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-6 py-2.5 bg-surface border border-border rounded-lg text-sm font-medium hover:border-gold hover:text-gold transition-colors"
          >
            Manage
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-6 py-2.5 bg-gold text-background rounded-lg text-sm font-semibold hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            Accept All
          </button>
        </div>

        <button 
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 p-2 text-muted hover:text-foreground transition-colors md:hidden"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
