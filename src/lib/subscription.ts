import { cookies } from "next/headers";

const STATUS_COOKIE = "subscribed";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function getSubscription() {
  const cookieStore = await cookies();
  const isSubscribed = cookieStore.get(STATUS_COOKIE)?.value === "1";
  return { isSubscribed };
}

export async function setSubscriptionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(STATUS_COOKIE, "1", {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    httpOnly: false,
  });
}

export async function removeSubscriptionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(STATUS_COOKIE, "", {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
    path: "/",
    httpOnly: false,
  });
}
