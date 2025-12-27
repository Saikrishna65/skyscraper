"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

interface FadeHeadingProps {
  text: string;
  className?: string;
}

export default function FadeHeading({
  text,
  className = "",
}: FadeHeadingProps) {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        opacity: 1,
        duration: 1.3,
        filter: "blur(0px)",
        ease: "sine.out",
        delay: 0.25,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={textRef}
      className={`leading-none opacity-0 blur-[2px] ${className}`}
    >
      {text}
    </h1>
  );
}
