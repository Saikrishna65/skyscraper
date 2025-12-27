"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import FloatingMotion from "./FloatingMotion";
import { useParallax } from "../hooks/useParallax";
import gsap from "gsap";
import FadeHeading from "./FadeHeading";

const Hero = () => {
  useParallax([
    { target: "[data-parallax='sky']", speed: 0.05 },
    { target: "[data-parallax='cloud']", speed: -0.2 },
    { target: "[data-parallax='heading']", speed: 0.1 },
    { target: "[data-parallax='tag']", speed: 0.1 },
    { target: "[data-parallax='birds']", speed: -0.2 },
    { target: "[data-parallax='building']", speed: 0.4 },
  ]);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 0.1,
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

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

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="relative h-[110vh] sm:h-[140vh] w-full flex justify-center">
        <Image
          data-parallax="sky"
          src="/images/sky8.png"
          alt="sky"
          fill
          priority
          className="absolute inset-0 object-cover z-0"
        />

        <div ref={overlayRef} className="absolute inset-0 bg-white opacity-0" />

        <Image
          data-parallax="sky"
          src="/images/down17.png"
          alt="sky"
          width={600}
          height={400}
          className="absolute -bottom-[10vh] sm:-bottom-15 object-cover w-full h-[30%] sm:h-[40%] z-30"
          priority
        />

        <div className="absolute inset-0 z-20 pointer-events-none">
          <FloatingMotion duration={35} distance={100}>
            <div
              className="
              
        absolute
        top-10 sm:top-20
        left-4 sm:left-10 md:left-16
        w-[clamp(120px,25vw,300px)]
        aspect-3/4
      "
            >
              <Image
                data-parallax="cloud"
                src="/images/cloud_1.png"
                alt="cloud"
                fill
                priority
                className="object-contain"
              />
            </div>
          </FloatingMotion>
        </div>

        <div
          className="
    absolute z-10 opacity-50
    top-16 sm:top-24 md:top-30
    right-4 sm:right-16 md:right-32
    w-[clamp(50px,20vw,300px)] sm:w-25 md:w-33 lg:w-38
    aspect-3/5
  "
        >
          <Image
            data-parallax="birds"
            src="/images/birds.png"
            alt="sky"
            fill
            priority
            className="object-contain blur-[1px]"
            sizes="(max-width: 640px) 70px,
           (max-width: 1024px) 130px,
           150px"
          />
        </div>

        <div data-parallax="heading" className="absolute top-5 sm:top-10 z-15">
          <FadeHeading
            text="VERTICA"
            className="text-[clamp(1rem,20vw,12rem)] font-[outfit] font-bold text-[#F5F7FA]"
          />
        </div>

        <div
          data-parallax="tag"
          className="hidden lg:block absolute right-20 text-xl text-[#F5F7FA] font-[outfit] top-[60vh] opacity-90"
        >
          A speculative tower redefining vertical limits.
        </div>

        <div
          className="
    absolute bottom-0 sm:bottom-10 z-20 w-full max-w-200 mx-auto
    h-[95vh] sm:h-[120vh] md:h-[130vh] overflow-hidden
  "
        >
          <Image
            data-parallax="building"
            src="/images/building_2.png"
            alt="Building"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 90vw,
           (max-width: 1024px) 70vw,
           800px"
          />
        </div>
      </div>

      <div className="stats-section w-full bg-linear-to-b from-[#A8CAED] to-[#ECEEF1] text-neutral-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* LEFT */}
            <div>
              <h2
                className="font-[mons] font-semibold mb-5
                       text-3xl sm:text-4xl lg:text-5xl"
              >
                Scale & Presence
              </h2>

              <p
                className="font-[outfit] text-neutral-500 leading-relaxed
                      text-base sm:text-lg max-w-md"
              >
                VERTICA is an exploration of extreme verticality, where a single
                structure becomes an entire city.
              </p>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:gap-x-14 sm:gap-y-14 font-[space]">
              {[
                { value: "1,024m", label: "Height" },
                { value: "210", label: "Floors" },
                { value: "Retail", label: "Program" },
                { value: "30,000+", label: "Occupants" },
              ].map((item, i) => (
                <div key={i}>
                  <div
                    className="font-semibold
                            text-3xl sm:text-4xl lg:text-6xl"
                  >
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-wide text-neutral-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
