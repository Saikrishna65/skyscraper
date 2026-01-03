"use client";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#f2f0ec] py-16 sm:py-20 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center justify-between min-h-[60vh]">
        <div className="w-full">
          <p className="text-center text-base sm:text-lg md:text-3xl font-[outfit] text-[#1E1E1E] max-w-3xl mx-auto">
            A study in structure, light, and urban presence.
          </p>

          <div className="mt-8 sm:mt-10 md:mt-16 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-10 gap-x-6 text-center">
            <FooterItem label="Location" value="Metropolitan Core · Asia" />
            <FooterItem label="Typology" value="Mixed-Use Skyscraper" />
            <FooterItem label="Status" value="Concept" />
            <FooterItem label="Program" value="Office · Residential · Public" />
          </div>
        </div>

        <div className="mt-8 md:mt-20 flex flex-col items-center gap-6">
          <div className="text-center text-[10px] sm:text-xs md:text-sm text-[#5A5A5A] font-[space]">
            Designed & developed by Sai Krishna · 2025
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-black text-lg text-[#1E1E1E] hover:bg-black hover:text-white transition cursor-pointer"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#595959] font-[space]">
        {label}
      </p>
      <p className="mt-1 sm:mt-2 text-sm sm:text-base font-[outfit] text-[#1E1E1E]">
        {value}
      </p>
    </div>
  );
}
