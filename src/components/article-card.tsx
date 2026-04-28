import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ArticleCard({
  article,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  article: Article;
  sizes?: string;
}) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black/5">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={sizes}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 font-semibold uppercase tracking-wider text-black/60">
            {article.category}
          </span>
          <time className="text-black/40" dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-black group-hover:underline">
          {article.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-black/60">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
