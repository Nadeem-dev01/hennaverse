"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Country {
  id: string;
  name: string;
  flag: string;
  description: string;
  styles: string[];
  designCount: number;
  heroImage: string;
  traditions: string;
  famousFor: string;
}

interface CountryCardProps {
  country: Country;
  index?: number;
}

const gradients = [
  "from-orange-900/30 via-surface to-gold/10",
  "from-emerald-900/30 via-surface to-gold/10",
  "from-blue-900/30 via-surface to-gold/10",
  "from-rose-900/30 via-surface to-gold/10",
  "from-purple-dark/30 via-surface to-gold/10",
  "from-amber-900/30 via-surface to-gold/10",
  "from-teal-900/30 via-surface to-gold/10",
  "from-indigo-900/30 via-surface to-gold/10",
];

export default function CountryCard({ country, index = 0 }: CountryCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <Link href={`/styles/${country.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative bg-gradient-to-br ${gradient} rounded-xl border border-border overflow-hidden hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 transition-all cursor-pointer h-full`}
      >
        <div className="p-6">
          {/* Flag and name */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
                {country.name}
              </h3>
              <p className="text-xs text-muted">
                {country.designCount} designs
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {country.description}
          </p>

          {/* Styles */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {country.styles.slice(0, 3).map((style) => (
              <span
                key={style}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gold/10 text-gold border border-gold/20"
              >
                {style}
              </span>
            ))}
          </div>

          {/* Explore link */}
          <div className="flex items-center gap-1 text-xs text-muted group-hover:text-gold transition-colors">
            Explore styles
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-gold/0 group-hover:bg-gold/[0.03] transition-colors pointer-events-none" />
      </motion.div>
    </Link>
  );
}
