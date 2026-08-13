import Link from "next/link";
import Image from "next/image";
import type { Design } from "@/data/types";
import type { CategoryDef } from "@/data/taxonomy";
import Breadcrumbs from "./Breadcrumbs";
import TableOfContents from "./TableOfContents";
import DesignGrid from "./DesignGrid";
import AdSlot from "./AdSlot";
import Pagination from "./Pagination";

const DESIGNS_PER_PAGE = 48;

// Maps taxonomy region → styles/[id] country page for cross-linking
const REGION_TO_STYLE_PAGE: Record<string, { id: string; label: string }> = {
  indonesia: { id: "indonesia", label: "Indonesian Henna Cultural Traditions" },
  india: { id: "india", label: "Indian Mehndi Cultural Traditions" },
  pakistan: { id: "pakistan", label: "Pakistani Mehndi Cultural Traditions" },
  gulf: { id: "arabia", label: "Arabic Mehndi Cultural Traditions" },
  morocco: { id: "morocco", label: "Moroccan Henna Cultural Traditions" },
  turkey: { id: "turkey", label: "Turkish Henna Cultural Traditions" },
  africa: { id: "sudan-africa", label: "African Henna Cultural Traditions" },
};

export default function CategoryDesignsPage({
  category,
  designs,
  related,
  currentPage = 1,
}: {
  category: CategoryDef;
  designs: Design[];
  related: { slug: string; title: string }[];
  currentPage?: number;
}) {
  const total = designs.length;
  
  // Calculate pagination
  const totalPages = Math.ceil(total / DESIGNS_PER_PAGE);
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (safePage - 1) * DESIGNS_PER_PAGE;
  const paginatedDesigns = designs.slice(startIndex, startIndex + DESIGNS_PER_PAGE);
  
  // Always use the first design of the entire collection for the hero image to ensure consistency
  const hero = designs[0]?.image;

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Mehndi Designs", href: "/mehndi-designs" },
          { label: category.title, href: `/mehndi-designs/${category.slug}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-6">
              {category.title}
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              {category.metaDescription}
            </p>
          </header>

          <AdSlot adSlot="header-slot" />

          {hero && safePage === 1 && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden my-10 border border-border">
              <Image
                src={hero.src}
                alt={`${category.title} — featured henna pattern`}
                fill
                quality={60}
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {safePage === 1 && (
            <section className="prose prose-invert prose-gold max-w-none mb-10">
              <h2 id="about">About {category.title}</h2>
              <p>
                Explore our collection of {total}+ {category.title.toLowerCase()}, hand-picked
                for every skill level and occasion. Whether you want a quick, simple look or
                an elaborate full-coverage pattern, each design below links to a detailed page
                with a high-resolution image, step-by-step inspiration, and frequently asked
                questions. Tap any design to view it full size, then download or share it.
              </p>
              {category.region && REGION_TO_STYLE_PAGE[category.region] && (
                <p className="text-sm">
                  Learn about the cultural history behind these designs:{" "}
                  <Link
                    href={`/styles/${REGION_TO_STYLE_PAGE[category.region].id}`}
                    className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
                  >
                    {REGION_TO_STYLE_PAGE[category.region].label}
                  </Link>
                </p>
              )}
            </section>
          )}

          <section id="gallery">
            <h2 className="text-3xl font-serif text-gold mb-2 border-b border-border pb-4">
              {category.title} Gallery {safePage > 1 && `- Page ${safePage}`}
            </h2>
            <p className="text-muted text-sm mt-3">
              Showing {startIndex + 1}-{Math.min(startIndex + DESIGNS_PER_PAGE, total)} of {total} designs in this collection
            </p>
            
            <DesignGrid designs={paginatedDesigns} />
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={safePage} 
                totalPages={totalPages} 
                basePath={`/mehndi-designs/${category.slug}`} 
              />
            )}
          </section>

          <AdSlot adSlot="footer-slot" className="mt-12" />

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-serif text-gold mb-4">Explore More Mehndi Styles</h2>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/mehndi-designs/${r.slug}`}
                    className="px-4 py-2 text-sm rounded-full bg-surface text-foreground border border-border hover:border-gold/50 hover:text-gold transition-colors"
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="lg:col-span-4 hidden lg:block space-y-8">
          <TableOfContents />
          <AdSlot adSlot="sidebar-slot" adFormat="rectangle" />
        </aside>
      </div>
    </div>
  );
}
