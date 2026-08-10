"use client";

import { useState, useMemo } from "react";
import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";
import FilterBar from "@/components/FilterBar";
import BlogPagination from "@/components/BlogPagination";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Rss } from "lucide-react";
import Link from "next/link";

const POSTS_PER_PAGE = 9;

export default function BlogListClient() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () => [...new Set(blogs.map((b) => b.category))],
    []
  );
  const blogCountries = useMemo(
    () => [...new Set(blogs.map((b) => b.country).filter(Boolean))],
    []
  );

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    blogs.flatMap((b) => b.tags || []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([t]) => t);
  }, []);

  const filters = [
    { label: "Category", options: categories },
    { label: "Country", options: blogCountries },
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        !searchValue ||
        blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchValue.toLowerCase()) ||
        blog.tags.some((t) =>
          t.toLowerCase().includes(searchValue.toLowerCase())
        );
      const matchesCategory =
        !activeFilters.Category ||
        activeFilters.Category === "All" ||
        blog.category === activeFilters.Category;
      const matchesCountry =
        !activeFilters.Country ||
        activeFilters.Country === "All" ||
        blog.country === activeFilters.Country;
      const matchesTag =
        !selectedTag || blog.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesCategory && matchesCountry && matchesTag;
    });
  }, [activeFilters, searchValue, selectedTag]);

  // Reset to page 1 whenever filters change
  const handleFilterChange = (label: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [label]: value }));
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchValue("");
    setSelectedTag(null);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const isFirstPage = currentPage === 1 && !selectedTag && !searchValue && Object.keys(activeFilters).length === 0;

  const featuredBlog = isFirstPage ? filteredBlogs[0] : null;
  const listToPaginate = featuredBlog ? filteredBlogs.slice(1) : filteredBlogs;

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return listToPaginate.slice(start, start + POSTS_PER_PAGE);
  }, [listToPaginate, currentPage]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <FilterBar
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search blog articles..."
        />
      </div>

      {/* Popular tag filter pills & RSS Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-border/40 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted flex items-center gap-1 font-medium">
            <Tag size={13} className="text-gold" /> Popular Topics:
          </span>
          {popularTags.map((tag) => {
            const isSelected = selectedTag?.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gold text-background border-gold font-semibold shadow-sm"
                    : "bg-surface/80 border-border/40 text-muted hover:border-gold/50 hover:text-foreground"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>

        <Link
          href="/feed.xml"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-muted hover:text-gold transition-colors font-medium ml-auto"
          title="Subscribe via RSS"
        >
          <Rss size={14} className="text-amber-500" />
          <span>RSS Feed</span>
        </Link>
      </div>

      {/* Result counter */}
      {(searchValue || selectedTag || Object.keys(activeFilters).length > 0) && (
        <div className="flex items-center justify-between text-sm text-muted mb-6">
          <p>
            Showing <span className="font-bold text-foreground">{filteredBlogs.length}</span> article
            {filteredBlogs.length === 1 ? "" : "s"}
          </p>
          <button
            onClick={clearAllFilters}
            className="text-gold hover:text-gold-light underline text-xs cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(activeFilters) + searchValue + (selectedTag || "") + currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Featured blog post (only on first page when un-filtered) */}
          {featuredBlog && (
            <div className="mb-10">
              <BlogCard blog={featuredBlog} featured />
            </div>
          )}

          {/* Remaining posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBlogs.map((blog, index) => (
              <BlogCard key={blog.slug} blog={blog} index={index} />
            ))}
          </div>

          {/* Pagination controls */}
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
          />

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20 bg-surface/40 rounded-2xl border border-border/40 my-8">
              <p className="text-muted text-lg font-medium">No blog posts found matching your criteria.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-colors text-sm font-medium cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
