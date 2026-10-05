export const capabilities = {
  // Temporarily hidden. Set to true to restore the section.
  visible: false,
  eyebrow: "BUILT FOR WHAT'S NEXT",
  title: "Everything Your SaaS Product",
  accent: "Needs to Scale.",
  description: "From the first interface to the systems running behind it, we build the technology that makes your product work beautifully and reliably.",
  items: [
    { id: "design", title: "Product Design", description: "Simple interfaces for complex products." },
    { id: "development", title: "SaaS Development", description: "Scalable web applications built around your business model." },
    { id: "automation", title: "AI & Automation", description: "Intelligent workflows that reduce manual work and unlock new possibilities." },
    { id: "integrations", title: "APIs & Integrations", description: "Connect your product with the tools, services, and data it depends on." },
    { id: "analytics", title: "Dashboards & Analytics", description: "Turn business data into useful, real-time insights." },
    { id: "cloud", title: "Cloud & Infrastructure", description: "Reliable foundations designed for performance and growth." },
  ],
} as const;
