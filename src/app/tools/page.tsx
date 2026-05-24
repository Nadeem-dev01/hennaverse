import Link from "next/link";
import { mehndiTools, mehndiToolCategories } from "@/data/mehndiTools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mehndi Design Tools 2025 | 100+ Henna Generators & Finders",
  description:
    "Explore 100+ free mehndi design tools — generators, finders, viewers, and AI-powered selectors for Arabic, Bridal, Pakistani, Indian mehndi and more.",
  keywords: [
    "mehndi design tools",
    "henna generator",
    "mehndi design generator",
    "henna finder tool",
    "mehndi style matcher",
    "henna design selector",
    "arabic mehndi generator",
    "bridal mehndi tool",
    "pakistani mehndi generator",
    "indian henna tool",
    "mehndi design viewer",
    "henna gallery viewer",
    "mehndi ai tool",
    "henna recommendation tool",
    "mehndi design picker",
    "free mehndi tools",
    " online henna tools",
    "mehndi design explorer",
    "henna pattern finder",
    "mehndi occasion matcher",
    "henna style guide tool",
    "mehndi difficulty selector",
    "henna design browser",
    "mehndi search tool",
    "henna inspiration tool",
    "mehndi randomizer",
    "henna design quiz",
    "mehndi suggestion tool",
    "free henna generator",
    "mehndi design maker",
    "henna pattern creator",
    "mehndi tool collection",
    "henna art tools",
    "mehndi design helper",
    "henna planning tool",
    "mehndi preview tool",
    "henna comparison tool",
    "mehndi design catalog",
    "henna tool library",
    "mehndi design utility"
  ],
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/tools",
  },
  openGraph: {
    title: "Mehndi Design Tools 2025 | HennaVerse",
    description:
      "100+ free mehndi tools including generators, finders, style matchers, and AI-powered recommendations.",
    url: "https://www.mehndidesignhenna.com/tools",
    type: "website",
  },
};

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #1a0a00 100%)",
        }}
        className="py-20 px-4 mb-16 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-4 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20">
            100+ Tools
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
            Mehndi Design Tools
          </h1>
          <p className="text-amber-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Your complete toolkit for discovering, generating, and exploring mehndi designs.
            From AI-powered style matchers to HD gallery viewers — everything you need
            for the perfect henna art.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Total Tools", value: `${mehndiTools.length}+` },
            { label: "Design Styles", value: "25+" },
            { label: "Design Occasions", value: "10+" },
            { label: "Designs in Gallery", value: "1000+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 bg-surface border border-border rounded-xl"
            >
              <div className="font-serif text-3xl font-bold text-gold mb-1">
                {stat.value}
              </div>
              <div className="text-muted text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        {mehndiToolCategories.map((cat) => {
          const catTools = mehndiTools.filter((t) => t.category === cat.id);
          if (catTools.length === 0) return null;
          return (
            <section key={cat.id} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.emoji}</span>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {cat.label}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent ml-2" />
                <span className="text-xs text-muted bg-surface border border-border px-3 py-1 rounded-full">
                  {catTools.length} tools
                </span>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {catTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex flex-col p-5 bg-surface border border-border rounded-xl hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 hover:shadow-lg hover:shadow-gold/5"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {tool.emoji}
                      </span>
                      <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-gold transition-colors">
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-muted text-xs leading-relaxed line-clamp-2 flex-1">
                      {tool.tagline}
                    </p>
                    <div className="mt-3 flex items-center text-xs text-gold font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Explore →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* All Tools A–Z List */}
        <section className="mt-8 pt-12 border-t border-border">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
            All Mehndi Tools A–Z
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[...mehndiTools]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-gold hover:bg-gold/5 transition-colors"
                >
                  <span className="text-base">{tool.emoji}</span>
                  {tool.title}
                </Link>
              ))}
          </div>
        </section>

        {/* SEO Bottom Content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Your Complete Mehndi Resource
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            HennaVerse&apos;s Mehndi Tools collection is the most comprehensive set of
            free mehndi design resources available online. Whether you are a bride searching
            for the perfect bridal design, an artist seeking fresh inspiration, or a beginner
            starting your mehndi journey — our tools are built for you.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            From the bold florals of Arabic mehndi generators to the sacred geometry of
            mandala design finders, from the royal grandeur of Rajasthani selectors to the
            delicate artistry of Khafif mehndi tools — every tradition and style is represented
            in our growing collection.
          </p>
          <p className="text-muted leading-relaxed">
            Our AI-powered tools help match designs to your personal style, hand shape, and
            occasion. Our gallery tools let you save, organize, and share your favorite
            designs. And our expert guides ensure every design choice is informed by deep
            knowledge of mehndi tradition and technique. Welcome to the most beautiful
            corner of the internet for mehndi lovers.
          </p>
        </section>
      </div>
    </div>
  );
}
