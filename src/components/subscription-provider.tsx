"use client";

import {
  createContext,
  useContext,
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

export function SubscriptionProvider({
  initialSubscribed,
  children,
}: {
  initialSubscribed: boolean;
  children: ReactNode;
}) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [optimistic, setOptimistic] = useOptimistic(isSubscribed);
  const [isPending, startTransition] = useTransition();

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
