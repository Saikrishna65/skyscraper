import { useEffect, useRef } from "react";

type ParallaxItem = {
  target: string;
  speed: number;
};

export function useParallax(items: ParallaxItem[]) {
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ MOBILE DETECTION INSIDE HOOK
    const isMobile =
      window.matchMedia("(max-width: 767px)").matches ||
      "ontouchstart" in window;

    // ⛔ Disable parallax completely on mobile
    if (isMobile) return;

    const elements = items
      .map(({ target, speed }) => {
        const el = document.querySelector(target) as HTMLElement | null;
        if (!el) return null;

        // GPU hint
        el.style.willChange = "transform";

        return { el, speed };
      })
      .filter(Boolean) as { el: HTMLElement; speed: number }[];

    if (!elements.length) return;

    const update = () => {
      rafRef.current = null;
      const scrollY = lastScrollY.current;

      for (const { el, speed } of elements) {
        el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      }
    };

    const onScroll = () => {
      lastScrollY.current = window.scrollY;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    // Initial sync
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      for (const { el } of elements) {
        el.style.transform = "";
        el.style.willChange = "";
      }
    };
  }, [items]);
}
