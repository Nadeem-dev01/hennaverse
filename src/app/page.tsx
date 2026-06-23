import type { Metadata } from "next";
import { designs } from "@/data/designs";
import { blogs } from "@/data/blogs";
import { countries } from "@/data/countries";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import DesignCard from "@/components/DesignCard";
import BlogCard from "@/components/BlogCard";
import CountryCard from "@/components/CountryCard";
import Newsletter from "@/components/Newsletter";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import HomeSEOContent from "@/components/HomeSEOContent";
import { buildItemListSchema } from "@/lib/schema";
import { allDesigns } from "@/data/index";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const metadata: Metadata = {
  title: "Mehndi Design Henna — 5000+ Easy Mehndi Designs & Patterns for Hands (2026)",
  description:
    "Mehndi Design Henna: Browse 5000+ easy mehndi designs and mehndi patterns for hands — simple, arabic, bridal, back hand, and eid henna patterns. Plus guides on henna cones, kits, and artists near you.",
    keywords: [
    "mehndi henna",
    "easy mehndi designs",
    "mehndi patterns for hands",
    "mehndi designs simple",
    "simple mehndi designs for hands",
    "mehndi design easy and beautiful",
    "easy mehndi patterns for hands",
    "mehndi easy design",
    "beautiful easy mehndi design",
    "easy arabic mehndi design",
    "back hand mehndi design",
    "mehndi design in hand",
    "mehndi designs on hands",
    "henna tattoo near me",
    "henna tattoo close to me",
    "henna tattoos near me",
    "henna artist near me",
    "henna tattoo artist near me",
    "bridal henna near me",
    "henna and tattoos",
    "henna tattoo ideas",
    "temporary henna tattoos",
    "henna tattoos on the hand",
    "henna tattoo for men",
    "where can i get a henna tattoo near me",
    "mehndi outfit",
    "mehndi dress for bride",
    "mehndi decor",
    "henna freckles",
    "henna hand tattoo",
    "hand henna",
    "henna simple design for hand",
    "cute henna designs",
    "easy henna ideas",
    "eid henna patterns",
    "mehndi designs for eid",
    "mehndi wedding designs",
    "mehndi design for marriage",
    "henna vs mehndi",
    "henna cones",
    "henna kit",
    "henna stencils",
    "mehndi stencils",
    "mehndi cone",
    "henna paste",
    "henna powder",
    "henna patterns for men",
    "henna for men",
    "mehndi design photoshoot",
    "contemporary mehndi design",
    "modern design of mehndi",
    "mehndi designs for beginners"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mehndi Design Henna — 5000+ Easy Mehndi Designs & Patterns for Hands",
    description:
      "5000+ easy mehndi designs and mehndi patterns for hands — simple, arabic, bridal, back hand, and eid henna patterns, plus henna cone and kit guides.",
    type: "website",
    url: BASE_URL,
    siteName: "Mehndi Design Henna",
    images: [{ url: "/Logo_Mehndidesign.png", width: 800, height: 255, alt: "Mehndi Design Henna" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehndi Design Henna — 5000+ Easy Mehndi Designs & Patterns for Hands",
    description: "5000+ easy mehndi designs, mehndi patterns for hands, eid henna patterns, and henna tattoo ideas.",
  },
};


export default function Home() {
  const featuredDesigns = designs.slice(0, 6);
  const featuredCountries = countries.slice(0, 8);
  const latestBlogs = blogs.slice(0, 3);
  const eidDesigns = designs.filter(design => design.occasion === "Eid").slice(0, 6);

  const itemListSchema = buildItemListSchema(
    featuredDesigns.map((d) => {
      const detailed = allDesigns.find((ad) => ad.id === d.id.toString() || ad.title === d.title);
      return {
        name: d.title,
        url: detailed ? `/designs/${detailed.slug}` : `/gallery`,
        image: d.imageUrl,
      };
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <HeroSection />

      {/* Featured Designs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            title="Featured Designs"
            subtitle="Hand-picked mehndi patterns showcasing artistry from around the world"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDesigns.map((design, index) => (
            <ScrollReveal key={design.id} delay={index * 0.1}>
              <DesignCard design={design} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* EidHannaz Section */}
      {eidDesigns.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-surface/30">
          <ScrollReveal>
            <SectionHeading
              title="EidHannaz"
              subtitle="Special mehndi designs to celebrate Eid with elegance and beauty"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {eidDesigns.map((design, index) => (
              <ScrollReveal key={`eid-${design.id}`} delay={index * 0.1}>
                <DesignCard design={design} index={index + 2} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-8">
              <Link
                href="/mehndi-designs/eid"
                className="group flex items-center gap-2 bg-gold/10 text-gold font-semibold px-8 py-3 rounded-full hover:bg-gold hover:text-background transition-all hover:shadow-lg hover:shadow-gold/25 border border-gold/30"
              >
                View All Eid Designs
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Explore by Country */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            title="Explore by Country"
            subtitle="Discover unique henna traditions from cultures across the globe"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCountries.map((country, index) => (
            <ScrollReveal key={country.id} delay={index * 0.08}>
              <CountryCard country={country} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Latest from Blog */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            title="Latest from Blog"
            subtitle="Stories, tutorials, and insights from the world of henna art"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBlogs.map((blog, index) => (
            <ScrollReveal key={blog.slug} delay={index * 0.1}>
              <BlogCard blog={blog} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Comprehensive SEO Content */}
      <ScrollReveal>
        <HomeSEOContent />
      </ScrollReveal>

      {/* Newsletter */}
      <ScrollReveal>
        <Newsletter />
      </ScrollReveal>
    </>
  );
}
