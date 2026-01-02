"use client";

import { useEffect, useRef, useState } from "react";
import { usePreload } from "./PreloadProvider";
import gsap from "gsap";

const Loader = () => {
  const { loaded, total } = usePreload();
  const loaderRef = useRef<HTMLDivElement>(null);

  const [done, setDone] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const progress = Math.round((loaded / total) * 100);

  // Track font loading
  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  // Exit animation
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Wait for BOTH images + fonts
    if (loaded >= total && fontsLoaded && loaderRef.current) {
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          document.body.style.overflow = "auto";
          setDone(true);
        },
      });

      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
      });
    }
  }, [loaded, total, fontsLoaded]);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-black"
    >
      <div className="text-center space-y-4">
        <p className="text-2xl  font-[outfit] font-bold tracking-widest uppercase">
          Building
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold tabular-nums font-[outfit]">
          {progress}%
        </h1>

        <div className="w-40 h-[2px] bg-black/20 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
