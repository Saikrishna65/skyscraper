import gsap from "gsap";
import React, { useLayoutEffect } from "react";

const Scale = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 40%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <div className="stats-section text-[#1E1E1E] px-6 sm:px-12 lg:px-24 py-4 w-full bg-[#ECEEF1]">
      <div className="max-w-7xl mx-auto">
        <div className="mt-[15vh] pb-20 sm:mt-40 grid grid-cols-1 md:grid-cols-2 gap-[10vh] sm:gap-20 items-start">
          {/* LEFT */}
          {/* <div>
              <h2 className="text-[clamp(0.5rem,7vw,2.8rem)] font-semibold mb-6 font-[mons]">
                Scale & Presence
              </h2>
              <p className="text-[#5A5A5A] text-lg leading-relaxed max-w-md font-[outfit]">
                VERTICA is an exploration of extreme verticality, where a single
                structure becomes an entire city.
              </p>
            </div> */}
          <div>
            <h2 className="text-[clamp(0.5rem,7vw,2.8rem)] font-[mons] font-semibold text-[#1E1E1E]">
              Scale & Presence
            </h2>
            <p className="mt-[clamp(0.5rem,4vw,1rem)] text-[#5A5A5A] max-w-xl text-[clamp(0.5rem,4vw,1.1rem)] font-[outfit]">
              VERTICA is an exploration of extreme verticality, where a single
              structure becomes an entire city.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-x-8 sm:gap-x-16 gap-y-14 font-[space]">
            {[
              ["1,024m", "Height"],
              ["210", "Floors"],
              ["Retail", "Program"],
              ["30,000+", "Occupants"],
            ].map(([value, label]) => (
              <div key={label} className="stat-item">
                <div className="text-[clamp(1.5rem,5vw,3.5rem)] font-semibold">
                  {value}
                </div>
                <div className="text-sm uppercase tracking-wide text-[#5A5A5A]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scale;
