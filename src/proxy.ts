import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "subscription_token";
const BASE_URL = process.env.API_BASE_URL;
const BYPASS_TOKEN = process.env.X_VERCEL_PROTECTION_BYPASS;

async function validateToken(token: string): Promise<boolean> {
  try {
    const headers: Record<string, string> = {
      "x-subscription-token": token,
    };
    if (BYPASS_TOKEN) {
      headers["x-vercel-protection-bypass"] = BYPASS_TOKEN;
    }

    const res = await fetch(`${BASE_URL}/subscription`, { headers });
    if (!res.ok) return false;

    const json = await res.json();
    return json.data?.status === "active";
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const headers = new Headers(request.headers);
    headers.set("x-subscription-status", "anonymous");
    return NextResponse.next({ request: { headers } });
  }

  const isActive = await validateToken(token);
  const headers = new Headers(request.headers);
  headers.set("x-subscription-status", isActive ? "active" : "inactive");

  if (!isActive) {
    const response = NextResponse.next({ request: { headers } });
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: "/articles/:path*",
};
