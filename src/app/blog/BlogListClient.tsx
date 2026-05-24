"use client";

import { useState, useMemo } from "react";
import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";
import FilterBar from "@/components/FilterBar";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogListClient() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = useState("");

  const categories = useMemo(
    () => [...new Set(blogs.map((b) => b.category))],
    []
  );
  const blogCountries = useMemo(
    () => [...new Set(blogs.map((b) => b.country).filter(Boolean))],
    []
  );

  const filters = [
    { label: "Category", options: categories },
    { label: "Country", options: blogCountries },
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        !searchValue ||
        blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
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

      return matchesSearch && matchesCategory && matchesCountry;
    });
  }, [activeFilters, searchValue]);

  const featuredBlog = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  return (
    <>
      <FilterBar
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={(label, value) =>
          setActiveFilters((prev) => ({ ...prev, [label]: value }))
        }
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search blog posts..."
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(activeFilters) + searchValue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Featured blog post */}
          {featuredBlog && (
            <div className="mb-10">
              <BlogCard blog={featuredBlog} featured />
            </div>
          )}

          {/* Remaining posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingBlogs.map((blog, index) => (
              <BlogCard key={blog.slug} blog={blog} index={index} />
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-lg">No blog posts found.</p>
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
        </motion.div>
      </AnimatePresence>
    </>
  );
}
