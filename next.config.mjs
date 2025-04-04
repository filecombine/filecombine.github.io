/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '', // No subdirectory
  assetPrefix: '/', // Ensures assets load correctly with leading slash
  // Your Next.js configuration options
};

export default nextConfig;
