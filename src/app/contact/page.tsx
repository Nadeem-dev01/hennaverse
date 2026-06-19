import { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { Mail, MapPin, Phone } from "lucide-react";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const metadata: Metadata = {
  title: "Contact Us | Mehndi Design Henna",
  description: "Get in touch with Mehndi Design Henna for inquiries, feedback, or artist collaborations. We respond within 24 hours.",
  keywords: [
    "contact mehndi design henna",
    "henna artist near me",
    "henna tattoo artist near me",
    "bridal henna near me",
    "henna cones near me",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Mehndi Design Henna",
    description: "Get in touch with Mehndi Design Henna for inquiries, feedback, or artist collaborations.",
    url: `${BASE_URL}/contact`,
    siteName: "Mehndi Design Henna",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Mehndi Design Henna",
    description: "Get in touch with Mehndi Design Henna for inquiries, feedback, or artist collaborations.",
  },
};

export default function ContactPage() {
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Mehndi Design Henna",
    url: `${BASE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Mehndi Design Henna",
      email: "contact@mehndidesignhenna.com",
      url: BASE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <SectionHeading 
        title="Contact Us" 
        subtitle="We'd love to hear from you! Reach out for inquiries, feedback, or collaborations." 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Contact Information */}
        <div className="glass p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-serif text-gold mb-6">Get In Touch</h2>
          <p className="text-muted mb-8 leading-relaxed">
            Whether you have a question about a specific design, want to contribute to our gallery, or have an advertising inquiry, our team is ready to answer your questions.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-purple/10 p-3 rounded-full mr-4 border border-purple/20">
                <Mail className="text-purple" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Email</h3>
                <p className="text-muted">contact@mehndidesignhenna.com</p>
                <p className="text-sm text-muted mt-1">We aim to reply within 24 hours.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple/10 p-3 rounded-full mr-4 border border-purple/20">
                <MapPin className="text-purple" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Location</h3>
                <p className="text-muted">Global Digital Platform</p>
                <p className="text-sm text-muted mt-1">Celebrating henna art worldwide.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-surface p-8 rounded-2xl border border-border">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition-all"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition-all"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition-all"
                placeholder="How can we help?"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition-all resize-none"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button
              type="button"
              className="w-full bg-gold hover:bg-gold-light text-black font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Send Message
            </button>
            <p className="text-xs text-muted text-center mt-4">
              By submitting this form, you agree to our Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
