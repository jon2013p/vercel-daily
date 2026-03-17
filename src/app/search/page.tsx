import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { SearchResultsSkeleton } from "@/components/search-results-skeleton";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles, tutorials, and updates across Vercel Daily.",
};

interface Category {
  slug: string;
  name: string;
  articleCount: number;
}

type SearchParams = Promise<{ q?: string; category?: string }>;

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "", category = "" } = await searchParams;
  const categories = await fetchAPI<Category[]>("/categories");

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-black">
          Search Articles
        </h1>

        <div className="mb-10">
          <SearchForm
            initialQuery={q}
            initialCategory={category}
            categories={categories}
          />
        </div>

        <Suspense key={`${q}-${category}`} fallback={<SearchResultsSkeleton />}>
          <SearchResults query={q} category={category} />
        </Suspense>
      </div>
    </section>
  );
}
