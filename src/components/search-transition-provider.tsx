"use client";

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
  type TransitionStartFunction,
} from "react";
import { SearchResultsSkeleton } from "@/components/search-results-skeleton";

interface SearchTransitionContextValue {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const SearchTransitionContext = createContext<SearchTransitionContextValue>({
  isPending: false,
  startTransition: (cb) => cb(),
});

export function SearchTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <SearchTransitionContext value={{ isPending, startTransition }}>
      {children}
    </SearchTransitionContext>
  );
}

export function useSearchTransition() {
  return useContext(SearchTransitionContext);
}

export function SearchLoadingWrapper({ children }: { children: ReactNode }) {
  const { isPending } = useSearchTransition();

  return (
    <>
      {isPending && <SearchResultsSkeleton />}
      <div className={isPending ? "hidden" : ""}>{children}</div>
    </>
  );
}
