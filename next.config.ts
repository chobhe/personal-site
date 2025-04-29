import type { NextConfig } from "next";

const repoName = 'personal-site'; 
const isProd = process.env.NODE_ENV === 'production';



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
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },
};



export default nextConfig;
