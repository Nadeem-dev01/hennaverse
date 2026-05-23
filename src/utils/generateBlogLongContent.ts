export function generateBlogLongContent(title: string, category: string, primaryImage: string): string {
  // Images to intersperse
  const images = [
    "/flowers-with-meshwork-front-hand-mehndi-1024x683.avif",
    "/minimalistic-back-hand-mehendi-1024x1024.avif",
    "/front-hand-mehendi-with-bird-motifs.avif"
  ];

  // ~80 words
  const fillerChunk = "Henna, known globally for its intricate beauty and deep cultural roots, represents a confluence of art, tradition, and personal expression. From the sprawling deserts of North Africa to the bustling wedding halls of South Asia, the application of mehndi has symbolized joy, luck, and positive energy for centuries. Mastering the perfect consistency of the paste is an art form in itself, requiring the delicate balance of eucalyptus oil, lemon juice, and fine henna powder. When applied, the cooling sensation provides immediate relief in warm climates, while the resulting dark stain leaves a lasting impression.";

  return `
    <h2 id="introduction">Introduction to ${title}</h2>
    <p>Welcome to our deep dive into <strong>${title}</strong>. As henna enthusiasts, we know that every style, technique, and tradition has a story to tell. Whether you are preparing for a grand celebration or simply looking to expand your artistic repertoire, this guide will walk you through the fascinating topic of ${category.toLowerCase()}.</p>
    
    <div class="my-10 relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border">
      <img src="${images[0]}" alt="Henna style" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    </div>

    <h2 id="core-concepts">The Art and Tradition</h2>
    <p>${fillerChunk}</p>

    <div class="my-10 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border">
      <img src="${images[1]}" alt="Minimalist henna style" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    </div>

    <h2 id="conclusion">Final Thoughts</h2>
    <p>We hope this exploration of <strong>${title}</strong> has inspired you. The world of henna is vast and welcoming. Keep practicing, keep exploring, and remember that every line you draw is a continuation of a beautiful, ancient human tradition.</p>

    <div class="my-10 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border">
      <img src="${images[2]}" alt="Dotwork henna technique" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    </div>
  `;
}
