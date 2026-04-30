import { cookies } from "next/headers";
import { cacheLife } from "next/cache";

export const TOKEN_COOKIE = "subscription_token";
export const STATUS_COOKIE = "subscribed";
export const HEADER_STATUS = "x-subscription-status";

const COOKIE_SHARED = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

interface Subscription {
  token: string;
  status: "active" | "inactive";
  subscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

async function subscriptionFetch(
  method: string,
  path: string,
  token?: string,
): Promise<Subscription> {
  const BASE_URL = process.env.API_BASE_URL;
  const BYPASS_TOKEN = process.env.X_VERCEL_PROTECTION_BYPASS;

  const headers: Record<string, string> = {
    "x-vercel-protection-bypass": BYPASS_TOKEN ?? "",
  };
  if (token) headers["x-subscription-token"] = token;

  const res = await fetch(`${BASE_URL}${path}`, { method, headers });
  if (!res.ok) throw new Error(`Subscription API error: ${res.status}`);

  const json = await res.json();
  return json.data as Subscription;
}

export async function verifySubscription(token: string): Promise<boolean> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });

  try {
    const data = await subscriptionFetch("GET", "/subscription", token);
    return data.status === "active";
  } catch {
    return false;
  }
}

export async function createSubscription(): Promise<string> {
  const data = await subscriptionFetch("POST", "/subscription/create");
  return data.token;
}

export async function activateSubscription(token: string) {
  await subscriptionFetch("POST", "/subscription", token);
}

export async function deactivateSubscription(token: string) {
  await subscriptionFetch("DELETE", "/subscription", token);
}

export async function setSubscriptionCookies(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, token, {
    ...COOKIE_SHARED,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
  cookieStore.set(STATUS_COOKIE, "1", {
    ...COOKIE_SHARED,
    httpOnly: false,
    maxAge: 60 * 60 * 24,
  });
}

export async function removeSubscriptionCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(STATUS_COOKIE);
}
