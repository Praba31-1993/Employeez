import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
