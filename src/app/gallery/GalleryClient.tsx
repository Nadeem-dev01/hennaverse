"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import SectionHeading from "@/components/SectionHeading";

const PAGE_SIZE = 24;

export interface GalleryItem {
  slug: string;
  title: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  bodyPart: string;
  difficulty: string;
}

const difficulties = ["Easy", "Medium", "Hard", "Expert"];

// Designs arrive as props from the server page, so the first screen of cards
// (and their links to /designs/…) is in the initial HTML for crawlers.
// Filtering and "load more" then run entirely in the browser.
export default function GalleryClient({ designs }: { designs: GalleryItem[] }) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filters = useMemo(
    () => [
      { label: "Style", options: [...new Set(designs.map((d) => d.category))].sort() },
      { label: "Body Part", options: [...new Set(designs.map((d) => d.bodyPart))].sort() },
      { label: "Difficulty", options: difficulties },
    ],
    [designs]
  );

  const filtered = useMemo(() => {
    const isActive = (value?: string) => !!value && value !== "All";
    const query = searchValue.trim().toLowerCase();
    return designs.filter(
      (d) =>
        (!isActive(activeFilters.Style) || d.category === activeFilters.Style) &&
        (!isActive(activeFilters["Body Part"]) || d.bodyPart === activeFilters["Body Part"]) &&
        (!isActive(activeFilters.Difficulty) || d.difficulty === activeFilters.Difficulty) &&
        (!query || d.title.toLowerCase().includes(query))
    );
  }, [designs, activeFilters, searchValue]);

  // A new filter or search starts again from the first page of results.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(PAGE_SIZE);
  }, [activeFilters, searchValue]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        title="Design Gallery"
        subtitle={`${designs.length} mehndi designs to explore`}
      />

      <FilterBar
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={(label, value) =>
          setActiveFilters((prev) => ({ ...prev, [label]: value }))
        }
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search designs by name..."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((d, index) => (
          <Link
            key={d.slug}
            href={`/designs/${d.slug}`}
            className="group bg-surface rounded-xl border border-border overflow-hidden transition-colors hover:border-gold/50"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={d.src}
                alt={d.alt}
                width={d.width}
                height={d.height}
                priority={index < 4}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h2 className="text-sm font-medium text-foreground line-clamp-2">{d.title}</h2>
              <p className="mt-1 text-xs text-muted">
                {d.category} · {d.difficulty}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
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

      {filtered.length > 0 && (
        <div className="text-center mt-10">
          <p className="text-muted text-sm">
            Showing {visible.length} of {filtered.length} designs
          </p>
          {visible.length < filtered.length && (
            <button
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="mt-4 px-6 py-3 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-white transition-colors text-sm font-medium"
            >
              Load more designs
            </button>
          )}
        </div>
      )}
    </div>
  );
}
