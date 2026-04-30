"use server";

import { cookies } from "next/headers";
import { after } from "next/server";
import { revalidatePath } from "next/cache";
import {
  TOKEN_COOKIE,
  createSubscription,
  activateSubscription,
  deactivateSubscription,
  verifySubscription,
  setSubscriptionCookies,
  removeSubscriptionCookies,
} from "@/lib/subscription";

type ActionResult = { error?: string };

export async function subscribe(): Promise<ActionResult> {
  const cookieStore = await cookies();
  let token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (!token) {
    try {
      token = await createSubscription();
    } catch {
      return { error: "Unable to subscribe. Please try again." };
    }
  }

  await setSubscriptionCookies(token);

  const tokenToActivate = token;
  after(async () => {
    try {
      await activateSubscription(tokenToActivate);
      await verifySubscription(tokenToActivate);
    } catch {
      /* activation runs in background */
    }
  });

  revalidatePath("/", "layout");
  return {};
}

export async function unsubscribe(): Promise<ActionResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  await removeSubscriptionCookies();

  if (token) {
    after(async () => {
      try {
        await deactivateSubscription(token);
      } catch {
        /* deactivation runs in background */
      }
    });
  }

  revalidatePath("/", "layout");
  return {};
}
