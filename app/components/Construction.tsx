"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageWithLoader from "./ImageWithLoader";

gsap.registerPlugin(ScrollTrigger);

type FeatureRefs = {
  container: HTMLDivElement | null;
  image: HTMLDivElement | null;
  imageMove: HTMLDivElement | null;
  hoverData: HTMLDivElement | null;
  number: HTMLSpanElement | null;
  title: HTMLHeadingElement | null;
  text: HTMLParagraphElement | null;
};

const Construction = () => {
  const featuresRef = useRef<FeatureRefs[]>([]);

  // Intro refs
  const introRef = useRef<HTMLDivElement | null>(null);
  const introTitleRef = useRef<HTMLHeadingElement | null>(null);
  const introTextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      if (introRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 80%",
              once: true,
            },
          })
          .from(introTitleRef.current, {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          })
          .from(
            introTextRef.current,
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.55"
          );
      }

      featuresRef.current.forEach((refs, index) => {
        if (!refs.container) return;

        const tl = gsap.timeline({
          delay: Math.min(index * 0.18, 0.4),
          scrollTrigger: {
            trigger: refs.container,
            start: "top 75%",
            once: true,
          },
        });

        tl.fromTo(
          refs.image,
          {
            y: 80,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "cubic-bezier(0.22, 1, 0.36, 1)",
          }
        )

          .from(
            refs.number,
            {
              opacity: 0,
              y: 12,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.2"
          )

          .from(
            refs.title,
            {
              opacity: 0,
              y: 24,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.45"
          )

          .from(
            refs.text,
            {
              opacity: 0,
              y: 16,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.5"
          );

        if (!isMobile && refs.imageMove) {
          gsap.to(refs.imageMove, {
            y: 80,
            scrollTrigger: {
              trigger: refs.container,
              start: "top 50%",
              end: "bottom 20%",
              scrub: 1,
            },
          });
        } else if (isMobile && refs.imageMove) {
          gsap.set(refs.imageMove, { y: 0 });
        }

        if (refs.image && refs.hoverData && !isMobile) {
          const moveX = gsap.quickTo(refs.hoverData, "x", {
            duration: 0.2,
            ease: "power3.out",
          });

          const moveY = gsap.quickTo(refs.hoverData, "y", {
            duration: 0.2,
            ease: "power3.out",
          });

          const onMove = (e: MouseEvent) => {
            const bounds = refs.image!.getBoundingClientRect();
            moveX(e.clientX - bounds.left);
            moveY(e.clientY - bounds.top);
          };

          const onEnter = () => {
            gsap.set(refs.hoverData, { opacity: 1 });
          };

          const onLeave = () => {
            gsap.set(refs.hoverData, { opacity: 0 });
          };

          refs.image.addEventListener("mousemove", onMove);
          refs.image.addEventListener("mouseenter", onEnter);
          refs.image.addEventListener("mouseleave", onLeave);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const setFeatureRef = (index: number, key: keyof FeatureRefs) => {
    return (el: any) => {
      if (!featuresRef.current[index]) {
        featuresRef.current[index] = {
          container: null,
          image: null,
          imageMove: null,
          hoverData: null,
          number: null,
          title: null,
          text: null,
        };
      }
      featuresRef.current[index][key] = el;
    };
  };

  return (
    <section className="relative w-full px-6 sm:px-12 lg:px-24 py-10 bg-[linear-gradient(to_bottom,#ECEEF1_0%,#F4F1EC_65%,#f2f0ec_100%)]">
      {/* Section intro */}
      <div ref={introRef} className="mb-20 max-w-3xl">
        <h2
          ref={introTitleRef}
          className="text-[clamp(0.5rem,7vw,2.8rem)] font-[mons] font-semibold text-[#1E1E1E]"
        >
          The Making of the Tower
        </h2>
        <p
          ref={introTextRef}
          className="mt-[clamp(0.5rem,4vw,1rem)] text-[#5A5A5A] max-w-xl text-[clamp(0.5rem,4vw,1.1rem)] font-[outfit]"
        >
          Every layer of the tower is engineered with purpose, clarity, and
          architectural intent.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Feature 01 */}
        <div
          ref={setFeatureRef(0, "container")}
          className="flex flex-col gap-6"
        >
          <div
            ref={setFeatureRef(0, "image")}
            className="relative w-full aspect-[3/4] overflow-hidden"
          >
            <div
              ref={setFeatureRef(0, "imageMove")}
              className="absolute inset-0 -top-10"
            >
              <Image
                src="/images/print.webp"
                alt="Vertical Zones"
                fill
                className="object-cover"
              />
            </div>
            <div
              ref={setFeatureRef(0, "hoverData")}
              className="pointer-events-none fixed left-0 top-0 opacity-0 z-50 flex items-center gap-3"
            >
              <span className="h-10 w-px" />

              <span className="px-2 py-[2px] backdrop-blur-md bg-black/30 rounded-sm">
                <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-white font-[outfit]">
                  20 · 04 · 2015
                </span>
              </span>
            </div>
          </div>
          <div>
            <span
              ref={setFeatureRef(0, "number")}
              className="text-sm tracking-widest text-[#7A7A7A] font-[outfit]"
            >
              01
            </span>
            <h3
              ref={setFeatureRef(0, "title")}
              className="mt-2 text-xl font-semibold text-[#1E1E1E] font-[mons]"
            >
              Blueprint
            </h3>
            <p
              ref={setFeatureRef(0, "text")}
              className="mt-2 text-[#5A5A5A] text-sm leading-relaxed font-[outfit]"
            >
              Defining structure, circulation, and vertical flow. Every zone is
              planned for efficiency, safety, and experience.
            </p>
          </div>
        </div>

        {/* Feature 02 */}
        <div
          ref={setFeatureRef(1, "container")}
          className="flex flex-col gap-6"
        >
          <div
            ref={setFeatureRef(1, "image")}
            className="relative w-full aspect-[3/4] overflow-hidden"
          >
            <div
              ref={setFeatureRef(1, "imageMove")}
              className="absolute inset-0 -top-10"
            >
              <Image
                src="/images/construction.webp"
                alt="Construction"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div
              ref={setFeatureRef(1, "hoverData")}
              className="pointer-events-none fixed left-0 top-0 opacity-0 z-50 flex items-center gap-3"
            >
              <span className="h-10 w-px" />

              <span className="px-2 py-[2px] backdrop-blur-md bg-black/30 rounded-sm">
                <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-white font-[outfit]">
                  12 · 07 · 2019
                </span>
              </span>
            </div>
          </div>
          <div>
            <span
              ref={setFeatureRef(1, "number")}
              className="text-sm tracking-widest text-[#7A7A7A] font-[outfit]"
            >
              02
            </span>
            <h3
              ref={setFeatureRef(1, "title")}
              className="mt-2 text-xl font-semibold text-[#1E1E1E] font-[mons]"
            >
              Construction
            </h3>
            <p
              ref={setFeatureRef(1, "text")}
              className="mt-2 text-[#5A5A5A] text-sm leading-relaxed font-[outfit]"
            >
              A high-performance structural system engineered to sustain extreme
              verticality with absolute precision.
            </p>
          </div>
        </div>

        {/* Feature 03 */}
        <div
          ref={setFeatureRef(2, "container")}
          className="flex flex-col gap-6"
        >
          <div
            ref={setFeatureRef(2, "image")}
            className="relative w-full aspect-[3/4] overflow-hidden"
          >
            <div
              ref={setFeatureRef(2, "imageMove")}
              className="absolute inset-0 -top-10"
            >
              <Image
                src="/images/completed.webp"
                alt="Integrated Systems"
                fill
                className="object-cover"
              />
            </div>
            <div
              ref={setFeatureRef(2, "hoverData")}
              className="pointer-events-none fixed left-0 top-0 opacity-0 z-50 flex items-center gap-3"
            >
              <span className="h-10 w-px" />

              <span className="px-2 py-[2px] backdrop-blur-md bg-black/30 rounded-sm">
                <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-white font-[outfit]">
                  16 · 11 · 2025
                </span>
              </span>
            </div>
          </div>
          <div>
            <span
              ref={setFeatureRef(2, "number")}
              className="text-sm tracking-widest text-[#7A7A7A] font-[outfit]"
            >
              03
            </span>
            <h3
              ref={setFeatureRef(2, "title")}
              className="mt-2 text-xl font-semibold text-[#1E1E1E] font-[mons]"
            >
              Final Form
            </h3>
            <p
              ref={setFeatureRef(2, "text")}
              className="mt-2 text-[#5A5A5A] text-sm leading-relaxed font-[outfit]"
            >
              The building reaches its full expression—where engineering
              precision meets architectural identity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Construction;
