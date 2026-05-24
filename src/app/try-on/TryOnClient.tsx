"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Camera, Download, RotateCw, Move, ZoomIn, SlidersHorizontal, Image as ImageIcon } from "lucide-react";
import { designs } from "@/data/designs";

export default function TryOnClient() {
  const [handImage, setHandImage] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  
  // Transformation states
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [posX, setPosX] = useState(50); // percentage
  const [posY, setPosY] = useState(50); // percentage
  const [opacity, setOpacity] = useState(0.85);
  const [blendMode, setBlendMode] = useState<"normal" | "multiply" | "darken">("multiply");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Use all designs for the try-on tool (blend-mode: multiply works well with JPGs)
  const overlayDesigns = designs;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setHandImage(event.target?.result as string);
        // Reset transformations
        setScale(1);
        setRotate(0);
        setPosX(50);
        setPosY(50);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    // In a real app, we'd draw this to a canvas and export. 
    // For this simple frontend version, we prompt the user.
    alert("To save your virtual try-on, please take a screenshot of the preview area!");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Virtual Mehndi Try-On
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Upload a photo of your hand, select a design, and see how it looks instantly. Adjust the size, rotation, and opacity for a realistic preview!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Editor Workspace */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            
            {/* The Canvas Area */}
            <div 
              ref={canvasRef}
              className="w-full aspect-[3/4] md:aspect-square bg-surface border-2 border-dashed border-border rounded-2xl relative overflow-hidden flex flex-col items-center justify-center"
            >
              {!handImage ? (
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera size={32} className="text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Upload Your Hand Photo</h3>
                  <p className="text-muted mb-8 max-w-sm mx-auto text-sm">
                    For best results, take a clear, well-lit photo of your hand resting flat on a surface.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl font-medium hover:bg-gold-light transition-colors"
                    >
                      <Upload size={18} />
                      Choose Photo
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>
              ) : (
                <>
                  {/* Hand Background Image */}
                  <img 
                    src={handImage} 
                    alt="Your Hand" 
                    className="absolute inset-0 w-full h-full object-cover z-0" 
                  />
                  
                  {/* Mehndi Overlay */}
                  {selectedDesign && (
                    <div 
                      className="absolute z-10 w-full h-full pointer-events-none"
                      style={{
                        mixBlendMode: blendMode
                      }}
                    >
                      <img 
                        src={selectedDesign} 
                        alt="Mehndi Overlay" 
                        className="absolute top-1/2 left-1/2 origin-center drop-shadow-md"
                        style={{
                          transform: `translate(-50%, -50%) translate(${(posX - 50) * 5}px, ${(posY - 50) * 5}px) scale(${scale}) rotate(${rotate}deg)`,
                          opacity: opacity,
                          maxWidth: '80%',
                          maxHeight: '80%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  )}

                  {/* Top right actions */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button 
                      onClick={() => setHandImage(null)}
                      className="p-2 bg-black/50 backdrop-blur-md text-white rounded-lg hover:bg-black/70 transition"
                      title="Change Photo"
                    >
                      <Upload size={18} />
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="p-2 bg-gold text-white rounded-lg hover:bg-gold-light transition"
                      title="Download Preview"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Controls Area (Only visible when hand is uploaded) */}
            {handImage && (
              <div className="bg-surface border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                  <SlidersHorizontal size={20} className="text-gold" />
                  <h3 className="font-bold text-lg text-foreground">Adjust Design Placement</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Scale */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted flex items-center gap-1"><ZoomIn size={14} /> Size</span>
                      <span className="text-gold font-medium">{Math.round(scale * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0.2" max="3" step="0.05" 
                      value={scale} onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>

                  {/* Rotate */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted flex items-center gap-1"><RotateCw size={14} /> Rotation</span>
                      <span className="text-gold font-medium">{rotate}°</span>
                    </div>
                    <input 
                      type="range" min="-180" max="180" step="1" 
                      value={rotate} onChange={(e) => setRotate(parseInt(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>

                  {/* X Position */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted flex items-center gap-1"><Move size={14} /> Horizontal Position</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="1" 
                      value={posX} onChange={(e) => setPosX(parseInt(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>

                  {/* Y Position */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted flex items-center gap-1"><Move size={14} /> Vertical Position</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="1" 
                      value={posY} onChange={(e) => setPosY(parseInt(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>

                  {/* Opacity */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Opacity / Darkness</span>
                      <span className="text-gold font-medium">{Math.round(opacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0.3" max="1" step="0.05" 
                      value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>

                  {/* Blend Mode */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted">Blend Mode (Realism)</span>
                    </div>
                    <div className="flex gap-2">
                      {(['normal', 'multiply', 'darken'] as const).map(mode => (
                        <button
                          key={mode}
                          onClick={() => setBlendMode(mode)}
                          className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                            blendMode === mode ? 'bg-gold text-white' : 'bg-surface border border-border text-muted hover:text-white'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Designs Gallery */}
          <div className="lg:col-span-5 xl:col-span-4 bg-surface border border-border rounded-2xl flex flex-col h-[600px] lg:h-auto">
            <div className="p-5 border-b border-border flex items-center gap-2 sticky top-0 bg-surface z-10 rounded-t-2xl">
              <ImageIcon className="text-gold" size={20} />
              <h3 className="font-bold text-lg text-foreground">Select Design Overlay</h3>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
              {overlayDesigns.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {overlayDesigns.map((design, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDesign(design.imageUrl)}
                      className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 bg-background ${
                        selectedDesign === design.imageUrl ? 'border-gold scale-95 shadow-lg shadow-gold/20' : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <img 
                        src={design.imageUrl} 
                        alt={design.title} 
                        className="w-full h-full object-contain p-2"
                      />
                      {selectedDesign === design.imageUrl && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-[10px] text-white truncate">{design.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-muted">
                  <p>No transparent PNG designs found.</p>
                  <p className="text-sm mt-2">Add .png files to your designs data.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
