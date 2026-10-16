export const productExperience = {
  services: {
    eyebrow: 'Our Services',
    title: 'Tailored software services.',
    accent: 'Engineered to scale.',
    phoneTitle: 'Services built to scale.',
    phoneLink: 'Explore our services',
    items: [
      { title: 'Custom SaaS', detail: 'Scalable multi-tenant apps built for modern growth.' },
      { title: 'CRM Software', detail: 'Streamline lead journeys and close deals faster.' },
      { title: 'ERP Software', detail: 'Unified operations. Automated workflows.' },
      { title: 'Dashboard & Analytics', detail: 'Actionable metrics and growth insights.' },
      { title: 'API Integration', detail: 'Seamless connectivity across your tech stack.' },
    ],
  },
  development: {
    eyebrow: 'From Idea to Experience',
    title: 'Smart SaaS.',
    accent: 'Beautifully built.',
    description: 'Thoughtful interfaces. Reliable engineering. We bring every part of your SaaS together into a product that works beautifully on every screen.',
    marquee: 'Product-led. User-focused. Built to scale.',
    primaryCta: 'Start Your SaaS Project',
    secondaryCta: 'Explore Live Demo',
  },
  motion: { desktopQuery: '(min-width: 1200px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', scrollLength: 2.8, scrub: .6 },
} as const;
