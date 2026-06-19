import { Metadata } from "next";
import Link from "next/link";
import { designCategories } from "@/data/designCategories";
import { categories, occasions, bodyParts } from "@/data/taxonomy";
import { blogs } from "@/data/blogs";
import { countries } from "@/data/countries";
import { allDesigns } from "@/data/index";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Sitemap | Mehndi Design Henna",
  description: "Complete sitemap of Mehndi Design Henna — browse all mehndi design categories, occasions, styles, and articles.",
  alternates: { canonical: "/sitemap-html" },
  openGraph: {
    title: "Sitemap | Mehndi Design Henna",
    description: "Complete sitemap of Mehndi Design Henna — browse all mehndi design categories, occasions, styles, and articles.",
    url: "https://www.mehndidesignhenna.com/sitemap-html",
    siteName: "Mehndi Design Henna",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sitemap | Mehndi Design Henna",
    description: "Browse all pages on Mehndi Design Henna.",
  },
};

export default function HTMLSitemap() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <SectionHeading title="Sitemap" subtitle="Browse all pages on Mehndi Design Henna" />

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-xl font-serif text-gold mb-4">Main Pages</h2>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/mehndi-designs", label: "All Mehndi Designs" },
              { href: "/gallery", label: "Design Gallery" },
              { href: "/blog", label: "Blog" },
              { href: "/styles", label: "Styles by Country" },
              { href: "/tools", label: "Mehndi Tools" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-foreground hover:text-gold transition-colors">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4">Design Categories ({categories.length})</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/mehndi-designs/${cat.slug}`} className="text-foreground hover:text-gold transition-colors">
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4">By Occasion ({occasions.length})</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {occasions.map((occ) => (
              <li key={occ.slug}>
                <Link href={`/occasions/${occ.slug}`} className="text-foreground hover:text-gold transition-colors">
                  {occ.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4">By Body Placement ({bodyParts.length})</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {bodyParts.map((bp) => (
              <li key={bp.slug}>
                <Link href={`/body/${bp.slug}`} className="text-foreground hover:text-gold transition-colors">
                  {bp.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4">By Country/Region ({countries.length})</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {countries.map((c) => (
              <li key={c.id}>
                <Link href={`/styles/${c.id}`} className="text-foreground hover:text-gold transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4">Blog ({blogs.length} articles)</h2>
          <ul className="space-y-2 text-sm">
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <Link href={`/blog/${blog.slug}`} className="text-foreground hover:text-gold transition-colors">
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {allDesigns.length > 0 && (
          <section>
            <h2 className="text-xl font-serif text-gold mb-4">All Designs ({allDesigns.length})</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-sm">
              {allDesigns.slice(0, 500).map((d) => (
                <li key={d.slug}>
                  <Link href={`/designs/${d.slug}`} className="text-muted hover:text-gold transition-colors truncate block">
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
            {allDesigns.length > 500 && (
              <p className="text-muted text-sm mt-4">And {allDesigns.length - 500} more designs...</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
