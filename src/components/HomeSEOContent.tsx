import AdSlot from "@/components/AdSlot";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";

export default function HomeSEOContent() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-border mt-12 bg-surface/30 rounded-3xl">
      <SectionHeading 
        title="The Ultimate Guide to Mehndi & Henna Art" 
        subtitle="Exploring the history, styles, and secrets to a perfect stain" 
      />
      
      <div className="prose prose-invert prose-gold max-w-none mt-12">
        <h2 id="history">The Ancient History of Henna</h2>
        <p>
          The history of Mehndi is as rich and intricate as the designs themselves. Tracing its roots back over 5000 years, archaeological evidence suggests that henna was used in ancient Egypt, where pharaohs were adorned with it before mummification. It then spread across trade routes to India, where it became an integral part of Vedic customs.
        </p>
        
        <div className="my-10 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border">
          <Image 
            src="/chakra-bridal-front-hand-mehndi-820x1024.avif" 
            alt="Intricate bridal henna design showing cultural significance"
            fill
            quality={60}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        <AdSlot className="my-12" adSlot="0000000001" />

        <h2 id="bridal">Bridal Mehndi Traditions</h2>
        <p>
          In many South Asian and Middle Eastern cultures, the Mehndi ceremony is a cornerstone of wedding festivities. It is an event filled with music, dancing, and the coming together of families. The bride's hands and feet are adorned with elaborate patterns that often take hours to apply. Hidden within these complex grids and floral motifs are the initials of the groom, a playful tradition that the groom must find on the wedding night.
        </p>

        <h2 id="styles">Popular Henna Styles Around the World</h2>
        <p>
          As henna traveled across the world, it adapted to the artistic sensibilities of different cultures. Today, we categorize these into several distinct styles:
        </p>
        <ul>
          <li><strong>Indian Mehndi:</strong> Characterized by highly dense, intricate patterns that cover the entire hand and arm. Motifs include peacocks, mangoes (paisley), and complex mandalas.</li>
          <li><strong>Arabic Mehndi:</strong> Known for its bold, flowing, and spaced-out designs. It heavily features large floral patterns, vines, and leaves, often leaving significant negative space on the skin.</li>
          <li><strong>Pakistani Mehndi:</strong> A beautiful fusion of Indian intricacy and Arabic boldness. It often includes precise geometric patterns mixed with delicate shading.</li>
          <li><strong>Moroccan Mehndi:</strong> Strictly geometric. You will rarely find floral patterns here. Instead, it relies on diamonds, squares, and straight lines, reflecting Berber traditions.</li>
          <li><strong>Western/Minimalist:</strong> A modern take focusing on symmetry, tiny details, and placement. Often restricted to just the fingers or the center of the palm.</li>
        </ul>

        <div className="my-10 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border">
          <Image 
            src="/minimalistic-back-hand-mehendi-with-vines-819x1024.avif" 
            alt="Minimalist modern henna design"
            fill
            quality={60}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        <AdSlot className="my-12" adSlot="0000000001" />

        <h2 id="motifs">Understanding Henna Motifs</h2>
        <p>
          Every swirl and dot in traditional mehndi carries a specific meaning. The lotus flower symbolizes purity and spiritual awakening. The peacock represents beauty and grace. The mandala, a circular design often placed in the center of the palm, represents the universe and spiritual balance. Understanding these motifs adds an incredible layer of depth to the art form.
        </p>
        
        <h2 id="aftercare">The Secret to the Darkest Stain: Aftercare</h2>
        <p>
          The most frequently asked question by henna enthusiasts is: "How do I get my mehndi dark?" The secret lies almost entirely in the aftercare. Natural henna is a slow dye. When the paste is removed, the stain will be bright orange. Over the next 48 hours, it will oxidize and darken to a rich mahogany or coffee brown.
        </p>
        <ol>
          <li><strong>Leave the paste on:</strong> The longer the paste sits on your skin, the better. Aim for a minimum of 4-6 hours, or ideally overnight.</li>
          <li><strong>Seal it:</strong> Dab a mixture of lemon juice and sugar onto the dried henna. This keeps it moist and stuck to your skin.</li>
          <li><strong>Stay warm:</strong> Henna thrives in heat. Keeping your hands warm (safely using a heating pad or drinking hot tea) will encourage a darker stain.</li>
          <li><strong>Avoid water:</strong> When it's time to remove the paste, gently scrape it off. Do NOT wash it with water for the first 12-24 hours.</li>
          <li><strong>Moisturize:</strong> Protect the stain from water and friction by applying a natural oil or lip balm over it before showering.</li>
        </ol>

        <div className="my-10 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border">
          <Image 
            src="/elephant-grid-back-hand-mehendi-819x1024.avif" 
            alt="Elephant motifs in traditional Indian Mehndi"
            fill
            quality={60}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        <AdSlot className="my-12" adSlot="0000000001" />

        <h2 id="safety">A Critical Note on Safety: The Dangers of Black Henna</h2>
        <p>
          While natural henna is incredibly safe and actually beneficial for the skin, you must be hyper-vigilant against "Black Henna". Natural henna is NEVER black. Black henna contains a toxic chemical called PPD (paraphenylenediamine), which is intended for hair dye, not skin. Applying PPD to the skin can cause severe, lifelong allergic reactions, chemical burns, and permanent scarring. Always ask your artist about their ingredients. Natural henna should smell earthy, like essential oils (eucalyptus, lavender, tea tree), and should only produce a red/brown stain.
        </p>

        <h2 id="modern-trends">Modern Mehndi Trends in 2025</h2>
        <p>
          The art form is constantly evolving. In 2025, we are seeing a massive surge in negative space designs, where the blank skin plays just as important a role as the henna itself. Symmetrical mesh-work and delicate vines cascading down a single finger are incredibly popular for bridesmaids. White henna (which is actually a body adhesive/paint, not real henna) continues to be a favorite for parties, offering a striking contrast on deeper skin tones.
        </p>

        <div className="my-10 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border">
          <Image 
            src="/sunflower-back-hand-mehendi-819x1024.avif" 
            alt="Modern sunflower henna trend"
            fill
            quality={60}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
