// Import a helper from Next.js that lets us send JSON responses
import { NextResponse } from "next/server";

// Import axios so we can fetch the website's HTML
import axios from "axios";

// Import cheerio so we can load and clean the HTML (like jQuery but for backend)
import * as cheerio from "cheerio";


// This function runs whenever someone makes a POST request to /api/scrape
export async function POST(request: Request) {
  try {
    // ------------------------------------------------------------
    // STEP 1 — Read the URL from the request body
    // ------------------------------------------------------------
    const { url } = await request.json();
    if (!url || !url.startsWith("http")) {
      return NextResponse.json(
        { error: "Invalid URL" },
        { status: 400 }
      );
    }

    // ------------------------------------------------------------
    // STEP 2 — Fetch the webpage HTML
    // ------------------------------------------------------------
    const response = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36",
      },
    });

    const rawHtml = response.data;

    // ------------------------------------------------------------
    // STEP 3 — Load HTML into Cheerio
    // ------------------------------------------------------------
    const $ = cheerio.load(rawHtml);

    // ------------------------------------------------------------
    // CLEANING STEP 1 — Remove script + style tags
    // ------------------------------------------------------------
    $("script").remove();
    $("style").remove();

    // ------------------------------------------------------------
    // CLEANING STEP 2 — Remove inline CSS (style="...")
    // ------------------------------------------------------------
    $("*").each((_, el) => {
      if ($(el).attr("style")) {
        $(el).removeAttr("style");
      }
    });

    // ------------------------------------------------------------
    // CLEANING STEP 3 — Remove inline JS handlers (onclick, onload, etc.)
    // ------------------------------------------------------------
    $("*").each((_, el) => {
      if (el && el.type === "tag") {
        for (const attr in el.attribs || {}) {
          if (attr.startsWith("on")) {
            $(el).removeAttr(attr);
          }
        }
      }
    });

    // ------------------------------------------------------------
    // CLEANING STEP 4 — Remove style="" inside comment blocks (but keep comments for now)
    // ------------------------------------------------------------
    $("*")
      .contents()
      .each(function () {
        if (this.type === "comment") {
          this.data = this.data.replace(/style\s*=\s*"[^"]*"/g, "");
          this.data = this.data.replace(/style\s*=\s*'[^']*'/g, "");
        }
      });

    // ------------------------------------------------------------
    // CLEANING STEP 5 — NOW remove all HTML comments everywhere
    // ------------------------------------------------------------
    $("*")
      .contents()
      .each(function () {
        if (this.type === "comment") {
          $(this).remove();
        }
      });

    // ------------------------------------------------------------
    // CLEANING STEP 6 — Final regex cleanup on full HTML
    // ------------------------------------------------------------
    let finalHtml = $.html();

    finalHtml = finalHtml.replace(/style\s*=\s*"[^"]*"/g, "");
    finalHtml = finalHtml.replace(/style\s*=\s*'[^']*'/g, "");
    finalHtml = finalHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    finalHtml = finalHtml.replace(/\son[a-zA-Z]+\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/gi, "");

    // ------------------------------------------------------------
    // STEP 4 — Return cleaned HTML to frontend
    // ------------------------------------------------------------
    return NextResponse.json({ html: finalHtml });

  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to scrape site",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
