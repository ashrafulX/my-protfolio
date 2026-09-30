import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { PostItem } from "@/features/blog/components/post-item";
import { getAllPosts } from "@/features/blog/data/posts";

import { Panel, PanelHeader, PanelTitle } from "./panel";

export async function Blog() {
  const allPosts = await getAllPosts();

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>Blog</PanelTitle>
      </PanelHeader>

      {allPosts === null ? <p className="border-y border-edge px-4 py-8 text-center text-sm text-muted-foreground">Blog posts are unavailable right now.</p> : allPosts.length ? <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allPosts.slice(0, 4).map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </div> : <p className="border-y border-edge px-4 py-8 text-center text-sm text-muted-foreground">No posts yet. Coming Soon.</p>}

      {allPosts?.length ? <div className="screen-line-before flex justify-center py-2">
        <Button variant="default" asChild>
          <Link href="/blog">
            All Posts
          </Link>
        </Button>
      </div> : null}
    </Panel>
  );
}
