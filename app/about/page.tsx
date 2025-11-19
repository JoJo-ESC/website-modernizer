"use client";

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen px-12 py-16 font-sans">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold tracking-tight mb-10">
        About Us
      </h1>

      {/* MAIN CONTENT */}
      <section className="max-w-3xl space-y-6 text-gray-300 leading-relaxed">

        <p className="text-lg">
          <span className="text-white font-semibold">Revamp.ai</span> was created with one goal:  
          to transform outdated, cluttered, or broken HTML into clean, modern,
          responsive designs automatically.
        </p>

        <p>
          Whether a website was built in the 90s, early 2000s, or just never updated,
          Revamp.ai uses a custom smart transformation engine to analyze your
          markup and rebuild it using modern structure, spacing, typography, and layout patterns.
        </p>

        <p>
          This project was built as part of a real-world showcase demonstrating
          modern frontend engineering, UI design, and AI-powered developer tooling.
          Every line of code you see — including the live previews — is designed
          to replicate the workflow of true production-grade applications.
        </p>

        <p>
          Below is more about what we focus on:
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>Clean, readable modern HTML5</li>
          <li>Responsive layouts for mobile + desktop</li>
          <li>Better spacing, paddings, and hierarchy</li>
          <li>Improved typography and accessibility</li>
          <li>Optional Tailwind CSS injection</li>
        </ul>

        <p>
          Revamp.ai is continuously evolving — the mission is to make front-end
          modernization as fast and accessible as possible for everyone.
        </p>

      </section>
    </main>
  );
}
