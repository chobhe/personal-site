import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source'
    });
    return config;
  },
  output: 'export',
  distDir: 'out',
  images: { unoptimized: true }
};



export default nextConfig;
