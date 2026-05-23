export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative flex items-center justify-center drop-shadow-md">
        <img 
          src="/Logo_Mehndidesign.png" 
          alt="Mehndi Design Henna Logo" 
          className="h-12 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
