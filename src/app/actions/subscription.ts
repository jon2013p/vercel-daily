"use server";

import {
  createSubscription,
  activateSubscription,
  deactivateSubscription,
  setSubscriptionCookie,
  removeSubscriptionCookie,
  getSubscription,
} from "@/lib/subscription";
import { revalidatePath } from "next/cache";

export async function checkSubscription() {
  const { isSubscribed } = await getSubscription();
  return isSubscribed;
}

export async function subscribe() {
  const { token: existingToken } = await getSubscription();

  let token = existingToken;

  if (!token) {
    token = await createSubscription();
  }

  await activateSubscription(token);
  await setSubscriptionCookie(token);
  revalidatePath("/", "layout");
}

export async function unsubscribe() {
  const { token } = await getSubscription();

  if (token) {
    await deactivateSubscription(token);
  }

  await removeSubscriptionCookie();
  revalidatePath("/", "layout");
}
