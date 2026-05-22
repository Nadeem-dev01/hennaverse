export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 md:w-10 md:h-10 text-gold flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
      >
        <defs>
          <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="50%" stopColor="#f0d080" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
        </defs>
        {/* Outer Henna Drop/Leaf */}
        <path
          d="M50 5C50 5 20 40 20 65C20 81.5 33.5 95 50 95C66.5 95 80 81.5 80 65C80 40 50 5 50 5Z"
          fill="url(#logo-gold)"
          fillOpacity="0.15"
          stroke="url(#logo-gold)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Inner Decorative Swirl */}
        <path
          d="M50 25C40 40 35 50 35 60C35 68.3 41.7 75 50 75C58.3 75 65 68.3 65 60C65 50 60 40 50 25Z"
          stroke="url(#logo-gold)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Dots */}
        <circle cx="50" cy="58" r="5" fill="url(#logo-gold)" />
        <circle cx="50" cy="85" r="2.5" fill="url(#logo-gold)" />
        {/* Subtle curve below the center dot */}
        <path
          d="M40 60C40 60 45 66 50 66C55 66 60 60 60 60"
          stroke="url(#logo-gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-2xl md:text-3xl font-serif font-bold text-gradient-gold tracking-wide">
        HennaVerse
      </span>
    </div>
  );
}
