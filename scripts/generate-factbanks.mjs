#!/usr/bin/env node

/**
 * Generate factbank JSON stubs for all categories.
 * These provide curated facts for unique per-design content generation.
 * Usage: node scripts/generate-factbanks.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const FACTBANKS_DIR = join(ROOT, "src", "data", "factbanks");

mkdirSync(FACTBANKS_DIR, { recursive: true });

const factbanks = {
  arabic: {
    culturalBackground: [
      "Arabic mehndi originated in the Arabian Peninsula and spread through trade routes to North Africa and South Asia.",
      "In Gulf culture, henna is applied at the 'Laylat al-Henna' (Henna Night) before weddings.",
      "Arabic designs are distinguished by their bold, free-flowing patterns with ample negative space.",
      "The art of Arabic henna emphasizes large floral motifs connected by flowing vines and leaves.",
      "Gulf Arabic henna artists often use a thicker paste for bolder, more dramatic lines.",
      "Arabic mehndi designs are considered the easiest to learn for beginners due to their flowing nature.",
      "The negative space in Arabic henna is intentional — it allows each motif to stand out dramatically.",
      "In Emirati tradition, henna is applied to both hands and feet of the bride by a professional 'hannaya'.",
    ],
    motifs: ["bold florals", "free-flowing vines", "leaves and petals", "paisley drops", "shading and filling", "negative space emphasis", "diagonal trails", "cuff and bracelet borders"],
    applicationTips: [
      "Use a cone with a slightly larger opening for the signature thick-line Arabic style.",
      "Start from the index finger and flow the design diagonally across the hand.",
      "Practice the signature Arabic leaf first — a pointed almond shape with internal line work.",
      "Leave deliberate gaps between motifs; the spacing is what defines Arabic style.",
      "Arabic shading uses parallel lines inside motifs for a hatched-fill look.",
    ],
    faqPool: [
      { q: "How long does an Arabic mehndi design take to apply?", a: "A simple Arabic design takes 15-30 minutes per hand. More elaborate patterns can take 45-60 minutes." },
      { q: "What makes Arabic mehndi different from Indian mehndi?", a: "Arabic mehndi uses bold floral patterns with significant negative space, while Indian designs feature dense, full-coverage patterns with paisleys and fine detail." },
      { q: "Is Arabic mehndi good for beginners?", a: "Yes, Arabic mehndi is considered the best starting style for beginners. The flowing, larger patterns are more forgiving than intricate Indian designs." },
      { q: "How dark does Arabic mehndi stain?", a: "On palms and fingertips, Arabic mehndi stains a deep reddish-brown. On the back of the hand, expect a lighter orange-brown." },
      { q: "Can Arabic mehndi be applied on feet?", a: "Absolutely. Arabic foot designs typically feature trailing vines and florals along the top of the foot and around the ankles." },
    ],
  },
  indian: {
    culturalBackground: [
      "Indian mehndi has been practiced for over 5,000 years, with earliest evidence in Rajasthan and Gujarat.",
      "In Hindu weddings, the bride's mehndi ceremony (Mehndi Ki Raat) is a dedicated pre-wedding event.",
      "Indian tradition holds that a darker mehndi stain signifies deeper love and a stronger marriage bond.",
      "The groom's name or initials are often hidden within the bride's intricate design as a wedding game.",
      "Indian mehndi varies significantly by region — Rajasthani, Gujarati, and South Indian styles each have distinct characteristics.",
      "In many Indian families, the bride does not perform household chores until her mehndi has fully faded.",
      "Peacock motifs in Indian mehndi symbolize beauty, grace, and the arrival of the monsoon season.",
      "The lotus flower in Indian henna represents purity, enlightenment, and new beginnings.",
    ],
    motifs: ["paisleys (mango/ambi)", "peacocks", "lotus flowers", "elephant processions", "sun and moon", "temple domes", "bells and conch shells", "dense cross-hatching", "circular mandalas", "bride and groom figures"],
    applicationTips: [
      "Indian designs work from the center outward — start with a central mandala or paisley.",
      "Use a fine-tipped cone for the detailed inner work that defines Indian style.",
      "Build density gradually by layering increasingly fine detail inside major outlines.",
      "For Rajasthani style, create mirror-image symmetry between both hands.",
      "Practice peacock motifs separately before incorporating them into full designs.",
    ],
    faqPool: [
      { q: "How long does Indian mehndi take to apply?", a: "Full bridal Indian mehndi covering both hands up to the elbows can take 4-8 hours. Simple designs take 30-60 minutes." },
      { q: "What's the difference between Rajasthani and Marwari mehndi?", a: "Rajasthani and Marwari mehndi are essentially the same tradition — known for mirror-image symmetry, dense coverage, and elaborate storytelling patterns." },
      { q: "Why do Indian brides apply mehndi?", a: "Mehndi is considered auspicious in Indian culture. It symbolizes love, joy, and the bond between the bride and groom." },
      { q: "How long should I leave Indian mehndi on for a dark stain?", a: "Leave the paste on for 6-8 hours (many brides leave it overnight). Apply a lemon-sugar sealant and keep hands warm." },
    ],
  },
  pakistani: {
    culturalBackground: [
      "Pakistani mehndi uniquely blends Indian intricacy with Arabic boldness, creating a distinctive fusion style.",
      "The Mehndi function is one of the most important pre-wedding events in Pakistani culture.",
      "Pakistani mehndi traditions involve elaborate songs (mehndi geets) and dances during the ceremony.",
      "In Pakistani tradition, mehndi is applied not just to the bride but also to female family members and guests.",
      "Pakistani designs often extend well past the wrists, sometimes reaching the elbows.",
      "The color yellow is deeply associated with Pakistani mehndi celebrations.",
    ],
    motifs: ["Indo-Arabic fusion florals", "dense coverage with spacing", "peacocks and paisleys", "jaal (mesh) patterns", "heavy wrist cuffs", "finger-to-elbow trails"],
    applicationTips: [
      "Pakistani designs benefit from starting with a bold Arabic base and adding Indian detail work.",
      "Create strong border elements at the wrist before filling the main hand area.",
      "Use varying line thickness — thick outlines with thin inner detail is signature Pakistani style.",
    ],
    faqPool: [
      { q: "What makes Pakistani mehndi unique?", a: "Pakistani mehndi combines the bold free-flowing patterns of Arabic henna with the dense, intricate detail of Indian designs, creating a distinctive fusion style." },
      { q: "How is Pakistani bridal mehndi different from Indian bridal?", a: "Pakistani bridal mehndi often features more geometric precision and heavier cuff/border work, while Indian bridal tends toward narrative storytelling with figures and processions." },
      { q: "What occasions feature mehndi in Pakistan?", a: "Mehndi is essential for weddings (the Mehndi function), Eid celebrations, Shab-e-Barat, and other festive occasions." },
    ],
  },
  bridal: {
    culturalBackground: [
      "Bridal mehndi is practiced across South Asia, the Middle East, and North Africa with distinct regional traditions.",
      "In many cultures, bridal henna is applied by a senior married woman believed to bring good fortune.",
      "The darker the bridal mehndi stain, the more it traditionally symbolizes a loving and supportive mother-in-law.",
      "Modern bridal mehndi has evolved to include portraits, venue sketches, and love story panels.",
      "Bridal mehndi typically covers both hands (front and back) and both feet, sometimes extending to elbows and knees.",
      "Professional bridal mehndi artists can charge anywhere from $100 to $2000+ depending on the intricacy.",
    ],
    motifs: ["couple portraits", "kalash (sacred vessel)", "baraat procession", "peacocks", "jaimala (garland) scenes", "hidden names/initials", "palanquin motifs", "religious symbols"],
    applicationTips: [
      "Bridal mehndi should be applied 1-2 days before the wedding for the deepest stain.",
      "Apply a lemon-sugar sealant mix (1:1 ratio) once the paste dries to intensify the color.",
      "Avoid water on the mehndi for at least 12 hours after paste removal.",
      "Eucalyptus oil or Vicks VapoRub applied before the design can enhance the stain.",
    ],
    faqPool: [
      { q: "When should a bride get mehndi applied before the wedding?", a: "Apply mehndi 1-2 days before the wedding. The stain develops over 24-48 hours, reaching peak color by the wedding day." },
      { q: "How long does bridal mehndi take?", a: "Full bridal mehndi (both hands and feet) typically takes 4-8 hours depending on design complexity." },
      { q: "How can I make my bridal mehndi darker?", a: "Leave paste on overnight, apply lemon-sugar sealant, keep hands warm, and avoid water for 12-24 hours after removal." },
      { q: "Should the groom get mehndi too?", a: "In many South Asian traditions, the groom gets minimal mehndi — often just the initials of the bride on the palm." },
    ],
  },
  moroccan: {
    culturalBackground: [
      "Moroccan henna traditions are rooted in Berber culture, with designs varying between regions like Fez, Marrakech, and the Atlas Mountains.",
      "In Morocco, henna is applied at the 'Night of the Henna' (Laylat al-Henna) three days before the wedding.",
      "Moroccan henna is distinctive for its bold geometric patterns that differ significantly from South Asian floral styles.",
      "In Berber tradition, specific geometric henna symbols carry protective meanings against the evil eye.",
      "The Hamsa (Hand of Fatima) is a common Moroccan henna motif symbolizing protection and blessings.",
    ],
    motifs: ["geometric grids", "diamond shapes", "tribal lines", "hamsa (Hand of Fatima)", "zigzag borders", "interlocking triangles", "dot clusters", "berber symbols"],
    applicationTips: [
      "Moroccan designs use tape or stencils for clean geometric lines — a technique called 'henna bil scotch'.",
      "Start with the structural grid pattern before filling in individual geometric cells.",
      "Bold, even line work is essential for the Moroccan aesthetic — practice straight lines extensively.",
    ],
    faqPool: [
      { q: "What makes Moroccan henna different?", a: "Moroccan henna features bold geometric and tribal patterns derived from Berber traditions, unlike the floral styles of Arabic and Indian henna." },
      { q: "Do Moroccan henna designs have meanings?", a: "Yes, many Berber geometric symbols carry specific meanings — diamonds represent femininity, triangles provide protection, and the hamsa wards off the evil eye." },
      { q: "Is Moroccan henna paste different?", a: "Moroccan henna paste is known for being exceptionally pure and fine. Fez and Marrakech are famous for producing high-quality henna powder." },
    ],
  },
};

const stubCategories = [
  "gulf", "african", "turkish", "rajasthani", "indonesian",
  "simple", "modern", "traditional", "minimal", "floral",
  "mandala", "geometric", "jewelry", "royal",
  "full-hand", "back-hand", "front-hand", "finger", "foot",
  "eid", "kids",
];

for (const cat of stubCategories) {
  if (!factbanks[cat]) {
    factbanks[cat] = {
      culturalBackground: [],
      motifs: [],
      applicationTips: [],
      faqPool: [],
    };
  }
}

for (const [category, data] of Object.entries(factbanks)) {
  const outPath = join(FACTBANKS_DIR, `${category}.json`);
  writeFileSync(outPath, JSON.stringify(data, null, 2));
  const factCount = data.culturalBackground.length + data.motifs.length + data.applicationTips.length + data.faqPool.length;
  console.log(`  [${category}] ${factCount} facts → ${category}.json`);
}

console.log("\nDone. Fact banks generated.");
console.log("Note: stub categories have empty fact banks — curate them before running content generation.");
