"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface FilterBarProps {
  filters: {
    label: string;
    options: string[];
  }[];
  activeFilters: Record<string, string>;
  onFilterChange: (filterLabel: string, value: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function FilterBar({
  filters,
  activeFilters,
  onFilterChange,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search designs...",
}: FilterBarProps) {
  return (
    <div className="mb-10 space-y-4">
      {/* Search input */}
      {onSearchChange && (
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-surface border border-border rounded-full pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-gold focus:outline-none transition-colors"
          />
        </div>
      )}

      {/* Filter groups */}
      {filters.map((filter) => (
        <div key={filter.label} className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted font-medium uppercase tracking-wider mr-2 shrink-0">
            {filter.label}:
          </span>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-none">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange(filter.label, "All")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                !activeFilters[filter.label] ||
                activeFilters[filter.label] === "All"
                  ? "bg-gold text-background"
                  : "bg-surface border border-border text-muted hover:text-foreground hover:border-gold/30"
              }`}
            >
              All
            </motion.button>
            {filter.options.map((option) => (
              <motion.button
                key={option}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFilterChange(filter.label, option)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilters[filter.label] === option
                    ? "bg-gold text-background"
                    : "bg-surface border border-border text-muted hover:text-foreground hover:border-gold/30"
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
