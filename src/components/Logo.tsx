export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative flex items-center justify-center bg-white/5 rounded-full p-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
        {/* Using native img tag to prevent Next.js optimization issues with the logo */}
        <img 
          src="/Logo_Mehndidesign.png" 
          alt="Mehndi Design Henna Logo" 
          className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span className="text-2xl md:text-3xl font-serif font-bold text-gradient-gold tracking-wide">
        HennaVerse
      </span>
    </div>
  );
}
