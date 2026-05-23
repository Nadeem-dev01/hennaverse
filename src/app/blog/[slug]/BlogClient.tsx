"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Link as LinkIcon,
} from "lucide-react";

import { generateBlogLongContent } from "@/utils/generateBlogLongContent";

export default function BlogClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [readProgress, setReadProgress] = useState(0);

  const blog = blogs.find((b) => b.slug === slug);

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

  const longContentHtml = generateBlogLongContent(blog.title, blog.category, blog.imageUrl);

  const relatedPosts = blogs
    .filter(
      (b) =>
        b.slug !== slug &&
        (b.category === blog.category || b.country === blog.country)
    )
    .slice(0, 3);

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
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
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

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="aspect-[16/9] bg-gradient-to-br from-purple-dark/40 via-surface to-gold/15 rounded-2xl mb-10 relative overflow-hidden group"
          >
            {blog.imageUrl ? (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <div className="w-32 h-32 mandala" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose prose-invert prose-gold max-w-none mb-12
              [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_p]:mb-5
              [&_ul]:text-foreground/80 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:text-foreground/80 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mb-2
              [&_strong]:text-gold [&_strong]:font-semibold
              [&_em]:text-gold-light
              [&_blockquote]:border-l-4 [&_blockquote]:border-gold/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted
              [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-gold-light"
            dangerouslySetInnerHTML={{ __html: longContentHtml }}
          />

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-surface border border-border text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share buttons */}
          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
