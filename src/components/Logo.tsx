import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <Image 
        src="/Logo_Mehndidesign.png" 
        alt="Mehndi Design Henna Logo" 
        width={40} 
        height={40} 
        className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-105"
      />
      <span className="text-2xl md:text-3xl font-serif font-bold text-gradient-gold tracking-wide">
        HennaVerse
      </span>
    </div>
  );
}
