import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  TOKEN_COOKIE,
  STATUS_COOKIE,
  HEADER_STATUS,
} from "@/lib/subscription";

function forward(headers: Headers) {
  return NextResponse.next({ request: { headers } });
}

export async function proxy(request: NextRequest) {
  const reqHeaders = new Headers(request.headers);
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  if (!token) {
    reqHeaders.set(HEADER_STATUS, "inactive");
    return forward(reqHeaders);
  }

  const activeSignal = request.cookies.get(STATUS_COOKIE)?.value;
  if (activeSignal === "1") {
    reqHeaders.set(HEADER_STATUS, "active");
    return forward(reqHeaders);
  }

  reqHeaders.set("x-subscription-token", token);
  return forward(reqHeaders);
}

export const config = {
  matcher: "/articles/:path*",
};
