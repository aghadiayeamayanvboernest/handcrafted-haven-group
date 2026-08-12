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
      // OAuth provider avatar hosts (GitHub / Google profile pictures)
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // Supabase Storage — uploaded product images
      {
        protocol: "https",
        hostname: "venrwlqxxlwjvmqbjxoc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
