"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

export default function SingleDay() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const frame = { current: 0 };

  useLayoutEffect(() => {
    if (!canvasRef.current || !sectionRef.current || !scaleRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];

    canvas.width = 1920;
    canvas.height = 1080;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/videos/frames/frame_${String(i + 1).padStart(4, "0")}.png`;
      images.push(img);
    }

    const render = (index: number) => {
      const img = images[index];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    images[0].onload = () => render(0);

    gsap.from(scaleRef.current, {
      scale: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top top",
        scrub: 1.2,
      },
    });

    const ctxGSAP = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=0.5",
        end: "+=300%",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * (TOTAL_FRAMES - 1))
          );

          render(frameIndex);

          const isDay = frameIndex >= 30 && frameIndex <= 100;
          gsap.to(".day-text", {
            opacity: isDay ? 1 : 0,
            y: isDay ? 0 : -20,
            duration: 0.25,
            overwrite: "auto",
          });

          const isNight = frameIndex >= 135;
          gsap.to(".night-text", {
            opacity: isNight ? 1 : 0,
            y: isNight ? 0 : 20,
            duration: 0.25,
            overwrite: "auto",
          });

          gsap.to(scaleRef.current!, {
            scale: self.progress > 0.85 ? 0.9 : 1,
            duration: 0.4,
            ease: "power1.out",
            overwrite: "auto",
          });
        },
      });
    });

    return () => {
      ctxGSAP.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#f2f0ec] bg-blac"
    >
      <div ref={scaleRef} className="relative w-full h-full">
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
