import dayjs from "dayjs";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";

import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { SITE_INFO } from "@/config/site";
import { PostKeyboardShortcuts } from "@/features/blog/components/post-keyboard-shortcuts";
import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/post-page-actions";
import { PostShareMenu } from "@/features/blog/components/post-share-menu";
import {
  findNeighbour,
  getAllPosts,
  getPostBySlug,
} from "@/features/blog/data/posts";
import type { Post } from "@/features/blog/types/post";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return (posts ?? []).map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { title, description, image, updatedAt } = post.metadata;
  const publishedAt = post.metadata.publishedAt || post.metadata.createdAt;

  const postUrl = getPostUrl(post);
  const ogImage = image || `/og/simple?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      url: postUrl,
      type: "article",
      publishedTime: dayjs(publishedAt).toISOString(),
      modifiedTime: dayjs(updatedAt).toISOString(),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

function getPageJsonLd(post: Post): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image:
      post.metadata.image ||
      `/og/simple?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${SITE_INFO.url}${getPostUrl(post)}`,
    datePublished: dayjs(post.metadata.publishedAt || post.metadata.createdAt).toISOString(),
    dateModified: dayjs(post.metadata.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.metadata.author,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const { previous, next } = findNeighbour(allPosts ?? [], slug);

  const cleanedContent = cleanPostContent(post.content, post.metadata.title);
  const plainOpening = cleanedContent.replace(/<[^>]+>/g, "").trim().toLowerCase();
  const descSnippet = (post.metadata.description || "").trim().toLowerCase().slice(0, 40);
  const shouldShowDescription = Boolean(post.metadata.description) && (!descSnippet || !plainOpening.startsWith(descSnippet));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />

      <PostKeyboardShortcuts basePath="/blog" previous={previous} next={next} />

      <div className="flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
          variant="link"
          asChild
        >
          <Link href="/blog">
            <ArrowLeftIcon />
            Blog
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <LLMCopyButtonWithViewOptions
            markdownUrl={`${getPostUrl(post)}.mdx`}
            isComponent={false}
          />

          <PostShareMenu url={getPostUrl(post)} />

          {previous && (
            <Button variant="secondary" size="icon-sm" asChild>
              <Link href={`/blog/${previous.slug}`}>
                <ArrowLeftIcon />
                <span className="sr-only">Previous</span>
              </Link>
            </Button>
          )}

          {next && (
            <Button variant="secondary" size="icon-sm" asChild>
              <Link href={`/blog/${next.slug}`}>
                <span className="sr-only">Next</span>
                <ArrowRightIcon />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="screen-line-before screen-line-after">
        <div
          className={cn(
            "h-8",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
          )}
        />
      </div>

      <article className="px-6 md:px-10 py-8 font-sans">
        <header className="mb-8">
          <h1 className="text-3xl md:text-[38px] font-bold font-sans tracking-tight text-foreground leading-[1.25] mb-4">
            {post.metadata.title}
          </h1>

          {shouldShowDescription && (
            <p className="text-lg md:text-xl text-muted-foreground/90 font-sans font-normal leading-relaxed mb-5">
              {post.metadata.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-2 text-sm text-muted-foreground font-sans border-b border-edge/60 pb-5">
            <span className="font-medium text-foreground">By {post.metadata.author || "Ashraful"}</span>
            <span>·</span>
            <span>{dayjs(post.metadata.publishedAt || post.metadata.createdAt).format("MMMM D, YYYY")}</span>
            <span>·</span>
            <span>{post.metadata.readingTime || 1} min read</span>
            {post.metadata.category && (
              <>
                <span>·</span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {post.metadata.category}
                </span>
              </>
            )}
            {post.metadata.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {post.metadata.image && (
          <div className="my-8 overflow-hidden rounded-2xl border border-edge/80 shadow-xs bg-muted/10">
            <img
              className="w-full max-h-[500px] object-cover"
              src={post.metadata.image}
              alt={post.metadata.title}
            />
          </div>
        )}

        <div
          className={cn(
            "prose prose-zinc dark:prose-invert max-w-none font-sans text-[17px] leading-[1.85] text-foreground/90 tracking-normal",
            "prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight",
            "prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4",
            "prose-h2:text-2xl md:prose-h2:text-[27px] prose-h2:mt-12 prose-h2:mb-4 prose-h2:pt-4 prose-h2:border-t prose-h2:border-edge/30",
            "prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3",
            "prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2",
            "prose-p:my-5 prose-p:leading-[1.85]",
            "prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/40 hover:prose-a:decoration-primary",
            "prose-strong:font-semibold prose-strong:text-foreground",
            "prose-ul:my-5 prose-ul:pl-6 prose-ul:list-disc prose-ul:space-y-2",
            "prose-ol:my-5 prose-ol:pl-6 prose-ol:list-decimal prose-ol:space-y-2",
            "prose-li:leading-relaxed",
            "prose-blockquote:my-8 prose-blockquote:pl-5 prose-blockquote:border-l-4 prose-blockquote:border-primary/60 prose-blockquote:italic prose-blockquote:text-muted-foreground",
            "prose-img:rounded-xl prose-img:border prose-img:border-edge/80 prose-img:shadow-xs prose-img:my-8 prose-img:mx-auto prose-img:block",
            "prose-code:font-mono prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.35rem] prose-code:py-[0.2rem] prose-code:text-[0.9em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none"
          )}
        >
          <Markdown>{cleanedContent}</Markdown>
        </div>
      </article>

      <div className="screen-line-before h-4 w-full" />
    </>
  );
}

function getPostUrl(post: Post) {
  return `/blog/${post.slug}`;
}

function cleanPostContent(content: string, title: string) {
  let cleaned = (content || "").trim();
  const h1Match = cleaned.match(/^<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match) {
    const h1Text = h1Match[1].replace(/<[^>]+>/g, "").trim().toLowerCase();
    const cleanTitle = title.trim().toLowerCase();
    if (h1Text === cleanTitle || cleanTitle.includes(h1Text) || h1Text.includes(cleanTitle)) {
      cleaned = cleaned.substring(h1Match[0].length).trim();
    }
  }
  return cleaned;
}

