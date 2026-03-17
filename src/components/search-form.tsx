"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  slug: string;
  name: string;
  articleCount: number;
}

export function SearchForm({
  initialQuery,
  initialCategory,
  categories,
}: {
  initialQuery: string;
  initialCategory: string;
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const pushSearch = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("category", cat);
      const qs = params.toString();
      router.push(`/search${qs ? `?${qs}` : ""}`);
    },
    [router],
  );

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setCategory(searchParams.get("category") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (query.length >= 3) {
      const timeout = setTimeout(() => pushSearch(query, category), 300);
      return () => clearTimeout(timeout);
    }
  }, [query, category, pushSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    pushSearch(query, category);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    pushSearch(query, value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="flex-1 rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-black/40"
      />

      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black outline-none transition-colors focus:border-black/40"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80"
      >
        Search
      </button>
    </form>
  );
}
