export type PostMetadata = {
  title: string;
  description: string;
  /**
   * Social/OG image URL for the post.
   * Use an absolute URL or a path under /public. Recommended size: 1200x630.
   */
  image?: string;
  category?: string;
  /**
   * Custom icon name or a Lucide icon name.
   * Used to visually represent the post in lists or navigation.
   */
  icon?: string;
  /**
   * Flag to show a "New" badge/highlight in the UI.
   */
  new?: boolean;
  /**
   * Flag to pin the post to the top of the list.
   */
  pinned?: boolean;
  /**
   * Post creation date as an ISO date string (e.g. YYYY-MM-DD). Used for sorting.
   */
  createdAt: string;
  /**
   * Last updated date as an ISO date string (e.g. YYYY-MM-DD).
   */
  updatedAt: string;
  author: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt?: string;
  readingTime?: number;
};

export type Post = {
  /** Editorial metadata used by the listing and post pages. */
  metadata: PostMetadata;
  /** SEO-friendly URL slug. */
  slug: string;
  /** Markdown content body. */
  content: string;
};
