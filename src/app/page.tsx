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

const BASE_URL = "https://www.mehndidesignhenna.com";

export const metadata: Metadata = {
  title: "Mehndi Design Henna — Beautiful Henna Designs, Tutorials and Cultural Guides",
  description:
    "Explore stunning mehndi designs from India, Pakistan, Arabia, Morocco and beyond. Browse bridal henna patterns, easy tutorials, aftercare tips, and cultural guides for every occasion.",
    keywords: [
    "mehndi design",
    "henna design",
    "bridal mehndi",
    "arabic henna",
    "indian mehndi",
    "easy mehndi",
    "wedding henna",
    "eid mehndi",
    "mehndi patterns",
    "henna art",
    "mehandi design",
    "simple mehndi",
    "mehndi for beginners",
    "henna tattoo",
    "back hand mehndi",
    "front hand mehndi",
    "finger mehndi",
    "full hand mehndi",
    "mehndi 2025",
    "latest mehndi",
    "new mehndi design",
    "beautiful henna",
    "mehndi tutorial",
    "henna paste",
    "mehndi images",
    "mehndi photos",
    "Pakistani mehndi",
    "Moroccan henna",
    "mandala mehndi",
    "floral mehndi",
    "geometric henna",
    "minimalist mehndi",
    "mehndi ideas",
    "henna inspiration",
    "mehndi gallery",
    "traditional mehndi",
    "modern mehndi",
    "foot mehndi",
    "leg mehndi",
    "arm mehndi"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mehndi Design Henna — Beautiful Henna Designs, Tutorials and Cultural Guides",
    description:
      "Explore stunning mehndi designs from India, Pakistan, Arabia, Morocco and beyond. Bridal patterns, tutorials, and cultural guides.",
    type: "website",
    url: BASE_URL,
    siteName: "HennaVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehndi Design Henna | HennaVerse",
    description: "Stunning mehndi designs, bridal henna, tutorials, and cultural guides from around the world.",
  },
};


export default function Home() {
  const featuredDesigns = designs.slice(0, 6);
  const featuredCountries = countries.slice(0, 8);
  const latestBlogs = blogs.slice(0, 3);
  const eidDesigns = designs.filter(design => design.occasion === "Eid").slice(0, 6);

  return (
    <>
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
                href="/eidhennaz"
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
