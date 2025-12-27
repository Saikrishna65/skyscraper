"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface CloudFloatProps {
  children: React.ReactNode;
  x?: number;
  y?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function CloudFloat({
  children,
  x = 20,
  y = 14,
  duration = 14,
  delay = 0,
  className = "",
}: CloudFloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        x,
        y,
        duration,
        delay,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, ref);

    return () => ctx.revert();
  }, [x, y, duration, delay]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
