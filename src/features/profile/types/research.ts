export type Research = {
  id: string;
  title: string;
  /** e.g. "Ongoing", "Draft", "Published" */
  status: string;
  /** Optional rich text description; Markdown and line breaks supported. */
  description?: string;
};
