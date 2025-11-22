import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { rateLimit } from '../../lib/rateLimit';

// Optionally ensure this runs on the Node.js runtime for server-side SDKs
export const runtime = 'nodejs';

// Allow slightly larger request body if needed
export const maxDuration = 30;
const MAX_HTML_CHARS = 200_000;
const MODERNIZE_LIMIT = 40;
const WINDOW_MS = 60_000;

// Basic utility to strip markdown fences and verify we have HTML
function stripCodeFences(text: string): string {
  let out = text.trim();
  // Match an opening fence possibly preceded by whitespace, with any non-newline language tag
  if (/^\s*```[^\n\r]*[\r]?\n/.test(out)) {
    out = out.replace(/^\s*```[^\n\r]*[\r]?\n/, '');
    // Remove a closing fence at the end, tolerating trailing spaces
    out = out.replace(/[\r]?\n?\s*```[\t ]*$/, '');
    out = out.trim();
  }
  return out;
}

function looksLikeHtml(text: string): boolean {
  const s = text.trim();
  // Reject typical markdown: heading at start or fenced code anywhere
  if (/^(?:#\s)|```/.test(s)) return false;
  // Require at least one element-like start tag (not <!doctype or <!-- comment -->)
  // Matches things like <div>, <section class="x">, <svg:rect>, <custom-el>
  if (!/<[a-zA-Z][\w:-]*\b[^>]*>/i.test(s)) return false;

  return true;
}
async function callModel(client: OpenAI, model: string, cleanedHtml: string, attempt: 1 | 2) {
  const system = [
    'You are an expert front-end engineer focused on modernizing HTML with Tailwind CSS.',
    'Your job: transform sanitized legacy HTML into clean, semantic HTML5 that uses Tailwind classes for layout, spacing, and typography.',
    'Must keep ALL meaningful text content. Remove inline styles, deprecated tags, presentational attributes.',
    'Use semantic tags (header, nav, main, section, article, aside, footer). Use accessible, logical structure.',
    'Target a neutral, modern aesthetic with Tailwind: containers, responsive spacing, readable typography.',
    'Return ONLY raw HTML. Do NOT include Markdown fences, explanations, or extra commentary.'
  ].join(' ');

  const stricter = attempt === 2 ? ' Return ONLY raw HTML without any code fences or commentary.' : '';

  const user = `Transform the following already-sanitized HTML into modern, semantic HTML5 using Tailwind CSS classes. 
- Keep all meaningful text content and hierarchy.
- Remove inline styles and deprecated attributes/tags.
- Improve readability with containers, spacing, and typography utilities.
- Avoid over-styling; prefer sensible defaults.
- Output ONLY pure HTML. No markdown, no explanations.${stricter}
\n\n<INPUT_HTML>\n${cleanedHtml}\n</INPUT_HTML>`;

  // Using Chat Completions for broad model compatibility
  const res = await client.chat.completions.create({
    model,
    temperature: 0.2,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ]
  });
  const content = res.choices?.[0]?.message?.content ?? '';
  return content;
}

export async function POST(req: Request) {
  try {
    const clientId = req.headers.get('x-forwarded-for') || 'anonymous';
    const limit = rateLimit(`modernize:${clientId}`, MODERNIZE_LIMIT, WINDOW_MS);
    if (!limit.ok) {
      return NextResponse.json(
        { error: 'Too many requests, please slow down.' },
        {
          status: 429,
          headers: { 'Retry-After': `${Math.ceil(limit.retryAfter / 1000)}` },
        }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server misconfiguration: missing model API key' },
        { status: 500 }
      );
    }

    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body.' },
        { status: 400 }
      );
    }

    const html = (payload as Record<string, unknown>)?.html;
    if (typeof html !== 'string' || html.trim().length === 0) {
      return NextResponse.json(
        { error: 'The "html" field is required and must be a non-empty string.' },
        { status: 400 }
      );
    }
    if (html.length > MAX_HTML_CHARS) {
      return NextResponse.json(
        { error: 'HTML is too large to process.' },
        { status: 413 }
      );
    }

     const client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1"
     }as any);

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    // First attempt
    let raw = await callModel(client, model, html, 1);
    let cleaned = stripCodeFences(raw);

    // If not HTML, try cleanup or retry once
    if (!looksLikeHtml(cleaned)) {
      // Secondary strict attempt
      raw = await callModel(client, model, html, 2);
      cleaned = stripCodeFences(raw);
    }

    // Final validation
    if (!looksLikeHtml(cleaned)) {
      return NextResponse.json(
        { error: 'Model did not return valid HTML after one retry.' },
        { status: 502 }
      );
    }

    // Optional: minimal post-cleaning to ensure no <script> sneaks in (should already be sanitized upstream)
    const finalHtml = cleaned.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');

    return NextResponse.json({ modernized: finalHtml });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to modernize HTML: ${message}` },
      { status: 500 }
    );
  }
}
