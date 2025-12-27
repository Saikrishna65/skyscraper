"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SpeedParallaxItem = {
  target: string;
  speed: number;
};

export const useParallax = (items: SpeedParallaxItem[]) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      items.forEach(({ target, speed }) => {
        gsap.to(target, {
          y: () => ScrollTrigger.maxScroll(window) * speed,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
};
