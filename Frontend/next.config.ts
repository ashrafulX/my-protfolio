import type { NextConfig } from "next";
import path from "path";

const rewrites: NextConfig["rewrites"] = async () => [
  { source: "/blog/:slug.mdx", destination: "/blog.mdx/:slug" },
  { source: "/components/:slug.mdx", destination: "/blog.mdx/:slug" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  allowedDevOrigins: ["localhost"],
  turbopack: { root: path.join(__dirname, ".") },
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "assets.chanhdai.com" },
    ],
    qualities: [75, 100],
  },

  rewrites,
};

export default nextConfig;
