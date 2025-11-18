// Single consolidated implementation of the scrape endpoint.
import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// API: POST /api/scrape
export async function POST(request: Request) {
  try {
    // STEP 1 — Validate URL
    const { url } = await request.json();
    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // STEP 2 — Fetch webpage
    const response = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36",
      },
    });

    const rawHtml = response.data;

    // STEP 3 — Preprocessor: remove comment blocks and IE conditionals
    const preprocessedHtml = rawHtml
      .replace(/<!--\[if[\s\S]*?\]>[\s\S]*?<!\[endif\]-->/gi, "") // IE conditionals
      .replace(/<!--[\s\S]*?-->/g, ""); // All comments

    // STEP 4 — Load into Cheerio
    const $ = cheerio.load(preprocessedHtml);

    // STEP 5 — Remove unwanted blocks
    $("script").remove();
    $("style").remove();
    $("noscript").remove();
    $('link[rel="stylesheet"]').remove();

    // STEP 6 — Remove inline styles
    $("*").each((_, el) => {
      if ($(el).attr("style")) {
        $(el).removeAttr("style");
      }
    });

    // STEP 7 — Remove event handlers like onclick="", onload=""
    $("*").each((_, el) => {
      if (el && el.type === "tag") {
        const attribs = el.attribs || {};
        for (const attr in attribs) {
          if (attr.toLowerCase().startsWith("on")) {
            $(el).removeAttr(attr);
          }
        }
      }
    });

    // STEP 8 — Final regex cleaning on raw HTML output
    let finalHtml = $.html();

    finalHtml = finalHtml.replace(/style\s*=\s*"[^"]*"/g, "");
    finalHtml = finalHtml.replace(/style\s*=\s*'[^']*'/g, "");
    finalHtml = finalHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    finalHtml = finalHtml.replace(/on[a-zA-Z:-]+\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/gi, "");

    // Return cleaned HTML for AI processing
    return NextResponse.json({ html: finalHtml });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to scrape site", details: error.message },
      { status: 500 }
    );
  }
}
