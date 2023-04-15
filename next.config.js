/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // for build static site
  // distDir: "dist", // change the output director
  images: {
    unoptimized: true, // disable the Image Optimization API
  },
};

module.exports = nextConfig;
