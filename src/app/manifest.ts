import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: SITE_INFO.name,
    name: SITE_INFO.name,
    description: SITE_INFO.description,
    icons: [
      {
        src: "/images/brand/favicon.jpeg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
      {
        src: "/images/brand/apple-touch-icon.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "/images/brand/apple-touch-icon.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/images/brand/apple-touch-icon.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
    id: "/?utm_source=pwa",
    start_url: "/?utm_source=pwa",
    display: "standalone",
    scope: "/",
    // TODO: add your own PWA install screenshots here once the site is live
    // (see Next.js manifest docs for the `screenshots` field format).
  };
}
