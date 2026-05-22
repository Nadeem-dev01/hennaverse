"use client";

import { useState, useMemo } from "react";
import { designs } from "@/data/designs";
import { countries } from "@/data/countries";
import DesignCard from "@/components/DesignCard";
import FilterBar from "@/components/FilterBar";
import Lightbox from "@/components/Lightbox";
import SectionHeading from "@/components/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_COUNT = 24;

export default function GalleryClient() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<(typeof designs)[0] | null>(null);

  const countryNames = useMemo(
    () => [...new Set(countries.map((c) => c.name))],
    []
  );
  const styles = useMemo(
    () => [...new Set(designs.map((d) => d.style))],
    []
  );
  const difficulties = useMemo(
    () => [...new Set(designs.map((d) => d.difficulty))],
    []
  );

  const filters = [
    { label: "Country", options: countryNames },
    { label: "Style", options: styles },
    { label: "Difficulty", options: difficulties },
  ];

  const filteredDesigns = useMemo(() => {
    return designs.filter((design) => {
      const matchesSearch =
        !searchValue ||
        design.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        design.tags.some((t) =>
          t.toLowerCase().includes(searchValue.toLowerCase())
        );
      const matchesCountry =
        !activeFilters.Country ||
        activeFilters.Country === "All" ||
        design.country.includes(activeFilters.Country);
      const matchesStyle =
        !activeFilters.Style ||
        activeFilters.Style === "All" ||
        design.style === activeFilters.Style;
      const matchesDifficulty =
        !activeFilters.Difficulty ||
        activeFilters.Difficulty === "All" ||
        design.difficulty === activeFilters.Difficulty;

      return matchesSearch && matchesCountry && matchesStyle && matchesDifficulty;
    });
  }, [activeFilters, searchValue]);

  const displayedDesigns = showAll
    ? filteredDesigns
    : filteredDesigns.slice(0, INITIAL_COUNT);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Design Gallery"
        subtitle={`${filteredDesigns.length} stunning mehndi designs to explore`}
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

      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(activeFilters) + searchValue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {displayedDesigns.map((design, index) => (
            <DesignCard
              key={design.id}
              design={design}
              index={index}
              onClick={() => setSelectedDesign(design)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredDesigns.length === 0 && (
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

      {!showAll && filteredDesigns.length > INITIAL_COUNT && (
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className="px-8 py-3 border border-gold/50 text-gold rounded-full font-medium hover:bg-gold/10 transition-colors"
          >
            Show All {filteredDesigns.length} Designs
          </motion.button>
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
