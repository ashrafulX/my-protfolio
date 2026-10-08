import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_INFO.url.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/blog/*", "/llms.txt", "/llms-full.txt"],
        disallow: [
          "/_next/",
          "/api/",
          "/admin/",
          "/og/",
          "/rss/",
          "/vcard/",
          "/blog.mdx/",
          "/*.mdx",
          "/*.md",
        ],
      },
      {
        userAgent: ["Googlebot", "Googlebot-Image"],
        allow: ["/", "/blog", "/blog/*", "/images/*", "/favicon.ico", "/favicon.png"],
        disallow: ["/_next/", "/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
