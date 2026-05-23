"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all h2 and h3 elements in the article
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    const tocItems = elements.map((elem) => {
      // Ensure element has an ID
      if (!elem.id) {
        elem.id = elem.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "";
      }
      return {
        id: elem.id,
        text: elem.textContent || "",
        level: Number(elem.tagName.substring(1)),
      };
    });
    setHeadings(tocItems);

    // Setup intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 glass p-6 rounded-2xl border border-border">
      <h3 className="text-lg font-serif font-bold text-gold mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`flex items-start text-sm transition-colors ${
              activeId === heading.id
                ? "text-gold font-medium"
                : "text-muted hover:text-foreground"
            }`}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setActiveId(heading.id);
            }}
          >
            {activeId === heading.id && (
              <ChevronRight size={16} className="mr-1 shrink-0 mt-0.5 text-gold" />
            )}
            <span className={activeId === heading.id ? "" : "ml-5"}>
              {heading.text}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
