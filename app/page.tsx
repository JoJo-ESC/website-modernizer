// --- your imports ---
"use client";
import { useState } from "react";
import HtmlPreview from "./components/HtmlPreview";

export default function Home() {
  const [inputHtml, setInputHtml] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleModernize() {
    setLoading(true);
    setOutputHtml("");

    try {
      const res = await fetch("/api/modernize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: inputHtml }),
      });

      const data = await res.json();
      if (data.modernized) setOutputHtml(data.modernized);
      else setOutputHtml("");
    } catch {
      setOutputHtml("");
    }

    setLoading(false);
  }

  return (
    <main className="bg-black text-white min-h-screen px-12 py-10 font-sans">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center py-6">
        <div className="text-3xl font-bold tracking-tight">revamp.ai</div>

        <div className="hidden md:flex gap-10 text-lg">
          <a
            className="text-white font-semibold tracking-wide hover:text-gray-400 transition-colors duration-200"
            style={{ textDecoration: "none" }}
          >
            How It Works
          </a>
          <a
            className="text-white font-semibold tracking-wide hover:text-gray-400 transition-colors duration-200"
            style={{ textDecoration: "none" }}
          >
            About Us
          </a>
        </div>

        <button className="bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-gray-200">
          Sign Up
        </button>
      </nav>

      {/* TWO COLUMNS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">

        {/* LEFT SIDE — text input + original preview */}
        <div className="space-y-8">

          {/* Text input */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Paste Your HTML Below</h2>
            <textarea
              className="w-full h-48 bg-black border border-gray-700 p-3 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="<div>Hello World</div>"
              value={inputHtml}
              onChange={(e) => setInputHtml(e.target.value)}
            />
            <button
              onClick={handleModernize}
              disabled={loading}
              className="mt-5 w-full py-3 rounded-md bg-emerald-500 hover:bg-emerald-600 transition font-medium disabled:opacity-50"
            >
              {loading ? "Modernizing..." : "Modernize"}
            </button>
          </div>

          {/* Original Preview */}
          <div className="bg-zinc-900 p-6 rounded-xl min-h-[320px] border border-zinc-800">
            <h3 className="text-lg font-semibold mb-3">Original (Input Preview)</h3>
            {inputHtml ? (
              <HtmlPreview html={inputHtml} />
            ) : (
              <p className="text-gray-500">Paste HTML above to preview it here.</p>
            )}
          </div>

        </div>

        {/* RIGHT SIDE — modernized preview + raw HTML */}
        <div className="space-y-8">

          {/* Modernized Preview */}
          <div className="bg-zinc-900 p-6 rounded-xl min-h-[320px] border border-zinc-800">
            <h3 className="text-lg font-semibold mb-3">Modernized (AI Output)</h3>
            {outputHtml ? (
              <HtmlPreview html={outputHtml} />
            ) : (
              <p className="text-gray-500">Click Modernize to see the redesigned result.</p>
            )}
          </div>

          {/* Modernized Raw Code */}
          <div className="bg-zinc-900 p-6 rounded-xl min-h-[240px] border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Modernized HTML (Raw)</h2>
            <div className="bg-black/40 p-4 rounded-lg min-h-[160px] overflow-auto border border-zinc-700 text-gray-300">
              {outputHtml ? (
                <pre className="whitespace-pre-wrap text-gray-200">{outputHtml}</pre>
              ) : (
                <p className="text-gray-500">Modernized HTML will appear here.</p>
              )}
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
