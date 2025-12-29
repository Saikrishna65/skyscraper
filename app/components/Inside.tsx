"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Inside() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const panel1Ref = useRef<HTMLDivElement | null>(null);
  const panel2Ref = useRef<HTMLDivElement | null>(null);
  const panel3Ref = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);

  const setImgRef = (el: HTMLDivElement | null, index: number) => {
    if (el) imgRefs.current[index] = el;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) return;

      const panels = [panel1Ref.current, panel2Ref.current, panel3Ref.current];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () =>
            "+=" + (panel1Ref.current?.offsetWidth || window.innerWidth) * 2,

          scrub: 1.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(panels, { xPercent: -200, ease: "none" }, 0);

      imgRefs.current.forEach((img, i) => {
        tl.to(img, { x: -100, ease: "none" }, "<");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden bg-[#f2f0ec]"
    >
      <div
        className="
          flex flex-col
          lg:flex-row
          lg:w-[300vw]
          min-h-screen
        "
      >
        {/* PANEL 1 */}
        <div
          ref={panel1Ref}
          className="
            w-full lg:w-screen
            lg:h-screen
            flex flex-col lg:flex-row
            items-center
            gap-10 lg:gap-20
            py-10 px-6 sm:px-12 lg:px-24
          "
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-widest text-gray-600 mb-3 font-[space]">
              PUBLIC REALM
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold mb-6 font-[mons] text-[#1E1E1E]">
              Ground Atrium
            </h2>
            <p className="text-[#5A5A5A] leading-relaxed font-[outfit]">
              The base of the tower unfolds as a civic interior a continuous
              public landscape shaped by structure and light.
              <br />
              The ground floor becomes a place of arrival and orientation.
              <br />
              Not a lobby, but the foundation of a vertical city.
            </p>
          </div>

          <div
            className="
              relative w-full
              h-64 sm:h-80 lg:h-[30rem]
              overflow-hidden
            "
          >
            <div
              ref={(el) => setImgRef(el, 0)}
              className="absolute inset-0 lg:-right-10"
            >
              <Image
                src="/images/ground_floor2.png"
                alt="Ground floor"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* PANEL 2 */}
        <div
          ref={panel2Ref}
          className="
            w-full lg:w-screen
            lg:h-screen
            flex flex-col lg:flex-row
            items-center
            gap-10 lg:gap-20
            py-10 px-6 sm:px-12 lg:px-24
          "
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-widest text-gray-600 mb-3 font-[space]">
              VERTICAL LANDSCAPE
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold mb-6 text-[#1E1E1E] font-[mons]">
              Terraced Ascent
            </h2>
            <p className="text-[#5A5A5A]  leading-relaxed font-[outfit]">
              Gardens, paths, and terraces replace corridors and elevators,
              allowing movement to unfold across levels rather than between
              them. <br />
              Architecture and landscape operate as one continuous system —
              guiding people upward through space, light, and vegetation.
            </p>
          </div>

          <div
            className="
              relative w-full
              h-64 sm:h-80 lg:h-[30rem]
              overflow-hidden
            "
          >
            <div
              ref={(el) => setImgRef(el, 1)}
              className="absolute inset-0 lg:-right-10"
            >
              <Image
                src="/images/garden.png"
                alt="Ground floor"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* PANEL 3 */}
        <div
          ref={panel3Ref}
          className="
            w-full lg:w-screen
            lg:h-screen
            flex flex-col lg:flex-row
            items-center
            gap-10 lg:gap-20
            py-10 px-6 sm:px-12 lg:px-24
          "
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-widest text-gray-600 mb-3 font-[space]">
              UPPER REALM
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold mb-6 text-[#1E1E1E] font-[mons]">
              Sky Commons
            </h2>
            <p className="text-[#5A5A5A]  leading-relaxed font-[outfit]">
              At higher levels, the tower opens into shared interior landscapes
              shaped by light, air, and view.
              <br />
              Work, rest, and informal gathering take place within garden-like
              spaces that blur the boundary between inside and outside.
            </p>
          </div>

          <div
            className="
              relative w-full
              h-64 sm:h-80 lg:h-[30rem]
              overflow-hidden
            "
          >
            <div className="absolute inset-0 lg:-right-10">
              <Image
                src="/images/top_floor.png"
                alt="Ground floor"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
