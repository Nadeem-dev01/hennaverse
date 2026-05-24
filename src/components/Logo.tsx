import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative flex items-center justify-center drop-shadow-md">
        <Image 
          src="/Logo_Mehndidesign.png" 
          alt="Mehndi Design Henna Logo" 
          width={264}
          height={84}
          priority
          className="h-12 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
