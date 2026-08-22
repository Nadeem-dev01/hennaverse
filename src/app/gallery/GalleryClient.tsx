"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { countries } from "@/data/countries";
import { useDesigns, type Design } from "@/hooks/useDesigns";
import DesignCard from "@/components/DesignCard";
import FilterBar from "@/components/FilterBar";
import Lightbox from "@/components/Lightbox";
import SectionHeading from "@/components/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_COUNT = 24;

// Skeleton loading card
function SkeletonCard() {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gradient-to-br from-surface via-border to-surface" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-border rounded w-3/4" />
        <div className="h-3 bg-border rounded w-1/2" />
        <div className="flex gap-1.5">
          <div className="h-4 w-14 bg-border rounded-full" />
          <div className="h-4 w-12 bg-border rounded-full" />
          <div className="h-4 w-16 bg-border rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function GalleryClient() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchValue), 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  // Supabase API hook
  const {
    designs,
    loading,
    loadingMore,
    pagination,
    loadMore,
  } = useDesigns({
    country: activeFilters.Country,
    style: activeFilters.Style,
    difficulty: activeFilters.Difficulty,
    search: debouncedSearch,
    limit: INITIAL_COUNT,
  });

  const totalCount = pagination?.total || designs.length;

  // Infinite scroll with Intersection Observer
  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore || !pagination?.hasMore) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 0.1 }
      );
      if (node) observer.observe(node);
      return () => observer.disconnect();
    },
    [loadingMore, pagination, loadMore]
  );

  const countryNames = useMemo(
    () => [...new Set(countries.map((c) => c.name))],
    []
  );
  const styles = useMemo(
    () => [...new Set(countries.flatMap((c) => c.styles))].sort(),
    []
  );
  const difficulties = ["Easy", "Medium", "Hard", "Expert"];

  const filters = [
    { label: "Country", options: countryNames },
    { label: "Style", options: styles },
    { label: "Difficulty", options: difficulties },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Design Gallery"
        subtitle={`${totalCount} stunning mehndi designs to explore`}
      />


      <FilterBar
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={(label, value) =>
          setActiveFilters((prev) => ({ ...prev, [label]: value }))
        }
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search designs by name or tag..."
      />

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Designs grid */}
      {!loading && (
        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(activeFilters) + debouncedSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {designs.map((design, index) => (
              <div
                key={design.id}
                ref={index === designs.length - 1 ? lastCardRef : undefined}
              >
                <DesignCard
                  design={design}
                  index={index}
                  onClick={() => setSelectedDesign(design)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-gold">
            <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading more designs...</span>
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && designs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted text-lg">No designs found matching your filters.</p>
          <button
            onClick={() => {
              setActiveFilters({});
              setSearchValue("");
            }}
            className="mt-4 text-gold hover:text-gold-light transition-colors text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Show total info */}
      {!loading && pagination && (
        <div className="text-center mt-8 text-muted text-sm">
          Showing {designs.length} of {pagination.total} designs
          {pagination.hasMore && " • Scroll down to load more"}
        </div>
      )}

      <Lightbox
        design={selectedDesign}
        isOpen={!!selectedDesign}
        onClose={() => setSelectedDesign(null)}
      />
    </div>
  );
}
