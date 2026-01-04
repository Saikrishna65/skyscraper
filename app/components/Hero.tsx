"use client";

import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { initParallax } from "../hooks/useParallax";
import FloatingMotion from "./FloatingMotion";
import ImageWithLoader from "./ImageWithLoader";

const Hero = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isMobile) {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.touchAction = "pan-y";
    }
  }, [mounted, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const cleanup = initParallax(
      [
        { target: "[data-parallax='sky']", speed: 0.01 },
        { target: "[data-parallax='cloud']", speed: 0.2 },
        { target: "[data-parallax='heading']", speed: -0.1 },
        { target: "[data-parallax='tag']", speed: 0.1 },
        { target: "[data-parallax='birds']", speed: 0.2 },
        { target: "[data-parallax='building']", speed: 0.25 },
      ],
      768,
      0.06
    );

    return cleanup;
  }, [isMobile]);

  useLayoutEffect(() => {
    if (!mounted) return;
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 0.1,
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
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
    });

    return () => ctx.revert();
  }, [mounted]);

  return (
    <>
      <div className="relative min-h-[100svh] sm:h-[140vh] w-full flex justify-center">
        <ImageWithLoader
          data-parallax="sky"
          src="/images/sky.webp"
          alt="sky"
          fill
          priority
          className="absolute inset-0 object-cover z-0"
        />

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-white opacity-0 pointer-events-none"
        />

        <ImageWithLoader
          src="/images/down.webp"
          alt="ground"
          width={600}
          height={400}
          className="absolute -bottom-[10svh] w-full h-[30%] sm:h-[40%] z-30 object-cover"
          priority
        />

        {/* ✅ CLOUD */}
        <div
          data-parallax="cloud"
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {!isMobile ? (
            <FloatingMotion duration={35} distance={80}>
              <div className="absolute top-10 left-4 sm:left-20 w-[clamp(120px,25vw,300px)] aspect-3/4">
                <ImageWithLoader
                  src="/images/cloud_img.webp"
                  alt="cloud"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </FloatingMotion>
          ) : (
            <div className="absolute top-10 left-4 sm:left-20 w-[clamp(120px,25vw,300px)] aspect-3/4">
              <ImageWithLoader
                src="/images/cloud.webp"
                alt="cloud"
                fill
                priority
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* ✅ BIRDS */}
        <div
          data-parallax="birds"
          className="absolute z-10 opacity-50 top-16 right-4 sm:right-30 w-[clamp(50px,20vw,150px)] aspect-3/5"
        >
          <ImageWithLoader
            src="/images/birds.webp"
            alt="birds"
            fill
            priority
            className="object-contain blur-[1px]"
          />
        </div>

        {/* ✅ HEADING */}
        <div data-parallax="heading" className="absolute sm:-top-5 z-15">
          <div className="text-[clamp(1rem,20vw,12rem)] font-[outfit] font-bold text-[#F5F7FA]">
            VERTICA
          </div>
        </div>

        <div
          data-parallax="tag"
          className="absolute top-[40%] right-10 lg:right-30 hidden md:block z-30"
        >
          <p className="text-[clamp(1rem,1.5vw,22rem)] font-[outfit] text-[#F5F7FA]">
            A speculative tower redefining vertical limits
          </p>
        </div>

        {/* ✅ BUILDING */}
        <div className="absolute bottom-0 sm:bottom-20 z-20 w-full max-w-200 mx-auto h-[95svh] sm:h-[120vh] pointer-events-none overflow-hidden">
          <ImageWithLoader
            data-parallax="building"
            src="/images/building.webp"
            alt="Building"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section text-[#1E1E1E] px-6 sm:px-12 lg:px-24 py-4 w-full bg-linear-to-b from-[#A8CAED] to-[#ECEEF1]">
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
    </>
  );
};

export default Hero;
