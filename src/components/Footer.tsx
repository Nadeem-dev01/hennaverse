import Link from "next/link";

const quickLinks = [
  { href: "/gallery", label: "Design Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/styles", label: "Henna Styles" },
  { href: "/about", label: "About Us" },
];

const styleLinks = [
  { href: "/styles/indian", label: "Indian Mehndi" },
  { href: "/styles/arabic", label: "Arabic Henna" },
  { href: "/styles/moroccan", label: "Moroccan" },
  { href: "/styles/pakistani", label: "Pakistani" },
];

function PinterestIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="17" x2="12" y2="3" />
      <path d="M8 21c2-3 1-6 1-8" />
      <path d="M16 21c-2-3-1-6-1-8" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-surface">
      {/* Gold divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-bold text-gradient-gold">
                HennaVerse
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Your premier destination for discovering stunning mehndi designs from
              cultures around the world. From traditional bridal patterns to modern
              minimal art.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted hover:text-gold transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="text-muted hover:text-gold transition-colors"
              >
                <PinterestIcon size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-muted hover:text-gold transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="text-muted hover:text-gold transition-colors"
              >
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Styles */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Henna Styles
            </h3>
            <ul className="space-y-3">
              {styleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Newsletter
            </h3>
            <p className="text-muted text-sm mb-4">
              Get weekly design inspiration and henna tips delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-gold focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-gold text-background font-medium text-sm py-2.5 rounded-lg hover:bg-gold-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted text-xs">
              © {currentYear} HennaVerse. All rights reserved.
            </p>
            <p className="text-muted text-xs">
              Celebrating the art of henna across cultures
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
