import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "terra-drone.com.sa",
      },
    ],
  },
};

export default nextConfig;
