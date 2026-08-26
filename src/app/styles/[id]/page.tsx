import { notFound } from "next/navigation";
import { countries } from "@/data/countries";
import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

const BASE_URL = "https://www.mehndidesignhenna.com";

// Mapping from country id → related mehndi-designs category slug (for internal linking)
const CATEGORY_LINK_MAP: Record<string, { slug: string; label: string }> = {
  indonesia: { slug: "indonesian", label: "Indonesian Henna Designs" },
  india: { slug: "indian", label: "Indian Mehndi Designs" },
  pakistan: { slug: "pakistani", label: "Pakistani Mehndi Designs" },
  arabia: { slug: "arabic", label: "Arabic Mehndi Designs" },
  morocco: { slug: "moroccan", label: "Moroccan Henna Designs" },
  turkey: { slug: "turkish", label: "Turkish Henna Designs" },
  "sudan-africa": { slug: "african", label: "African Henna Designs" },
};

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const country = countries.find((c) => c.id === params.id);
  if (!country) return { title: "Not Found" };

  // Use per-country SEO overrides when available (e.g. Indonesia optimised for "indonesian henna")
  const metaTitle = country.seoTitle ?? `${country.name} Mehndi Styles — Traditional Henna Patterns and Designs`;
  const metaDescription = country.seoDescription ?? country.description;

  // Build keyword list — include both "henna" and "mehndi" variants for the country
  const nameLC = country.name.toLowerCase();
  const keywords = [
    `${nameLC} henna`,
    `${nameLC} henna designs`,
    `${nameLC} mehndi`,
    `${nameLC} mehndi designs`,
    `${nameLC} mehndi patterns`,
    "henna designs",
    "mehndi styles",
  ];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: { canonical: `/styles/${country.id}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: `${BASE_URL}/styles/${country.id}`,
      siteName: "Mehndi Design Henna",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export function generateStaticParams() {
  return countries.map((country) => ({
    id: country.id,
  }));
}

export default async function CountryStylePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const country = countries.find((c) => c.id === params.id);

  if (!country) {
    notFound();
  }

  const countryDesigns = designs.filter((d) => {
    const dc = d.country.toLowerCase();
    const cn = country.name.toLowerCase();
    return cn.includes(dc) || dc.includes(cn);
  });

  // Use per-country SEO title/description for schema too
  const metaTitle = country.seoTitle ?? `${country.name} Mehndi Styles — Traditional Henna Patterns and Designs`;
  const metaDescription = country.seoDescription ?? country.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "inLanguage": "en",
    name: metaTitle,
    description: metaDescription,
    url: `${BASE_URL}/styles/${country.id}`,
    publisher: { "@type": "Organization", name: "Mehndi Design Henna", url: BASE_URL },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "inLanguage": "en",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Styles", item: `${BASE_URL}/styles` },
      { "@type": "ListItem", position: 3, name: `${country.name} Styles`, item: `${BASE_URL}/styles/${country.id}` },
    ],
  };

  // Linked category page (internal linking)
  const linkedCategory = CATEGORY_LINK_MAP[country.id];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="flex-1">
            <div className="text-6xl mb-4">{country.flag}</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-6">
              {country.h1Title || `${country.name} Mehndi Styles`}
            </h1>
            <p className="text-xl text-foreground mb-6 max-w-3xl leading-relaxed">
              {country.description}
            </p>
          </div>
          {country.heroImage && (
            <div className="w-full md:w-1/3 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-border/40 relative aspect-square md:aspect-[4/5]">
              <Image 
                src={country.heroImage} 
                alt={`${country.name} mehndi style — traditional henna designs`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        <div className="bg-surface border border-border p-8 rounded-2xl max-w-4xl">
          <h2 className="text-2xl font-serif text-gold mb-4">Cultural Traditions</h2>
          <p className="text-muted leading-relaxed mb-6">{country.traditions}</p>

          <h3 className="text-lg font-semibold text-foreground mb-3">Popular Styles:</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {country.styles.map((style) => (
              <span key={style} className="px-3 py-1 bg-purple/10 text-purple border border-purple/20 rounded-full text-sm">
                {style}
              </span>
            ))}
          </div>

          {/* Internal contextual link to the matching design category page */}
          {linkedCategory && (
            <p className="text-muted text-sm mt-4">
              Browse the full gallery:{" "}
              <Link
                href={`/mehndi-designs/${linkedCategory.slug}`}
                className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
              >
                {linkedCategory.label}
              </Link>
            </p>
          )}

          {country.id === 'turkey' && (
            <p className="text-muted text-sm mt-2">
              Learn more about the traditions:{" "}
              <Link
                href="/blog/turkish-henna-night-kina-gecesi-traditions"
                className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
              >
                Turkish Henna Night (Kına Gecesi)
              </Link>
            </p>
          )}
        </div>
      </div>

      <SectionHeading
        title={`${country.name} Designs`}
        subtitle={`Browse our collection of ${countryDesigns.length} authentic designs`}
      />

      {countryDesigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countryDesigns.map((design, index) => (
            <DesignCard key={design.id} design={design} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-muted">More designs from this region coming soon.</p>
      )}
    </main>
    </>
  );
}
