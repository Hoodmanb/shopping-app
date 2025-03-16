import nextPWA from "next-pwa";

// Define the PWA configuration
const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV === 'development',
});

// Export the Next.js config with PWA
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA(nextConfig)
