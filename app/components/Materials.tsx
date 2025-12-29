"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Materials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<HTMLDivElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  // reset arrays on each render to avoid duplicates
  floatingRefs.current = [];
  textRefs.current = [];

  useLayoutEffect(() => {
    if (!sectionRef.current || !mainImageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.from(headingRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
      });

      /*Main Image */
      tl.from(mainImageRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      /*Floating Images */
      if (floatingRefs.current.length) {
        tl.from(
          floatingRefs.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.96,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.8"
        );
      }

      /*Text */
      if (textRefs.current.length) {
        tl.from(
          textRefs.current,
          {
            opacity: 0,
            y: 20,
            stagger: 0.3,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full min-h-screen bg-[#f2f0ec] mt-20">
      {/* HEADING */}
      <div className="h-[10%] w-full lg:-mb-10 flex items-center justify-center">
        <h2
          ref={headingRef}
          className="text-[clamp(0.5rem,7vw,2.8rem)] text-center opacity-90 font-[mons] font-bold text-[#1E1E1E]"
        >
          The Anatomy of the Tower
        </h2>
      </div>

      <div className="w-full h-[90%] flex flex-col lg:flex-row">
        {/* LEFT TEXT */}
        <div className="w-full lg:w-[25%] flex items-center justify-center px-6 sm:px-18 md:px-30 lg:px-0 py-10 lg:py-0">
          <div className="relative w-full h-[70%]">
            <div
              ref={(el) => {
                if (el) textRefs.current.push(el);
              }}
              className="font-[outfit] text-[#5A5A5A] px-1 lg:px-5 xl:pl-10 lg:absolute lg:top-5 lg:h-[30%] lg:flex lg:items-center lg:justify-center lg:w-[90%]"
            >
              High-strength reinforced concrete core for structural stability
              and seismic resistance.
            </div>

            <div
              ref={(el) => {
                if (el) textRefs.current.push(el);
              }}
              className="font-[outfit] text-[#5A5A5A] px-1 lg:px-5 lg:absolute lg:bottom-10 lg:left-8 lg:h-[30%] lg:flex lg:items-center lg:justify-center lg:w-[90%]"
            >
              High-performance laminated low-E glass for safety, insulation, and
              solar control.
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center px-4 lg:px-0">
          {/* MAIN IMAGE */}
          <div
            ref={mainImageRef}
            className="w-full sm:w-[80%] lg:w-[70%] aspect-[3/4] lg:h-[70%] relative"
          >
            <Image
              src="/images/building_full1.png"
              alt="Building"
              fill
              className="object-cover rounded-2xl"
              priority
            />

            {/* FLOATING IMAGES – DESKTOP */}
            {["glass", "concrete", "air_flow5", "iron"].map((img, i) => (
              <div
                key={img}
                ref={(el) => {
                  if (el) floatingRefs.current[i] = el;
                }}
                className={`hidden lg:block w-[40%] h-[30%] absolute
                  ${i === 0 && "bottom-10 -left-24"}
                  ${i === 1 && "top-5 -left-32"}
                  ${i === 2 && "top-10 -right-24"}
                  ${i === 3 && "bottom-5 -right-32"}
                `}
              >
                <Image
                  src={`/images/${img}.png`}
                  alt={img}
                  fill
                  className="object-cover rounded-2xl opacity-95"
                />
              </div>
            ))}
          </div>

          {/* MOBILE FLOATING IMAGES */}
          <div className="mt-6 grid grid-cols-2 gap-4 w-full sm:w-[80%] lg:hidden">
            {["glass", "concrete", "air_flow5", "iron"].map((img) => (
              <div key={img} className="relative aspect-video">
                <Image
                  src={`/images/${img}.png`}
                  alt={img}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="w-full lg:w-[25%] flex items-center justify-center px-6 sm:px-18 md:px-30 lg:px-0 py-10 lg:py-0">
          <div className="relative w-full h-[70%]">
            <div
              ref={(el) => {
                if (el) textRefs.current.push(el);
              }}
              className="font-[outfit] text-[#5A5A5A] px-1 lg:px-7 lg:absolute lg:top-10 lg:h-[30%] lg:flex lg:items-center lg:justify-center lg:w-[90%]"
            >
              Optimized airflow design for natural ventilation and reduced wind
              pressure.
            </div>

            <div
              ref={(el) => {
                if (el) textRefs.current.push(el);
              }}
              className="font-[outfit] text-[#5A5A5A] px-1 lg:px-7 lg:absolute lg:bottom-5 lg:left-8 lg:h-[30%] lg:flex lg:items-center lg:justify-center lg:w-[90%]"
            >
              High-strength structural steel engineered for extreme load and
              wind resistance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
