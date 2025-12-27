"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FloatingMotionProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  direction?: "left" | "right";
}

export default function FloatingMotion({
  children,
  duration = 30,
  distance = 160,
  direction = "right",
}: FloatingMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const x = direction === "right" ? distance : -distance;

    gsap.to(ref.current, {
      x,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "none",
      force3D: true,
    });
  }, [duration, distance, direction]);

  return (
    <div ref={ref} className="pointer-events-none">
      {children}
    </div>
  );
}
