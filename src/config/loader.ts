/** Branded page entrance. Timings are seconds, except the failsafe in ms. */
export const pageLoader = {
  enabled: false,
  label: 'Preparing your experience',
  tagline: 'Thoughtfully built. Ready for what’s next.',
  chapter: 'SaaS Development',
  bar: { text: 'L O A D I N G', sliceCount: 40, speed: 1.2, width: 600, height: 140 },
  progressDuration: 1.8,
  checkpointDuration: .55,
  completeHold: .18,
  logoDuration: 1.1,
  maxWaitMs: 6000,
  weights: { document: 25, fonts: 35, logo: 40 },
} as const;
