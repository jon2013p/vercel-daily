import { fetchAPI } from "@/lib/api";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
  featured: boolean;
}

export async function Banner() {
  const articles = await fetchAPI<Article[]>("/articles", {
    featured: "true",
  });

  const featured = articles[0];

  if (!featured) return null;

  return (
    <div className="w-full bg-black px-4 py-3 text-center text-sm text-white">
      <p className="flex items-center justify-center gap-3">
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-black">
          {featured.category}
        </span>
        <span className="font-medium">{featured.title}</span>
      </p>
    </div>
  );
}
