import { NextResponse } from "next/server";
import { rateLimit } from "../../lib/rateLimit";
import { validateExternalUrl } from "../../lib/urlValidation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("url");
  const client = req.headers.get("x-forwarded-for") || "anonymous";

  const limit = rateLimit(`proxy:${client}`, 40, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many asset requests, slow down." },
      { status: 429, headers: { "Retry-After": `${Math.ceil(limit.retryAfter / 1000)}` } }
    );
  }

  if (!target) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const upstream = validateExternalUrl(target);
  if (!upstream) {
    return NextResponse.json({ error: "Invalid or unsafe url" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(upstream.toString(), { signal: controller.signal });
    clearTimeout(timeout);

    const buf = await res.arrayBuffer();
    if (buf.byteLength > 5_000_000) {
      return NextResponse.json(
        { error: "Asset too large" },
        { status: 413 }
      );
    }

    const headers = new Headers();
    const contentType = res.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);
    // Prevent caching unpredictable external assets
    headers.set("cache-control", "no-store");

    return new NextResponse(buf, { status: res.status, headers });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch asset", details: err?.message || "Unknown error" },
      { status: 502 }
    );
  }
}
