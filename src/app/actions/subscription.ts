"use server";

import { cookies } from "next/headers";
import {
  createSubscription,
  activateSubscription,
  deactivateSubscription,
  setSubscriptionCookie,
  removeSubscriptionCookie,
} from "@/lib/subscription";
import { revalidatePath } from "next/cache";

const COOKIE_NAME = "subscription_token";

export async function checkSubscription() {
  const cookieStore = await cookies();
  return !!cookieStore.get(COOKIE_NAME)?.value;
}

export async function subscribe() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get(COOKIE_NAME)?.value ?? (await createSubscription());

  await activateSubscription(token);
  await setSubscriptionCookie(token);
  revalidatePath("/", "layout");
}

export async function unsubscribe() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    await deactivateSubscription(token);
  }

  await removeSubscriptionCookie();
  revalidatePath("/", "layout");
}
