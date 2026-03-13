export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
  category: string;
  author: { name: string; avatar: string };
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: number; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] };
