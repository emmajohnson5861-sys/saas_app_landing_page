export const productExperience = {
  services: {
    eyebrow: 'One connected product',
    title: 'Built around your business.',
    accent: 'Ready for what’s next.',
    phoneTitle: 'Your SaaS, connected.',
    phoneLink: 'Explore the experience',
    items: [
      { title: 'Product Design', detail: 'Clear, intuitive experiences your users will love.' },
      { title: 'SaaS Engineering', detail: 'From your first MVP to a product built for scale.' },
      { title: 'AI & Automation', detail: 'Smarter workflows. Less manual work.' },
      { title: 'APIs & Integrations', detail: 'Connect every part of your product.' },
      { title: 'Cloud & Growth', detail: 'Reliable foundations for your next chapter.' },
    ],
  },
  development: {
    eyebrow: 'From idea to experience',
    title: 'Smart SaaS.',
    accent: 'Beautifully built.',
    description: 'Thoughtful interfaces. Reliable engineering. We bring every part of your SaaS together into a product that works beautifully, on every screen.',
    marquee: 'Product led. User focused. Built to scale.',
    primaryCta: 'Start Your SaaS Project',
    secondaryCta: 'Explore Live Demo',
  },
  motion: { desktopQuery: '(min-width: 1200px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', scrollLength: 2.8, scrub: .6 },
} as const;
