"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;
const PRIORITY_FRAMES = 24; // ⭐ only load these first

export default function SingleDay() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const frame = { current: 0 };

  useLayoutEffect(() => {
    if (!sectionRef.current || !canvasRef.current || !scaleRef.current) return;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---------------- CANVAS SETUP ----------------
    canvas.width = 1920;
    canvas.height = 1080;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // ---------------- IMAGE STORE ----------------
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(
      null
    );

    const loadFrame = (i: number) => {
      if (images[i]) return;

      const img = new Image();
      img.src = `/videos/frames/frame_${String(i + 1).padStart(4, "0")}.png`;
      images[i] = img;
    };

    // ---------------- PRIORITY LOAD ----------------
    for (let i = 0; i < PRIORITY_FRAMES; i++) {
      loadFrame(i);
    }

    // Render first frame ASAP
    images[0]!.onload = () => render(0);

    // ---------------- BACKGROUND LOAD ----------------
    const loadRemainingFrames = () => {
      for (let i = PRIORITY_FRAMES; i < TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    };

    // Idle loading (non-blocking)
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadRemainingFrames);
    } else {
      setTimeout(loadRemainingFrames, 0);
    }

    // ---------------- RENDER FUNCTION ----------------
    const render = (index: number) => {
      const img = images[index];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // ---------------- GSAP CONTEXT ----------------
    const ctxGSAP = gsap.context(() => {
      // -------- ENTRY SCALE --------
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top top",
            scrub: 1.2,
          },
        })
        .fromTo(scaleRef.current, { scale: 0.5 }, { scale: 1 });

      // -------- PIN + FRAME SCRUB --------
      ScrollTrigger.create({
        trigger: section,
        start: "top+=1 top",
        end: "+=300%",
        scrub: 0.8,
        pin: true,
        anticipatePin: 0.8,

        onUpdate: (self) => {
          const progress = self.progress;

          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            (progress * (TOTAL_FRAMES - 1)) | 0
          );

          // render nearest available frame
          for (let i = targetFrame; i >= 0; i--) {
            if (images[i]?.complete) {
              render(i);
              break;
            }
          }

          // ---- TEXT VISIBILITY ----
          gsap.set(".day-text", {
            opacity: progress >= 0.15 && progress <= 0.55 ? 1 : 0,
            y: progress >= 0.15 && progress <= 0.55 ? 0 : -20,
          });

          gsap.set(".night-text", {
            opacity: progress >= 0.7 ? 1 : 0,
            y: progress >= 0.7 ? 0 : 20,
          });

          // ---- EXIT SCALE ----
          const scale =
            progress >= 0.85
              ? gsap.utils.mapRange(0.85, 1, 1, 0.9, progress)
              : 1;

          gsap.set(scaleRef.current!, { scale });
        },
      });
    }, section);

    return () => {
      ctxGSAP.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#f2f0ec] will-change-transform transform-gpu"
    >
      <div
        ref={scaleRef}
        className="relative w-full h-full will-change-transform transform-gpu"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-end text-white">
          <div
            className="relative w-[90vw] sm:w-[70vw] md:w-[45vw] lg:w-[35vw] 
          px-4 sm:px-6 font-[outfit]
          lg:mr-[8vw]"
          >
            <h2 className="day-text absolute opacity-0 text-2xl sm:text-3xl lg:text-4xl font-semibold">
              <p className="tracking-wide">Daylight Expression</p>
              <p className="mt-4 hidden sm:block text-sm opacity-95 lg:leading-relaxed font-[space]">
                As the sun moves across the sky, the tower reveals its
                structure, rhythm, and motion shaping its identity.
              </p>
            </h2>

            <h2 className="night-text absolute opacity-0 text-2xl sm:text-3xl lg:text-4xl font-semibold">
              <p className="tracking-wide">Nighttime Identity</p>
              <p className="mt-4 hidden sm:block text-sm lg:leading-relaxed font-[space]">
                After dark, the building becomes a quiet landmark — illuminated,
                composed, and present within the city skyline.
              </p>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
