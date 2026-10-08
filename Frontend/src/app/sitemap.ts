import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_INFO.url.replace(/\/+$/, "");

  let allPosts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    allPosts = await getAllPosts();
  } catch {
    allPosts = [];
  }

  const posts: MetadataRoute.Sitemap = (allPosts ?? []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.updatedAt
      ? dayjs(post.metadata.updatedAt).toISOString()
      : dayjs().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: dayjs().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: dayjs().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  return [...routes, ...posts];
}
