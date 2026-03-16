import { cookies } from "next/headers";

const COOKIE_NAME = "subscription_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const BASE_URL = process.env.API_BASE_URL;
const BYPASS_TOKEN = process.env.X_VERCEL_PROTECTION_BYPASS;

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
  const headers: Record<string, string> = {
    "x-vercel-protection-bypass": BYPASS_TOKEN ?? "",
  };

  if (token) {
    headers["x-subscription-token"] = token;
  }

  const res = await fetch(`${BASE_URL}${path}`, { method, headers });

  if (!res.ok) {
    throw new Error(`Subscription API error: ${res.status}`);
  }

  const json = await res.json();
  return json.data as Subscription;
}

export async function getSubscription() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value || null;

  if (!token) {
    return { isSubscribed: false, token: null };
  }

  try {
    const data = await subscriptionFetch("GET", "/subscription", token);
    return { isSubscribed: data.status === "active", token };
  } catch {
    return { isSubscribed: false, token };
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

export async function setSubscriptionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function removeSubscriptionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
