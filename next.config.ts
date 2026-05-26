import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all local image formats including jpg, jpeg, png, avif, webp
    formats: ["image/avif", "image/webp"],
    // Provide a better stepping for device sizes to reduce download size
    deviceSizes: [400, 480, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Set unoptimized to true to prevent hitting Vercel's free tier limit for Image Transformations (5K/mo)
    unoptimized: true,
  },
  // Serve static files with correct MIME types
  async headers() {
    return [
      {
        source: "/:path*.jpg",
        headers: [{ key: "Content-Type", value: "image/jpeg" }],
      },
      {
        source: "/:path*.jpeg",
        headers: [{ key: "Content-Type", value: "image/jpeg" }],
      },
    ];
  },
};

export default nextConfig;
