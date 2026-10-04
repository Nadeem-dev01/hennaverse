import Link from "next/link";
import { blogs } from "@/data/blogs";

export interface CategoryFactbank {
  culturalBackground?: string[];
  motifs?: string[];
  applicationTips?: string[];
}

// Background, motifs and tips for a category, taken from its factbank, plus
// links to blog guides that mention the category.
export default function CategoryGuide({
  title,
  slug,
  factbank,
}: {
  title: string;
  slug: string;
  factbank: CategoryFactbank | null;
}) {
  const background = factbank?.culturalBackground ?? [];
  const motifs = factbank?.motifs ?? [];
  const tips = factbank?.applicationTips ?? [];

  const keyword = slug.replace(/-/g, " ");
  const matching = blogs.filter((b) => `${b.title} ${b.slug.replace(/-/g, " ")}`.toLowerCase().includes(keyword));
  const articles = (matching.length ? matching : blogs).slice(0, 3);

  return (
    <>
      {background.length > 0 && (
        <section className="prose prose-invert prose-gold max-w-none mt-16" id="guide">
          <h2>{title}: Background and Style</h2>
          <p>{background.join(" ")}</p>

          {motifs.length > 0 && (
            <>
              <h3>Common motifs</h3>
              <ul>
                {motifs.map((motif) => (
                  <li key={motif}>{motif}</li>
                ))}
              </ul>
            </>
          )}

          {tips.length > 0 && (
            <>
              <h3>Application tips</h3>
              <ul>
                {tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {articles.length > 0 && (
        <section className="mt-12 p-6 bg-surface border border-border rounded-xl">
          <h2 className="text-lg font-serif text-gold mb-4">Related Henna Guides</h2>
          <ul className="flex flex-col gap-3">
            {articles.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-muted hover:text-gold transition-colors">
                  <span className="text-gold opacity-50">→</span> {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
