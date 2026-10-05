/** Shared entrance settings. Distances are pixels; durations are seconds. */
export const landingMotion = {
  heading: { x: 0, yPercent: 105, rotation: 2, duration: 1.05, stagger: 0.48 },
  text: { yPercent: 105, duration: 0.85, stagger: 0.13 },
  reveal: { y: 28, scale: 1.025, duration: 1, lineDuration: 1.4 },
  ease: "power3.out",
  viewportThreshold: 0.12,
  viewportMargin: "0px 0px -8% 0px",
} as const;

/** AWSMD-style glide: duration-based exponential easing; keep all tuning here. */
export const smoothScroll = {
  duration: 2,
  wheelMultiplier: 1.3,
  anchorOffset: 0,
  easing: (progress: number) => Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
} as const;
