import { cacheLife, cacheTag } from "next/cache";
import { fetchAPI } from "@/lib/api";

interface BreakingNews {
  id: string;
  headline: string;
  summary: string;
  articleId: string;
  category: string;
  publishedAt: string;
  urgent: boolean;
}

export async function Banner() {
  "use cache";
  cacheLife("minutes");
  cacheTag("breaking-news");

  const news = await fetchAPI<BreakingNews>("/breaking-news");

  if (!news) return null;

  return (
    <div className="w-full bg-black px-4 py-3 text-center text-sm text-white">
      <p className="flex items-center justify-center gap-3">
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-black">
          {news.category}
        </span>
        <span className="font-medium">{news.headline}</span>
      </p>
    </div>
  );
}
