import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allows production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allows production builds to complete even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
  devIndicators: {
    appIsrStatus: false, // Disables ISR status indicator in development
  },
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = false; // Disables source maps in development for better performance
    }
    return config;
  },
};

export default nextConfig;
