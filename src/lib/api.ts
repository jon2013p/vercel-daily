const BASE_URL = process.env.API_BASE_URL;
const BYPASS_TOKEN = process.env.X_VERCEL_PROTECTION_BYPASS;

export async function fetchAPI<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value),
    );
  }

  const res = await fetch(url.toString(), {
    headers: {
      "x-vercel-protection-bypass": BYPASS_TOKEN ?? "",
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(`API returned unsuccessful response`);
  }

  return json.data as T;
}
