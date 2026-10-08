import { cache } from "react";

import type { Post, PostMetadata } from "@/features/blog/types/post";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api" : "")
).replace(/\/+$/, "");

export const REVALIDATE_SECONDS = 60;

const getCmsResponse = cache(async (path: string): Promise<unknown | null> => {
  if (!API_URL) {
    return null;
  }

  try {
    const cleanPath = path.replace(/^\//, "");
    const response = await fetch(`${API_URL}/${cleanPath}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
});

export async function cmsGet<T>(path: string): Promise<T | null> {
  return (await getCmsResponse(path)) as T | null;
}

export type CmsProfile = {
  displayName: string;
  jobTitle: string;
  short_title: string;
  pronouns: string;
  email: string;
  phoneNumber: string;
  website: string;
  address: string;
  username: string;
  availability: string;
  hero_description: string;
  seo_keywords: string[];
  timezone: string;
  avatar: string;
  dateCreated: string | null;
  jobs: { title: string; company: string; website: string }[];
  flipSentences?: string[];
};

export type ApiList<T> = { results: T[]; count: number; next: string | null; previous: string | null };

export async function cmsList<T>(path: string): Promise<T[] | null> {
  const response = await cmsGet<T[] | ApiList<T>>(path);
  if (response === null) return null;
  return Array.isArray(response) ? response : response.results;
}

export type PortfolioBundle = {
  profile: CmsProfile | null;
  about: { content: string; title?: string } | null;
  resume: { title: string; url: string } | null;
  skills: unknown[];
  social_links: unknown[];
  experience: unknown[];
  education: unknown[];
  projects: unknown[];
  achievements: unknown[];
  certifications: unknown[];
  research: unknown[];
};

export async function getPortfolioBundle(): Promise<PortfolioBundle | null> {
  return cmsGet<PortfolioBundle>("all/");
}

type ApiPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string | null;
  tags: string[];
  publishedAt: string | null;
  readingTime: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export function toPost(post: ApiPost): Post {
  const publishedAt = post.publishedAt || post.created_at;
  const metadata: PostMetadata = {
    title: post.title,
    description: post.excerpt,
    image: post.featuredImage || undefined,
    category: post.category || undefined,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    author: post.author,
    tags: post.tags,
    status: "published",
    publishedAt,
    readingTime: post.readingTime,
    pinned: post.is_featured,
  };
  return { metadata, slug: post.slug, content: post.content };
}

export async function getCmsPosts(page = 1, pageSize = 10): Promise<Post[] | null> {
  const response = await cmsGet<ApiList<ApiPost> | ApiPost[]>(`blog/posts/?page=${page}&page_size=${pageSize}`);
  if (!response) return null;
  const list = Array.isArray(response) ? response : response.results;
  return list.map(toPost);
}

export async function getCmsPost(slug: string): Promise<Post | null> {
  const post = await cmsGet<ApiPost>(`blog/posts/${encodeURIComponent(slug)}/`);
  return post ? toPost(post) : null;
}
