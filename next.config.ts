import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 480, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/:path*.jpg",
        headers: [
          { key: "Content-Type", value: "image/jpeg" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.jpeg",
        headers: [
          { key: "Content-Type", value: "image/jpeg" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.avif",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.webp",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy hardcoded page routes
      { source: "/arabic-mehndi", destination: "/mehndi-designs/arabic", permanent: true },
      { source: "/pakistani-mehndi", destination: "/mehndi-designs/pakistani", permanent: true },
      { source: "/bridalhennaz", destination: "/mehndi-designs/bridal", permanent: true },
      { source: "/eidhennaz", destination: "/mehndi-designs/eid", permanent: true },
      { source: "/mandala-mehndi", destination: "/mehndi-designs/mandala", permanent: true },
      { source: "/kids-mehndi", destination: "/mehndi-designs/kids", permanent: true },
      { source: "/rajasthani-mehndi", destination: "/mehndi-designs/rajasthani", permanent: true },
      { source: "/simple-designs", destination: "/mehndi-designs/simple", permanent: true },
      // Old long-form category slugs → new short slugs
      { source: "/mehndi-designs/bridal-mehndi-designs", destination: "/mehndi-designs/bridal", permanent: true },
      { source: "/mehndi-designs/arabic-mehndi-designs", destination: "/mehndi-designs/arabic", permanent: true },
      { source: "/mehndi-designs/indian-mehndi-designs", destination: "/mehndi-designs/indian", permanent: true },
      { source: "/mehndi-designs/pakistani-mehndi-designs", destination: "/mehndi-designs/pakistani", permanent: true },
      { source: "/mehndi-designs/simple-mehndi-designs", destination: "/mehndi-designs/simple", permanent: true },
      { source: "/mehndi-designs/back-hand-mehndi-designs", destination: "/mehndi-designs/back-hand", permanent: true },
      { source: "/mehndi-designs/front-hand-mehndi-designs", destination: "/mehndi-designs/front-hand", permanent: true },
      { source: "/mehndi-designs/finger-mehndi-designs", destination: "/mehndi-designs/finger", permanent: true },
      { source: "/mehndi-designs/mandala-mehndi-designs", destination: "/mehndi-designs/mandala", permanent: true },
      { source: "/mehndi-designs/minimalist-mehndi-designs", destination: "/mehndi-designs/minimal", permanent: true },
      { source: "/mehndi-designs/kids-mehndi-designs", destination: "/mehndi-designs/kids", permanent: true },
      { source: "/mehndi-designs/moroccan-mehndi-designs", destination: "/mehndi-designs/moroccan", permanent: true },
      { source: "/mehndi-designs/leg-mehndi-designs", destination: "/mehndi-designs/foot", permanent: true },
      { source: "/mehndi-designs/floral-mehndi-designs", destination: "/mehndi-designs/floral", permanent: true },
      { source: "/mehndi-designs/geometric-mehndi-designs", destination: "/mehndi-designs/geometric", permanent: true },
    ];
  },
};

export default nextConfig;
