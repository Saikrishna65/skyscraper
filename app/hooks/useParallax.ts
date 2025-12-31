// hooks/parallax.ts
export function initParallax(
  config: { target: string; speed: number }[],
  breakpoint = 768,
  ease = 0.08 // 👈 smaller = smoother
) {
  if (typeof window === "undefined") return () => {};

  // 🚫 Disable on mobile / touch
  if (
    window.innerWidth < breakpoint ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  ) {
    return () => {};
  }

  const items = config.flatMap(({ target, speed }) =>
    Array.from(document.querySelectorAll<HTMLElement>(target)).map((el) => ({
      el,
      speed,
      currentY: 0,
      targetY: 0,
    }))
  );

  let scrollY = window.scrollY;
  let rafId: number;

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const animate = () => {
    scrollY = window.scrollY;

    items.forEach((item) => {
      item.targetY = scrollY * item.speed;
      item.currentY = lerp(item.currentY, item.targetY, ease);

      item.el.style.transform = `translate3d(0, ${item.currentY}px, 0)`;
    });

    rafId = requestAnimationFrame(animate);
  };

  rafId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(rafId);
  };
}
