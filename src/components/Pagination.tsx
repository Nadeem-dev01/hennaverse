import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    return `${basePath}?page=${page}`;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-12 mb-8" aria-label="Pagination">
      <Link
        href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
        className={`p-2 rounded-full border ${
          currentPage === 1
            ? "border-border/50 text-muted cursor-not-allowed"
            : "border-border hover:border-gold/50 hover:text-gold text-foreground transition-colors"
        }`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        <span className="sr-only">Previous Page</span>
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="px-2 text-muted">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page as number)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-gold text-white"
                  : "hover:bg-surface text-foreground"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Link>
          )
        )}
      </div>

      <Link
        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
        className={`p-2 rounded-full border ${
          currentPage === totalPages
            ? "border-border/50 text-muted cursor-not-allowed"
            : "border-border hover:border-gold/50 hover:text-gold text-foreground transition-colors"
        }`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        <span className="sr-only">Next Page</span>
        <ChevronRight className="w-5 h-5" />
      </Link>
    </nav>
  );
}
