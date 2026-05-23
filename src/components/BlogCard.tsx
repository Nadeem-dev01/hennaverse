"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  country: string;
  imageUrl: string;
  tags: string[];
}

interface BlogCardProps {
  blog: Blog;
  index?: number;
  featured?: boolean;
}

const gradients = [
  "from-purple-dark/50 to-gold/20",
  "from-gold/20 to-purple/30",
  "from-purple/20 to-surface",
  "from-gold/15 to-purple-dark/40",
];

export default function BlogCard({
  blog,
  index = 0,
  featured = false,
}: BlogCardProps) {
  const gradient = gradients[index % gradients.length];

  if (featured) {
    return (
      <Link href={`/blog/${blog.slug}`}>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group relative bg-surface rounded-2xl border border-border overflow-hidden hover:border-gold/30 transition-all"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div
              className={`aspect-[16/9] md:aspect-auto bg-gradient-to-br ${gradient} relative overflow-hidden`}
            >
              {blog.imageUrl ? (
                <Image 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <div className="w-40 h-40 mandala" />
                </div>
              )}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 text-xs font-medium bg-purple/80 text-white rounded-full backdrop-blur-sm shadow-sm">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="text-gold text-xs font-medium tracking-wider uppercase mb-3">
                Featured Article
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground group-hover:text-gold transition-colors mb-3 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {blog.readTime}
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${blog.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: (index % 6) * 0.1 }}
        whileHover={{ y: -6 }}
        className="group h-full bg-surface rounded-xl border border-border overflow-hidden hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all"
      >
        {/* Image */}
        <div className={`aspect-[16/10] bg-gradient-to-br ${gradient} relative overflow-hidden`}>
          {blog.imageUrl ? (
            <Image 
              src={blog.imageUrl} 
              alt={blog.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-15">
              <div className="w-20 h-20 mandala" />
            </div>
          )}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-0.5 text-[10px] font-medium bg-purple/80 text-white rounded-full backdrop-blur-sm shadow-sm">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-gold transition-colors mb-2 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {blog.readTime}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
