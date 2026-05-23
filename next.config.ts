import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all local image formats including jpg, jpeg, png, avif, webp
    formats: ["image/avif", "image/webp"],
    // Unoptimized images in /public served as-is for max compatibility
    unoptimized: false,
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
