"use server";

import {
  setSubscriptionCookie,
  removeSubscriptionCookie,
} from "@/lib/subscription";
import { revalidatePath } from "next/cache";

export async function subscribe() {
  await setSubscriptionCookie();
  revalidatePath("/", "layout");
}

export async function unsubscribe() {
  await removeSubscriptionCookie();
  revalidatePath("/", "layout");
}
