"use client";

import Link from "next/link";

export default function HowToUsePage() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hexglow.svg')] bg-repeat opacity-100 pointer-events-none"></div>

      <nav className="relative z-10 flex justify-between items-center px-12 py-8">
        <Link href="/" className="text-3xl font-bold tracking-tight hover:text-gray-400 transition">
          revamp.ai
        </Link>

        <div className="hidden md:flex gap-12 text-lg items-center">
          <Link
            href="/howitworks"
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            How It Works
          </Link>

          <Link
            href="/howtouse"
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            How to Use
          </Link>

          <Link
            href="/about"
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            About Us
          </Link>
        </div>
      </nav>

      <section className="relative z-10 flex-1 flex items-center justify-center px-12 py-16">
        <div className="max-w-4xl w-full space-y-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">How to Use</h1>
            <p className="text-lg text-gray-300">
              Quick guide to get the best, most complete previews when modernizing a site.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-3">
              <h2 className="text-2xl font-semibold">1) Enter a full URL</h2>
              <p className="text-gray-300">
                Include the protocol (`https://example.com`). We fetch the live HTML and show the original next to the AI-modernized version.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-3">
              <h2 className="text-2xl font-semibold">2) Works best with static sites</h2>
              <p className="text-gray-300">
                This tool modernizes <strong>static HTML</strong> and server-rendered pages. JavaScript-heavy sites (React, Vue, Angular) won't work well since we only fetch the source HTML, not the rendered output.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-3">
              <h2 className="text-2xl font-semibold">3) Wait for the previews</h2>
              <p className="text-gray-300">
                The Results page scrapes the original, runs AI to modernize it, and renders both. Use “Copy code” to grab either HTML.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-3">
              <h2 className="text-2xl font-semibold">4) What to expect</h2>
              <p className="text-gray-300">
                If something looks blank or broken, it's usually blocked assets (CSP), very old markup, or a JavaScript-heavy site. Try a different URL for best results.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="inline-block bg-white !text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Try it now
            </Link>
            <Link
              href="/howitworks"
              className="inline-block px-8 py-3 rounded-md border border-gray-700 hover:border-gray-500 transition"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
