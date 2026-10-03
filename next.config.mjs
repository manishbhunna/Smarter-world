/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "Smarter-world";

const nextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? `/${repoName}` : ""),
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? `/${repoName}/` : ""),
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? `/${repoName}` : ""),
  },
};

export default nextConfig;
