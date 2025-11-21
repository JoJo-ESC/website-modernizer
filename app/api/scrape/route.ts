import { NextResponse } from "next/server";
import { rateLimit } from "../../lib/rateLimit";
import { validateExternalUrl } from "../../lib/urlValidation";

const MAX_HTML_BYTES = 1_500_000; // ~1.5MB
const WINDOW_MS = 60_000;
const MAX_REQS = 20;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get("url");
  const client = req.headers.get("x-forwarded-for") || "anonymous";

  const limit = rateLimit(`scrape:${client}`, MAX_REQS, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests, please slow down." },
      {
        status: 429,
        headers: { "Retry-After": `${Math.ceil(limit.retryAfter / 1000)}` },
      }
    );
  }

  const url = validateExternalUrl(rawUrl || "");

  if (!url) {
    return NextResponse.json({ error: "Invalid or unsafe URL provided" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch ${url}` },
        { status: response.status }
      );
    }

    const buf = await response.arrayBuffer();
    if (buf.byteLength > MAX_HTML_BYTES) {
      return NextResponse.json(
        { error: "Page is too large to process safely." },
        { status: 413 }
      );
    }

    const html = Buffer.from(buf).toString("utf-8");
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to scrape site", details: error.message },
      { status: 500 }
    );
  }
}
