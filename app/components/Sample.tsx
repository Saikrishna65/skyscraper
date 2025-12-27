"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FeatureRefs = {
  container: HTMLDivElement | null;
  image: HTMLDivElement | null;
  number: HTMLSpanElement | null;
  title: HTMLHeadingElement | null;
  text: HTMLParagraphElement | null;
};

const ThirdSection = () => {
  const featuresRef = useRef<FeatureRefs[]>([]);

  // Intro refs
  const introRef = useRef<HTMLDivElement | null>(null);
  const introTitleRef = useRef<HTMLHeadingElement | null>(null);
  const introTextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
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

        if (refs.image) {
          refs.image.addEventListener("mouseenter", () => {
            gsap.to(refs.image, {
              scale: 1.03,
              duration: 0.6,
              ease: "power2.out",
            });
          });

          refs.image.addEventListener("mouseleave", () => {
            gsap.to(refs.image, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          });
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
          number: null,
          title: null,
          text: null,
        };
      }
      featuresRef.current[index][key] = el;
    };
  };

  return (
    <section className="relative w-full px-6 sm:px-12 lg:px-24 py-10 bg-[linear-gradient(to_bottom,#ECEEF1_0%,#F4F1EC_65%,#ECE9E4_100%)]">
      {/* Section intro */}
      <div ref={introRef} className="mb-20 max-w-3xl">
        <h2
          ref={introTitleRef}
          className="text-[clamp(1.8rem,3vw,3rem)] font-[outfit] font-semibold text-[#1E1E1E]"
        >
          Vertical Intelligence
        </h2>
        <p ref={introTextRef} className="mt-4 text-[#5A5A5A] max-w-xl">
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
            <Image
              src="/images/print.png"
              alt="Vertical Zones"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span
              ref={setFeatureRef(0, "number")}
              className="text-sm tracking-widest text-[#7A7A7A]"
            >
              01
            </span>
            <h3
              ref={setFeatureRef(0, "title")}
              className="mt-2 text-xl font-semibold text-[#1E1E1E]"
            >
              Vertical Zones
            </h3>
            <p
              ref={setFeatureRef(0, "text")}
              className="mt-2 text-[#5A5A5A] text-sm leading-relaxed"
            >
              Public realms, workplaces, and private residences composed into a
              single continuous vertical city.
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
            <Image
              src="/images/construction.png"
              alt="Construction"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span
              ref={setFeatureRef(1, "number")}
              className="text-sm tracking-widest text-[#7A7A7A]"
            >
              02
            </span>
            <h3
              ref={setFeatureRef(1, "title")}
              className="mt-2 text-xl font-semibold text-[#1E1E1E]"
            >
              Construction
            </h3>
            <p
              ref={setFeatureRef(1, "text")}
              className="mt-2 text-[#5A5A5A] text-sm leading-relaxed"
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
            <Image
              src="/images/systems_img.png"
              alt="Integrated Systems"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span
              ref={setFeatureRef(2, "number")}
              className="text-sm tracking-widest text-[#7A7A7A]"
            >
              03
            </span>
            <h3
              ref={setFeatureRef(2, "title")}
              className="mt-2 text-xl font-semibold text-[#1E1E1E]"
            >
              Integrated Systems
            </h3>
            <p
              ref={setFeatureRef(2, "text")}
              className="mt-2 text-[#5A5A5A] text-sm leading-relaxed"
            >
              Circulation, climate, and energy systems integrated to operate as
              one cohesive architectural organism.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
