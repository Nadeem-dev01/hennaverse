"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { designs } from "@/data/designs";
import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Download,
  Link as LinkIcon,
} from "lucide-react";



export default function BlogClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [readProgress, setReadProgress] = useState(0);

  const blog = blogs.find((b) => b.slug === slug);

  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      link.setAttribute("download", `mehndi-design-${cleanTitle}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
      window.open(imageUrl, "_blank");
    }
  };

  const handleShare = async (title: string, description: string, urlPath: string) => {
    const shareUrl = `${window.location.origin}${urlPath}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Mehndi Design Henna`,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="text-gold hover:text-gold-light transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }



  const relatedPosts = blogs
    .filter(
      (b) =>
        b.slug !== slug &&
        (b.category === blog.category || b.country === blog.country)
    )
    .slice(0, 3);
    
  // Get some relevant images for the left sidebar gallery
  const galleryImages = designs
    .filter(d => 
       d.country.toLowerCase() === blog.country.toLowerCase() || 
       blog.title.toLowerCase().includes(d.style.toLowerCase())
    )
    .slice(0, 4)
    .map(d => d.imageUrl);
    
  if (galleryImages.length < 4) {
    galleryImages.push(...designs.slice(0, 4 - galleryImages.length).map(d => d.imageUrl));
  }

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-background/50">
        <motion.div
          className="h-full bg-gradient-to-r from-gold to-gold-light"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 max-w-4xl mx-auto lg:max-w-none"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT SIDE: Image Gallery (Stacks on top on mobile, sticky on desktop) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="sticky top-28 flex flex-col gap-4">
                
                {/* Main Hero Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="aspect-[4/5] bg-surface rounded-2xl relative overflow-hidden group shadow-lg shadow-black/20"
                >
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={galleryImages[0]}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Action buttons on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
                    <div className="w-full flex justify-end gap-2">
                      <button
                        onClick={() => handleDownload(blog.imageUrl || galleryImages[0], blog.title)}
                        className="p-2.5 rounded-lg bg-surface/90 hover:bg-gold text-foreground hover:text-background transition-all duration-300 cursor-pointer shadow-md"
                        title="Download Image"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleShare(
                          blog.title,
                          blog.excerpt,
                          `/blog/${blog.slug}`
                        )}
                        className="p-2.5 rounded-lg bg-surface/90 hover:bg-gold text-foreground hover:text-background transition-all duration-300 cursor-pointer shadow-md"
                        title="Share Link"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-gold font-medium uppercase tracking-wider block mb-1">{blog.category}</span>
                      <span className="text-sm font-semibold text-white line-clamp-2">{blog.title}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Additional Images Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.slice(1, 3).map((img, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1), duration: 0.5 }}
                      className="aspect-square rounded-xl overflow-hidden shadow-md shadow-black/10 group relative"
                    >
                      <img src={img} alt="Mehndi inspiration" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      
                      {/* Action buttons on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2 z-10">
                        <div className="w-full flex justify-end gap-1.5">
                          <button
                            onClick={() => handleDownload(img, `inspiration-${idx + 1}`)}
                            className="p-1.5 rounded-lg bg-surface/90 hover:bg-gold text-foreground hover:text-background transition-all duration-300 cursor-pointer shadow-sm"
                            title="Download Image"
                          >
                            <Download size={14} />
                          </button>
                          <button
                            onClick={() => handleShare(
                              `Mehndi Inspiration #${idx + 1}`,
                              "Look at this gorgeous mehndi design inspiration!",
                              `/blog/${blog.slug}`
                            )}
                            className="p-1.5 rounded-lg bg-surface/90 hover:bg-gold text-foreground hover:text-background transition-all duration-300 cursor-pointer shadow-sm"
                            title="Share Link"
                          >
                            <Share2 size={14} />
                          </button>
                        </div>
                        <span className="text-[10px] text-white/80 font-medium">Mehndi Design</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-surface/50 border border-border rounded-xl p-5 mt-2">
                  <h3 className="font-serif text-lg font-bold text-gold mb-2">Looking for more?</h3>
                  <p className="text-sm text-muted mb-4">Explore our gallery for thousands of high-quality mehndi designs and inspirations.</p>
                  <Link href="/gallery" className="text-sm font-semibold text-white bg-gold/90 px-4 py-2 rounded-lg hover:bg-gold transition-colors inline-block text-center w-full">
                    View Full Gallery
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Blog Content */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium bg-purple/20 text-purple rounded-full mb-4">
                  {blog.category}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    {blog.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {blog.readTime}
                  </span>
                </div>
              </motion.header>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="prose prose-invert prose-gold max-w-none mb-12
                  [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2
                  [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_p]:mb-5 [&_p]:text-lg
                  [&_ul]:text-foreground/80 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-lg
                  [&_ol]:text-foreground/80 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-lg
                  [&_li]:mb-2
                  [&_strong]:text-gold [&_strong]:font-semibold
                  [&_em]:text-gold-light
                  [&_blockquote]:border-l-4 [&_blockquote]:border-gold/30 [&_blockquote]:bg-surface/30 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:italic [&_blockquote]:text-muted [&_blockquote]:my-8
                  [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-gold-light"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-12 pt-6 border-t border-border">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-surface border border-border text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
                Read Next
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedPosts.map((post, index) => (
                  <BlogCard key={post.slug} blog={post} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
