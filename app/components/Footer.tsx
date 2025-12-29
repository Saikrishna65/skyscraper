"use client";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#f2f0ec] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Closing line */}
        <p className="text-lg md:text-xl font-[outfit] text-[#1E1E1E]">
          A study in structure, light, and time.
        </p>

        {/* Meta */}
        <p className="mt-6 text-xs md:text-sm text-[#5A5A5A] font-[space]">
          Conceptual Skyscraper · 2025
        </p>

        {/* Signature */}
        <p className="mt-2 text-xs md:text-sm text-[#5A5A5A] font-[space]">
          Designed & developed by Sai Krishna
        </p>

        {/* Divider */}
        <div className="mx-auto mt-12 h-px w-24 bg-black/20" />

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mx-auto mt-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-sm text-[#1E1E1E] hover:bg-black hover:text-white transition"
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}
