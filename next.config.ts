import type { NextConfig } from "next";
import path from "path";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const rewrites: NextConfig["rewrites"] = async () => {
  return [
    {
      source: "/blog/:slug.mdx",
      destination: "/blog.mdx/:slug",
    },
    {
      source: "/components/:slug.mdx",
      destination: "/blog.mdx/:slug",
    },
  ];
};

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/my-protfolio" : undefined,
  trailingSlash: isGitHubPages,
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  // TODO: replace with your own machine's hostname if you use this dev feature
  allowedDevOrigins: ["localhost"],
  turbopack: {
    root: path.join(__dirname, "."),
  },
  devIndicators: false,
  images: {
    unoptimized: isGitHubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.chanhdai.com",
        port: "",
      },
    ],
    qualities: [75, 100],
  },
  ...(isGitHubPages ? {} : { rewrites }),
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           // Prevents MIME type sniffing, reducing the risk of malicious file uploads
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           // Protects against clickjacking attacks by preventing your site from being embedded in iframes.
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //         {
  //           // Controls how much referrer information is included with requests, balancing security and functionality.
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
