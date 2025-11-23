"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import CopyButton from "../components/CopyButton";

function injectBase(html: string, baseHref: string) {
  if (!html.trim()) return html;
  if (html.toLowerCase().includes("<base ")) return html;

  const baseTag = `<base href="${baseHref.replace(/"/g, "")}">`;
  const headMatch = html.match(/<head[^>]*>/i);
  if (headMatch?.index !== undefined) {
    const insertPos = headMatch.index + headMatch[0].length;
    return html.slice(0, insertPos) + baseTag + html.slice(insertPos);
  }

  return `<head>${baseTag}</head>${html}`;
}

function rewriteAssetsThroughProxy(html: string, baseHref: string) {
  if (!html.trim() || typeof window === "undefined") return html;

  const origin = window.location.origin;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const attrs = ["src", "href", "data-src", "background"];
  const toAbsolute = (value: string | null) => {
    if (!value) return null;
    try {
      const absolute = new URL(value, baseHref).toString();
      if (!absolute.startsWith("http")) return null;
      return absolute;
    } catch {
      return null;
    }
  };

  attrs.forEach((attr) => {
    doc.querySelectorAll<HTMLElement>(`[${attr}]`).forEach((el) => {
      const val = el.getAttribute(attr);
      if (val?.includes("cdn.tailwindcss.com")) return;
      const absolute = toAbsolute(val);
      if (!absolute) return;

      const proxied = `${origin}/api/proxy?url=${encodeURIComponent(absolute)}`;

      if (attr === "background") {
        el.removeAttribute("background");
        const style = el.getAttribute("style") || "";
        el.setAttribute("style", `${style};background-image: url('${proxied}')`.trim());
      } else {
        el.setAttribute(attr, proxied);
      }
    });
  });

  return doc.documentElement.outerHTML || html;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";

  const [originalHtml, setOriginalHtml] = useState("");
  const [modernHtml, setModernHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);
        setOriginalHtml("");
        setModernHtml("");

        const scrapeRes = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
        if (!scrapeRes.ok) {
          const errorData = await scrapeRes.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || `Failed to scrape URL (${scrapeRes.status})`);
        }
        const original = await scrapeRes.text();
        if (cancelled) return;
        const originalWithProxy = rewriteAssetsThroughProxy(original, url);
        setOriginalHtml(injectBase(originalWithProxy, url));

        const modernRes = await fetch("/api/modernize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: original }),
        });
        if (!modernRes.ok) {
          const errorData = await modernRes.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || `Failed to modernize HTML (${modernRes.status})`);
        }
        const modernData = await modernRes.json();
        if (cancelled) return;
        const modernWithProxy = rewriteAssetsThroughProxy(modernData.modernized || "", url);
        setModernHtml(injectBase(modernWithProxy, url));
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Something went wrong while processing that site.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <header className="flex items-center justify-between mb-8">
        <Link href="/" className="text-2xl font-semibold hover:text-gray-200 transition">
          revamp.ai
        </Link>
        <Link
          href="/"
          className="text-sm px-4 py-2 rounded-md border border-gray-700 hover:border-gray-500 transition"
        >
          Start over
        </Link>
      </header>

      <h1 className="text-4xl font-bold mb-8">Results for: {url || "—"}</h1>

      {error && (
        <p className="mb-6 text-red-400">
          {error} Double-check the link and try again.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 p-6 rounded-xl relative">
          <CopyButton text={originalHtml} />
          <h2 className="text-2xl font-bold mb-4">Original Website</h2>
          {loading && !originalHtml ? (
            <div className="w-full h-[600px] rounded border border-zinc-800 flex items-center justify-center text-gray-500">
              Scraping site…
            </div>
          ) : (
            <iframe srcDoc={originalHtml} className="w-full h-[600px] rounded border border-zinc-800 bg-white" />
          )}
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl relative">
          <CopyButton text={modernHtml} />
          <h2 className="text-2xl font-bold mb-4">Modernized Version</h2>
          {loading && !modernHtml ? (
            <div className="w-full h-[600px] rounded border border-zinc-800 flex items-center justify-center text-gray-500">
              Modernizing…
            </div>
          ) : (
            <iframe srcDoc={modernHtml} className="w-full h-[600px] rounded border border-zinc-800 bg-white" />
          )}
        </div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white p-10">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
