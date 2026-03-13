import Image from "next/image";
import Link from "next/link";
import { fetchAPI } from "@/lib/api";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: { name: string; avatar: string };
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function FeaturedArticles() {
  const articles = await fetchAPI<Article[]>("/articles");

  const displayed = articles.slice(0, 6);

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl font-bold tracking-tight text-black">
          Latest Articles
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black/5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          ))}
        </div>
      </div>
    </section>
  );
}
