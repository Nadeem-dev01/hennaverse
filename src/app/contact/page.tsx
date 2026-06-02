import { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | HennaVerse",
  description: "Get in touch with the HennaVerse team for inquiries, feedback, or artist collaborations.",
  keywords: [
    "contact hennaverse",
    "mehndi design help",
    "henna art inquiry",
    "mehndi artist contact",
    "henna design support",
    "mehndi website contact",
    "henna art collaboration",
    "mehndi feedback",
    "henna design questions",
    "mehndi partnership",
    "contact henna website",
    "mehndi artist inquiry",
    "henna gallery contact",
    "mehndi blog contact",
    "henna tutorial help",
    "mehndi design request",
    "henna art feedback",
    "mehndi community contact",
    "henna collaboration",
    "mehndi sponsorship",
    "henna artist booking",
    "mehndi event inquiry",
    "henna workshop contact",
    "mehndi class inquiry",
    "henna art submission",
    "mehndi design submission",
    "henna gallery submission",
    "mehndi content partnership",
    "henna advertising",
    "mehndi media inquiry",
    "henna press contact",
    "mehndi brand collaboration",
    "henna influencer contact",
    "mehndi customer support",
    "henna help desk",
    "mehndi question",
    "henna support team",
    "mehndi artist directory",
    "henna business inquiry",
    "contact mehndi team"
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
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
  );
}
