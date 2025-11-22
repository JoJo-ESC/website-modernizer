import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable LightningCSS to avoid native binary issues on some build hosts
    optimizeCss: false,
  },
};

export default nextConfig;
