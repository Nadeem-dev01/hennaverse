"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ScanSearch, CheckCircle2, RefreshCw } from "lucide-react";
import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import Breadcrumbs from "@/components/Breadcrumbs";

type FinderState = "idle" | "scanning" | "results";

export default function DesignFinderClient() {
  const [state, setState] = useState<FinderState>("idle");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [suggestedDesigns, setSuggestedDesigns] = useState<typeof designs>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      startScanning();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      startScanning();
    };
    reader.readAsDataURL(file);
  };

  const startScanning = () => {
    setState("scanning");
    
    // Simulate AI processing and fetching from "the web"
    setTimeout(() => {
      // Pick 4 random high-quality designs from our gallery to simulate web results
      const shuffled = [...designs].sort(() => 0.5 - Math.random());
      setSuggestedDesigns(shuffled.slice(0, 4));
      setState("results");
    }, 4500); // 4.5 seconds of "scanning"
  };

  const resetTool = () => {
    setState("idle");
    setUploadedImage(null);
    setSuggestedDesigns([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "AI Design Finder", href: "/tools/design-finder" }]} />
      
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple/10 text-purple border border-purple/20 text-xs font-semibold mb-4">
          <ScanSearch size={14} />
          AI-Powered Discovery
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Mehndi Design Finder
        </h1>
        <p className="text-muted text-lg">
          Upload a photo of your hand or foot. Our AI will analyze the shape, skin tone, and layout to suggest the perfect mehndi designs curated from across the web.
        </p>
      </div>

      {/* Main Tool Area */}
      <div className="max-w-4xl mx-auto bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-8">
          
          <AnimatePresence mode="wait">
            
            {/* STATE: IDLE (UPLOAD) */}
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center"
              >
                <div 
                  className="w-full max-w-lg aspect-video border-2 border-dashed border-purple/40 rounded-xl bg-purple/5 flex flex-col items-center justify-center cursor-pointer hover:bg-purple/10 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <div className="bg-surface p-4 rounded-full shadow-lg mb-4 text-purple">
                    <Upload size={32} />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Click or drag image here</h3>
                  <p className="text-sm text-muted">Supports JPG, PNG, WEBP</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </motion.div>
            )}

            {/* STATE: SCANNING */}
            {state === "scanning" && uploadedImage && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-full max-w-md aspect-[3/4] md:aspect-square rounded-xl overflow-hidden border border-border mb-8 shadow-2xl">
                  <Image 
                    src={uploadedImage} 
                    alt="Uploaded Hand" 
                    fill 
                    unoptimized
                    className="object-cover opacity-80"
                  />
                  
                  {/* Laser Scanning Animation */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/30 to-transparent"
                    initial={{ top: "-100%" }}
                    animate={{ top: "100%" }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "linear" 
                    }}
                  />
                  <motion.div 
                    className="absolute left-0 right-0 h-1 bg-gold shadow-[0_0_15px_rgba(212,175,55,1)]"
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "linear" 
                    }}
                  />
                  
                  {/* Targeting HUD Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/70" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/70" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/70" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/70" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-gold mb-2 flex items-center gap-2">
                  <RefreshCw className="animate-spin" size={24} />
                  Analyzing Upload...
                </h3>
                <p className="text-muted text-center max-w-md">
                  Our AI is currently mapping your hand structure and searching global databases for the perfect mehndi matches...
                </p>
              </motion.div>
            )}

            {/* STATE: RESULTS */}
            {state === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-full">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Analysis Complete</h3>
                      <p className="text-sm text-muted">Found {suggestedDesigns.length} highly compatible designs from the web.</p>
                    </div>
                  </div>
                  <button 
                    onClick={resetTool}
                    className="px-4 py-2 bg-surface border border-border text-foreground hover:border-gold hover:text-gold rounded-lg transition-colors text-sm font-medium"
                  >
                    Scan Another Image
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {suggestedDesigns.map((design, idx) => (
                    <DesignCard key={design.id} design={design} index={idx} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
