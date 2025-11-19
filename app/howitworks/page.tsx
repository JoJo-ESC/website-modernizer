"use client";

import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-black text-white overflow-hidden">
      {/* 🔹 Hexagon Background Overlay */}
      <div className="absolute inset-0 bg-[url('/hexglow.svg')] bg-repeat opacity-100"></div>

      {/* 🔹 NAVBAR */}
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
            href="/about"
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            About Us
          </Link>


        </div>

        <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200">
          Sign Up
        </button>
      </nav>

      {/* 🔹 CONTENT SECTION */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-12 py-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">How It Works</h1>

          <div className="space-y-8 text-lg text-gray-300">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-4">1. Enter Your URL</h2>
              <p>
                Simply paste the URL of the website you want to modernize. Our system will fetch and analyze your existing webpage.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-white mb-4">2. AI-Powered Analysis</h2>
              <p>
                Our advanced AI examines your website's structure, content, and design. We clean up outdated code, remove unnecessary scripts, and prepare it for transformation.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-white mb-4">3. Modern Redesign</h2>
              <p>
                Using cutting-edge Tailwind CSS, we rebuild your website with a clean, modern aesthetic. The result is a responsive, professional design that works beautifully on all devices.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-white mb-4">4. Preview & Compare</h2>
              <p>
                See your original website side-by-side with the modernized version. Review the changes and see the transformation in real-time.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-block bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Try It Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
