/** Reference-inspired entrance and scroll effects. Durations are seconds. */
export const heroMotion = {
  entrance: { y: 30, duration: 1, stagger: .16, ease: 'power3.out' },
  sun: { scale: .7, rotation: -360, duration: 3.2, delay: .35 },
  app: { y: -80, scale: 1.1, duration: 1.5, delay: .7 },
  // RedSun's 0–50% keyframes; smoothing retains 93% of the gap per 60Hz frame.
  scroll: { start: 0, scrub: true, smoothing: .93, distanceRatio: .5, copyY: 408, orbitY: 200, orbitRotation: 90, appStartY: 40, appY: -17, appScaleStart: .4, appScale: 1.05 },
} as const;
