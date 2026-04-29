"use client";

import {
  createContext,
  useContext,
  useEffect,
  useOptimistic,
  useState,
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

function readStatusCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c === "subscribed=1");
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [optimistic, setOptimistic] = useOptimistic(isSubscribed);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsSubscribed(readStatusCookie());
  }, []);

  function subscribe() {
    startTransition(async () => {
      setOptimistic(true);
      await subscribeAction();
      setIsSubscribed(true);
    });
  }

  function unsubscribe() {
    startTransition(async () => {
      setOptimistic(false);
      await unsubscribeAction();
      setIsSubscribed(false);
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
