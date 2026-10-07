import type { Metadata } from "next";

import { PostItem } from "@/features/blog/components/post-item";
import { getAllPosts } from "@/features/blog/data/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "A collection of articles on development, design, and ideas.",
};

export default async function Page() {
  const allPosts = await getAllPosts();

  return (
    <>
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Blog</h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <div className="relative pt-4">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allPosts?.map((post, index) => (
            <PostItem
              key={post.slug}
              post={post}
              shouldPreloadImage={index <= 4}
            />
          ))}
          {allPosts === null && <p className="col-span-full border-y border-edge px-4 py-12 text-center text-sm text-muted-foreground">Blog posts are unavailable right now.</p>}
          {allPosts?.length === 0 && <p className="col-span-full border-y border-edge px-4 py-12 text-center text-sm text-muted-foreground">No posts yet. Coming Soon.</p>}
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
