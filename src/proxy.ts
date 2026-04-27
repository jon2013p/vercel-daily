import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "subscription_token";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const reqHeaders = new Headers(request.headers);

  reqHeaders.set(
    "x-subscription-status",
    token ? "authenticated" : "anonymous",
  );

  return NextResponse.next({ request: { headers: reqHeaders } });
}

export const config = {
  matcher: "/articles/:path*",
};
