import Link from "next/link";
import { ArrowRight, Palette, BookOpen, Globe, Heart } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "About HennaVerse | Celebrating the Art of Henna Worldwide",
  description:
    "Learn about HennaVerse — our mission to celebrate henna art from every culture, provide tutorials, and connect the global mehndi community.",
};

const values = [
  {
    icon: "🌍",
    title: "Cultural Celebration",
    description:
      "We honor the rich diversity of henna traditions — from Rajasthani bridal art to Moroccan Berber patterns — without appropriation.",
  },
  {
    icon: "🎨",
    title: "Artistic Excellence",
    description:
      "Every design in our gallery has been curated for quality and authenticity, showcasing the finest examples of mehndi artistry.",
  },
  {
    icon: "📚",
    title: "Education First",
    description:
      "Our tutorials and guides help both beginners and seasoned artists grow their skills with step-by-step cultural context.",
  },
  {
    icon: "🤝",
    title: "Community Driven",
    description:
      "HennaVerse is built by and for henna enthusiasts worldwide. We believe art is best when shared.",
  },
];

const stats = [
  { value: "100+", label: "Curated Designs" },
  { value: "8", label: "Cultural Traditions" },
  { value: "15+", label: "Blog Articles" },
  { value: "∞", label: "Inspiration" },
];

const offerings = [
  {
    Icon: Palette,
    title: "Design Gallery",
    description:
      "Browse 100+ mehndi designs spanning 8 global traditions. Filter by country, style, difficulty, and occasion to find your perfect pattern.",
    href: "/gallery",
    linkText: "Explore Gallery",
  },
  {
    Icon: BookOpen,
    title: "Tutorials & Guides",
    description:
      "From beginner finger designs to complex bridal patterns, our blog offers step-by-step guides written by henna enthusiasts.",
    href: "/blog",
    linkText: "Read Blog",
  },
  {
    Icon: Globe,
    title: "Cultural Guides",
    description:
      "Discover the history and meaning behind henna traditions from India, Pakistan, Arabia, Morocco, Turkey, Indonesia, and beyond.",
    href: "/styles",
    linkText: "Explore Styles",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.08)_0%,transparent_60%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.2em] uppercase text-gold border border-gold/30 rounded-full">
            Our Story
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8">
            <span className="text-foreground">About </span>
            <span className="text-gradient-gold">HennaVerse</span>
          </h1>
          <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            HennaVerse was born from a simple belief: henna art is one of
            humanity&apos;s most beautiful cross-cultural traditions, and it
            deserves a dedicated home on the internet. We built this platform to
            celebrate, preserve, and share the artistry of mehndi with the
            world.
          </p>
          <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-4xl font-bold text-gradient-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Decorative left panel */}
          <div className="relative flex items-center justify-center h-80 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-dark/20 via-surface to-gold/10 rounded-3xl border border-border" />
            <div className="relative z-10 flex flex-col items-center gap-6 p-10">
              {/* Nested mandala rings */}
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 mandala animate-spin-slow opacity-40" />
                <div
                  className="absolute inset-6 mandala animate-spin-slow opacity-30"
                  style={{ animationDuration: "15s", animationDirection: "reverse" }}
                />
                <div className="absolute inset-12 mandala opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="text-gold" size={32} />
                </div>
              </div>
              <p className="text-gold text-sm font-medium tracking-widest uppercase text-center">
                Made with love for henna
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <SectionHeading
              title="Our Mission"
              subtitle="Bringing henna art to every corner of the world"
            />
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Henna has been used for thousands of years across South Asia,
                the Middle East, North Africa, and beyond — adorning hands and
                feet at weddings, festivals, and everyday celebrations. Yet much
                of this knowledge is passed down informally, at risk of being
                lost.
              </p>
              <p>
                HennaVerse is our answer to that challenge. We document and
                celebrate henna traditions in all their diversity — the bold
                florals of Gulf Arabia, the geometric precision of Moroccan
                Berber art, the intricate bridal tapestries of Rajasthan — and
                make them discoverable by anyone, anywhere.
              </p>
              <p>
                Whether you&apos;re a professional artist seeking inspiration, a
                bride planning her mehndi ceremony, or simply curious about this
                beautiful art form, HennaVerse is your guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-surface border border-border rounded-2xl p-6 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all group"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-gold transition-colors mb-2">
                  {value.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          title="What We Offer"
          subtitle="Everything you need to explore, learn, and be inspired"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map(({ Icon, title, description, href, linkText }) => (
            <div
              key={title}
              className="relative bg-surface border border-border rounded-2xl p-8 hover:border-gold/30 transition-all overflow-hidden group"
            >
              {/* Glow top-right */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-colors" />

              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                <Icon className="text-gold" size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                {title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {description}
              </p>
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:text-gold-light transition-colors"
              >
                {linkText}
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block text-5xl mb-6">🌿</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to explore?
          </h2>
          <p className="text-muted text-lg mb-10">
            Dive into our gallery and discover the beauty of henna art from
            cultures around the globe.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/gallery"
              className="group flex items-center gap-2 bg-gold text-background font-semibold px-8 py-3.5 rounded-full hover:bg-gold-light transition-all hover:shadow-lg hover:shadow-gold/25"
            >
              Explore the Gallery
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/styles"
              className="flex items-center gap-2 border border-border text-foreground font-semibold px-8 py-3.5 rounded-full hover:border-gold/50 hover:text-gold transition-all"
            >
              <Globe size={18} />
              Browse Styles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
