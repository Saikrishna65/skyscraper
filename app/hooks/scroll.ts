"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function AutoScrollRecorder() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    gsap.to(window, {
      scrollTo: { y: scrollHeight },
      duration: 20,
      ease: "linear",
    });
  }, []);

  return null;
}
