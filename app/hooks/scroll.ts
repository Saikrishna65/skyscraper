"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function AutoScrollRecorder() {
  useEffect(() => {
    // Get the total scrollable height
    const scrollHeight = document.body.scrollHeight - window.innerHeight;

    // Scroll the page smoothly from top to bottom
    gsap.to(window, {
      scrollTo: { y: scrollHeight },
      duration: 35, // total time in seconds
      ease: "linear", // uniform speed
      onComplete: () => {
        console.log("Scroll complete!");
      },
    });

    // Optional: Scroll back to top after 2 seconds for repeat
    // gsap.to(window, {
    //   scrollTo: { y: 0 },
    //   delay: 22,
    //   duration: 5,
    //   ease: "linear",
    // });
  }, []);

  return null; // No UI needed
}
