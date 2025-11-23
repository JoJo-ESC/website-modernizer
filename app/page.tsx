"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!url.trim()) return;
    router.push(`/results?url=${encodeURIComponent(url)}`);
  }

  return (
    <main className="flex flex-col min-h-screen w-full bg-black text-white overflow-hidden">

      {/* 🔹 Hexagon Background Overlay */}
     {/* <div className="absolute inset-0 bg-[url('/hexglow.svg')] bg-repeat opacity-100 pointer-events-none"></div> */}
      <div className="geo-layer">
        <div className="geo-shape geo-1" />
        <div className="geo-shape geo-2" />
        <div className="geo-shape geo-3" />
      </div>




      {/* 🔹 NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-12 py-8">
        <div className="text-3xl font-bold tracking-tight">revamp.ai</div>
        <div className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"></div>


        <div className="hidden md:flex gap-12 text-lg items-center">
          <Link
            href="/howitworks"
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-white/10 hover:text-gray-100 transition-all duration-200"
          >
            How It Works
          </Link>

          <Link
            href="/howtouse"
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-white/10 hover:text-gray-100 transition-all duration-200"
          >
            How to Use
          </Link>

          <Link
            href="/about"
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-white/10 hover:text-gray-100 transition-all duration-200"
          >
            About Us
          </Link>
        </div>
      </nav>

      {/* 🔹 HERO SECTION */}
     <section className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-12 md:px-24 min-h-[80vh]">

        {/* LEFT COLUMN */}
        <div>
         <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-[0_0_100px_rgba(255,255,255,0.7)]">
            Revamp your <br /> website. Bring <br /> it into the future.
          </h1>


          <p className="text-gray-400 text-lg">
            Clean design, modern UI, zero effort.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-zinc-700 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Don't believe us? <br /> Try it.
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="url"
                placeholder="Enter a URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />

              <button
                type="submit"
                className="bg-white !text-black py-3 rounded-md font-medium hover:bg-gray-200 transition"
              >
                Modernize
              </button>
            </form>
          </div>
        </div>

      </section>
    </main>
  );
}
