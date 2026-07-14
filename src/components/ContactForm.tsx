"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Clear form inputs
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSubmitStatus("success");
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface p-8 rounded-2xl border border-border">
      {submitStatus === "success" ? (
        <div className="text-center py-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 text-gold border border-gold/30 text-3xl mb-4">
            ✓
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">Message Sent!</h3>
          <p className="text-muted max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitStatus("idle")}
            className="mt-6 px-6 py-2 border border-gold/30 hover:bg-gold hover:text-black text-gold font-semibold rounded-lg transition-colors text-sm"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition-all resize-none"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          {submitStatus === "error" && (
            <p className="text-sm text-red-500 font-medium">
              An error occurred while sending your message. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-black font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
          
          <p className="text-xs text-muted text-center mt-4">
            By submitting this form, you agree to our Privacy Policy.
          </p>
        </form>
      )}
    </div>
  );
}
