import { notFound } from "next/navigation";
import Link from "next/link";
import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import {
  mehndiTools,
  getToolBySlug,
  getRelatedTools,
} from "@/data/mehndiTools";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return mehndiTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Not Found" };

  return {
    title: `${tool.title} | HennaVerse`,
    description: tool.description.slice(0, 160),
    keywords: tool.keywords,
    alternates: {
      canonical: `https://www.mehndidesignhenna.com/tools/${slug}`,
    },
    openGraph: {
      title: `${tool.title} | HennaVerse`,
      description: tool.description.slice(0, 160),
      url: `https://www.mehndidesignhenna.com/tools/${slug}`,
      type: "website",
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool);

  // Filter relevant designs based on tool keywords/slug
  const keywordSet = [
    ...tool.keywords.map((k) => k.toLowerCase()),
    tool.slug.replace(/-/g, " "),
    tool.title.toLowerCase(),
  ];

  const relevantDesigns = designs
    .filter((d) => {
      const haystack = [
        d.title,
        d.style,
        d.occasion,
        d.country,
        d.description,
        ...(d.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return keywordSet.some((kw) => haystack.includes(kw.split(" ")[0]));
    })
    .slice(0, 12);

  const displayDesigns =
    relevantDesigns.length >= 4
      ? relevantDesigns
      : designs.slice(0, 12);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #1a0a00 100%)",
        }}
        className="py-20 px-4 mb-16 relative overflow-hidden"
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-7xl mb-6 animate-bounce">{tool.emoji}</div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-4 opacity-80 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20">
            Mehndi Tool
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {tool.title}
          </h1>
          <p className="text-amber-200/80 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            {tool.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tool.keywords.slice(0, 5).map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 text-xs rounded-full bg-gold/15 text-gold border border-gold/20"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* About Section */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-2 bg-surface rounded-2xl p-8 border border-border">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                About {tool.title}
              </h2>
              <p className="text-muted leading-relaxed text-base">
                {tool.description}
              </p>
            </div>
            <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Quick Tips
              </h3>
              <ul className="space-y-3">
                {tool.tips.slice(0, 4).map((tip, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted">
                    <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Design Gallery */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Designs
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Browse our curated collection of mehndi designs for{" "}
              {tool.title.toLowerCase()}
            </p>
            <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayDesigns.map((design, idx) => (
              <DesignCard key={design.id} design={design} index={idx} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-white font-semibold rounded-xl hover:bg-gold/90 transition-all duration-200 shadow-lg shadow-gold/20"
            >
              View Full Gallery →
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {tool.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-surface border border-border rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <h3 className="font-semibold text-foreground pr-4 text-sm md:text-base">
                    {faq.q}
                  </h3>
                  <span className="text-gold flex-shrink-0 transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5 text-muted text-sm leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* All Tips */}
        <section className="max-w-4xl mx-auto mb-20">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Pro Tips for {tool.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tool.tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-surface border border-border rounded-xl hover:border-gold/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-muted text-sm leading-relaxed pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Rich Content */}
        <section className="max-w-3xl mx-auto mb-20 prose prose-invert">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Everything You Need to Know About {tool.title}
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            {tool.description} Whether you are a seasoned mehndi artist or just
            beginning your henna journey, {tool.title.toLowerCase()} offers
            something unique and beautiful for every occasion and skill level.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            The art of mehndi has been practiced for over 5,000 years across
            South Asia, the Middle East, and North Africa. Each regional
            tradition has developed its own distinctive style, motifs, and
            techniques. Today, mehndi has evolved into a globally celebrated art
            form that bridges ancient tradition with contemporary aesthetics.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            When choosing a mehndi design, consider the occasion, your personal
            style, the placement on your body, and how much time you have for
            both application and drying. Natural henna paste — made from dried
            henna leaves — is always the safest choice. The stain develops over
            24-48 hours, reaching its richest color before gradually fading over
            1-3 weeks.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            To care for your mehndi: leave the paste on as long as possible (6-8
            hours for best results), apply a sugar-lemon solution to keep it
            moist, stay warm (heat deepens the stain), and avoid water for at
            least 12 hours after removing the dried paste. Regular moisturizing
            with natural oils extends the life of your stain.
          </p>
          <p className="text-muted leading-relaxed">
            Our{" "}
            <span className="text-gold font-semibold">{tool.title}</span>{" "}
            collection is curated from talented artists worldwide, ensuring you
            have access to the finest, most inspiring mehndi designs available.
            Explore, save your favorites, and create the perfect look for your
            next special occasion.
          </p>
        </section>

        {/* Related Tools */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/tools/${rt.slug}`}
                  className="group flex items-center gap-4 p-5 bg-surface border border-border rounded-xl hover:border-gold/40 hover:bg-gold/5 transition-all duration-200"
                >
                  <span className="text-3xl">{rt.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-gold transition-colors">
                      {rt.title}
                    </h3>
                    <p className="text-muted text-xs mt-0.5">{rt.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Tools CTA */}
        <div className="text-center py-12 border-t border-border mt-12">
          <p className="text-muted mb-4">Explore all our mehndi tools</p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-8 py-3 bg-surface border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold hover:text-white transition-all duration-200"
          >
            View All Tools →
          </Link>
        </div>
      </div>
    </div>
  );
}
