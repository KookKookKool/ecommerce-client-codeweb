/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "aceternity.com",
      },
      {
        hostname: "img.icons8.com", 
      },
    ],
  },
};

export default nextConfig;
