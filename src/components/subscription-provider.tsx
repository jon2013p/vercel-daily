"use client";

import {
  createContext,
  useContext,
  useOptimistic,
  useSyncExternalStore,
  useTransition,
  type ReactNode,
} from "react";
import {
  subscribe as subscribeAction,
  unsubscribe as unsubscribeAction,
} from "@/app/actions/subscription";

interface SubscriptionContextValue {
  isSubscribed: boolean;
  confirmedSubscribed: boolean;
  isPending: boolean;
  subscribe: () => void;
  unsubscribe: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  isSubscribed: false,
  confirmedSubscribed: false,
  isPending: false,
  subscribe: () => {},
  unsubscribe: () => {},
});

function subscribeFn(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}

function getSnapshot(): boolean {
  return document.cookie.split("; ").some((c) => c === "subscribed=1");
}

export function SubscriptionProvider({ children, initialSubscribed }: { children: ReactNode; initialSubscribed: boolean }) {
  const isSubscribed = useSyncExternalStore(subscribeFn, getSnapshot, () => initialSubscribed);
  const [optimistic, setOptimistic] = useOptimistic(isSubscribed);
  const [isPending, startTransition] = useTransition();

  function subscribe() {
    startTransition(async () => {
      setOptimistic(true);
      await subscribeAction();
    });
  }

  function unsubscribe() {
    startTransition(async () => {
      setOptimistic(false);
      await unsubscribeAction();
    });
  }

  return (
    <SubscriptionContext value={{ isSubscribed: optimistic, confirmedSubscribed: isSubscribed, isPending, subscribe, unsubscribe }}>
      {children}
    </SubscriptionContext>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
