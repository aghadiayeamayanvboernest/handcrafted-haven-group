import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Seeded placeholder photos for demo product/artisan imagery.
    // Swap for the real asset host (or /public) once photography is ready.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
