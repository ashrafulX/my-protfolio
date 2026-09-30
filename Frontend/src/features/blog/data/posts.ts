import type { Post } from "@/features/blog/types/post";
import { getCmsPost, getCmsPosts } from "@/lib/cms-api";

export async function getAllPosts() {
  return getCmsPosts(1, 100);
}

export async function getPostBySlug(slug: string) {
  return getCmsPost(slug);
}

export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts?.filter((post) => post.metadata.category === category || post.metadata.tags.includes(category)) ?? null;
}

export function findNeighbour(posts: Post[], slug: string) {
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}
