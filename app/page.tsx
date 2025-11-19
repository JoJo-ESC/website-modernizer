"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [url, setUrl] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!url.trim()) return;
    // Redirect to results page later
    console.log("Submitted URL:", url);
  }

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">

      {/* 🔹 Hexagon Background Overlay */}
      <div className="absolute inset-0 opacity-[0.10] pointer-events-none bg-[url('/hex.svg')] bg-cover"></div>

      {/* 🔹 NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-12 py-8">
        <div className="text-3xl font-bold tracking-tight">revamp.ai</div>

        <div className="hidden md:flex gap-12 text-lg">
          <Link href="#" className="hover:text-gray-400 transition">How It Works</Link>
          <Link href="#" className="hover:text-gray-400 transition">About Us</Link>
        </div>

        <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200">
          Sign Up
        </button>
      </nav>

      {/* 🔹 HERO SECTION */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 px-12 mt-24">

        {/* LEFT COLUMN */}
        <div className="pr-10">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight max-w-xl">
            Revamp your <br /> website. Bring <br /> it into the future.
          </h1>

          <p className="text-gray-300 text-xl mt-6">
            Clean design, modern UI, zero effort.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex justify-center md:justify-start">
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 w-full max-w-md shadow-xl">
            <h2 className="text-3xl font-semibold leading-snug mb-6">
              Don’t believe us? <br /> Try it.
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="url"
                placeholder="Enter a URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-black border border-white/20 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/40"
              />

              <button
                type="submit"
                className="bg-white text-black py-3 rounded-md font-medium hover:bg-gray-200 transition"
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
