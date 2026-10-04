# SEO Plan — mehndidesignhenna.com

Audit date: 3 October 2026. Last updated: 4 October 2026. This file tracks why the site was not ranking, what has been fixed in code, and what is still to do.

Status: ✅ done in code · 🔲 to do · 👤 needs the site owner (cannot be done from code)

## 1. Why the site was not ranking

1. **Thin, duplicate design pages (main cause).** 5,000 `/designs/` pages shared only ~370 photos. Each page had about 24 words of templated text and an empty FAQ. Google treats this as mass-produced content ("Crawled – currently not indexed") and it lowers trust in the whole site.
2. **robots.txt blocked `/_next/`**, the folder holding the site's CSS and JavaScript, so Google could not render pages properly.
3. **Oversized pages.** Occasion and body-part pages loaded 600–800 images on one page (2–2.6 MB of HTML).
4. **Weak internal linking.** The 15 main category pages did not link to any design page; the `/mehndi-designs` hub linked only 15 of 26 categories.
5. **On-page errors.** Broken `�` characters in titles, brand name repeated twice in titles, pages without an H1, noindex pages listed in the sitemap, schema pointing to a missing logo file.
6. **No off-page authority.** No real social profiles linked, few or no backlinks.

## 2. Technical SEO

- ✅ robots.txt no longer blocks `/_next/` (`src/app/robots.ts`)
- ✅ Sitemap: removed noindex pages and empty occasion pages; updated last-modified date (`src/app/sitemap.ts`)
- ✅ Occasion and body-part pages paginated, 48 designs per page
- ✅ Pagination: page 1 links to the clean URL (no `?page=1`)
- ✅ RSS feed is generated at build time instead of on every request
- ✅ Removed a sitewide image preload that only the home page needed
- ✅ Fixed invalid nested `<main>` element on category pages
- ✅ Schema logo URL points to an existing file
- ✅ Share image (`og:image`) is now a 1200×630 JPG (`public/og-default.jpg`); AVIF does not show on Facebook/WhatsApp
- ✅ Design images now declare their real width and height (prevents layout shift)
- 👤 In Vercel → Domains, change the `mehndidesignhenna.com` → `www` redirect from 307 (temporary) to 308 (permanent)
- ✅ Gallery page (`/gallery`) is rendered on the server from the same 357 designs, so Google sees the cards and their links; filters and "load more" still work in the browser

## 3. Content and indexing

- ✅ Design pages reduced from 5,000 to 357 — one page per unique photo (`scripts/dedupe-designs.mjs`)
- ✅ Each remaining design page now has 100–160 words and 3 FAQs with FAQ schema
- ✅ Removed design URLs redirect (308) to their category page (`src/proxy.ts`)
- ✅ Removed non-design images (logo, banners) that had been published as designs
- ✅ Design counts in titles and text corrected ("5000+" → "350+", removed "150+/200+" claims)
- 👤 **Review the 357 design titles.** Titles, body part and difficulty were auto-generated and may not match the photo. Correct them in `src/data/designs/*.json`.
- 👤 **Replace low-resolution photos.** About half of the design photos are under 600 px wide; Google Images prefers 1200 px or wider.
- 👤 **Image rights.** Photos are marked `license: "Unknown"`. Use your own photos or get permission and credit the artist.
- ✅ Facts, motifs, tips and FAQs written for all 26 categories (`src/data/factbanks/`)
- ✅ Design page descriptions now use the facts of their own category
- ✅ Every category page has a guide section (background, common motifs, application tips) and an FAQ with FAQ schema (`src/components/CategoryGuide.tsx`)
- 👤 Add your own experience to the top category pages (bridal, arabic, simple, eid, back-hand): real prices, artist tips, your own photos
- 👤 Publish 2 original blog posts a week (about 30 posts today)

## 4. On-page SEO

- ✅ Fixed `�` characters in 14 category titles and 2 descriptions
- ✅ Brand name no longer repeated twice in page titles
- ✅ Every main page has exactly one H1 (gallery, hub, occasions, body parts, contact, legal pages)
- ✅ Occasions without designs are noindex
- ✅ Meta descriptions kept to 160 characters (rewritten on main pages, trimmed automatically on category, occasion and body-part pages — `src/lib/seo.ts`)

## 5. Internal linking

- ✅ Curated category pages list and link all designs in that category
- ✅ `/mehndi-designs` hub links all 26 categories, all occasions and all body parts
- ✅ Related designs on each design page come from the same category
- ✅ Blog posts link to matching design categories; category pages link to related blog guides
- ✅ Design cards on the home, styles and tools pages link to real design pages (they pointed to URLs that did not exist)

## 6. Mobile

- ✅ No horizontal scroll at phone width on category pages
- ✅ Ad slot moved below the hero image so content shows first
- 👤 Run PageSpeed Insights on mobile after deploy and send the report if anything is red

## 7. Off-page SEO (owner tasks)

- 👤 Create real Pinterest, Instagram and Facebook profiles, then put those links in the footer and in the Organization schema (`src/app/layout.tsx`). The footer currently links to generic search pages.
- 👤 Pin every design on Pinterest with a link back to its page — the best traffic source for this niche
- 👤 Ask henna artists whose work is featured for a link or mention
- 👤 List the site in relevant directories and answer mehndi questions on Quora/Reddit with a link where it helps

## 8. After each deploy

1. Search Console → Sitemaps → resubmit `sitemap.xml`
2. Search Console → URL Inspection → request indexing for the home page and top 10 category pages
3. Check Search Console → Pages weekly; "Crawled – currently not indexed" should fall over 4–8 weeks

## 9. Known issues not yet addressed

- 👤 **102 tool pages (`/tools/...`)** are generated from one template (`src/data/mehndiTools.ts`). If Search Console shows them as "Crawled – currently not indexed", they should be reduced to the few that are real tools (try-on, design finder).
- 👤 The home, styles and tools pages still use an older design list (`src/data/designs.ts`) with placeholder titles such as "Mandala Mehndi Design 1" and made-up view/like counts. Replace with real data or remove the counts.
