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

      gsap.from(".text", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".text-section",
          start: "top 50%",
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
          className="absolute inset-0 hidden sm:block z-20 pointer-events-none"
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
          <p className="text-[clamp(1rem,1.5vw,22rem)] font-[outfit] text-[#F5F7FA] opacity-80">
            A speculative tower redefining vertical limits.
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
      <div className="text-section flex flex-col items-center gap-1 sm:gap-5 justify-center text-[#1E1E1E] pt-[15vh] sm:pt-[25vh] px-6 sm:px-12 lg:px-24 py-4 w-full bg-linear-to-b from-[#A8CAED] to-[#ECEEF1]">
        <h2 className="text text-[clamp(0.5rem,7vw,3rem)] text-[#1F2933] opacity- font-[mons] font-semibold">
          The Vision
        </h2>
        <div
          className="text text-[clamp(0.2rem,4vw,2.2rem)] text-[#4B5563
] text-center opacity-95 max-w-4xl font-[space] font-bold"
        >
          Every decision begins with the question of how people experience space
          at <span className="text-[#2a77ca]">height</span> from the ground to
          the sky.
        </div>
      </div>
    </>
  );
};

export default Hero;
