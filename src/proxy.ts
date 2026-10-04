import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import designSlugs from "@/data/designSlugs.json";

const keptSlugs = new Set(designSlugs.kept);
// Longest slugs first so "back-hand-…" matches "back-hand", not a shorter prefix.
const categorySlugs = [...designSlugs.categories].sort((a, b) => b.length - a.length);

// The design dataset was reduced to one page per unique photo. Removed design
// URLs all start with their category slug, so send them (308) to that category
// page instead of returning a 404.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.replace(/^\/designs\//, "").replace(/\/$/, "");
  if (keptSlugs.has(slug)) return NextResponse.next();

  const category = categorySlugs.find((c) => slug.startsWith(`${c}-`));
  if (!category) return NextResponse.next();

  return NextResponse.redirect(new URL(`/mehndi-designs/${category}`, request.url), 308);
}

export const config = {
  matcher: "/designs/:slug+",
};
