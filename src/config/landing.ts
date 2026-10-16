export type LandingLink = { label: string; href: string };

export type LandingConfig = {
  brand: { name: string; logo: string; home: string };
  metadata: { title: string; description: string };
  navigation: LandingLink[];
  primaryCta: LandingLink;
  hero: {
    eyebrow: string;
    headline: string[];
    accentLine: string;
    description: string;
    secondaryCta: LandingLink;
    reassurance: string[];
    closingNote: string;
    disciplines: string[];
  };
  showcase: {
    label: string;
    caption: string;
    dashboard: { name: string; greeting: string; title: string; period: string; metrics: { label: string; value: string; trend: string }[]; chartLabel: string; chartValue: string; activity: string; activityDetail: string };
    mobile: { name: string; title: string; image: string; imageAlt: string; collection: string };
  };
};

// Phase 1 links go to the existing website until the corresponding local sections are approved.
const website = "https://algoforts.vercel.app";

export const landingConfig: LandingConfig = {
  brand: { name: "Algofort", logo: "/brand/algofort-dark.png", home: "/" },
  metadata: {
    title: "Custom Web Development & Digital Products | Algofort",
    description: "Algofort designs and develops high-performance websites, custom software, mobile apps, and digital products for growing businesses.",
  },
  navigation: [
    { label: "Work", href: `${website}/#sec-projects` },
    { label: "Services", href: `${website}/#sec-services` },
    { label: "Process", href: `${website}/#sec-process` },
    { label: "Reviews", href: `${website}/#sec-testimonials` },
  ],
  primaryCta: { label: "Start Your Project", href: `${website}/#sec-cta` },
  hero: {
    eyebrow: "Digital product & development agency",
    headline: ["We build digital", "experiences that"],
    accentLine: "drive growth.",
    description: "Algofort designs and develops high-performance websites, custom software, and digital products built around real business goals.",
    secondaryCta: { label: "View Our Work", href: `${website}/#sec-projects` },
    reassurance: ["Strategy-led design", "Performance-first development"],
    closingNote: "Built with purpose. Made for what’s next.",
    disciplines: ["Websites", "Digital products", "AI & automation"],
  },
  showcase: {
    label: "From vision to version 1.0",
    caption: "Interface concepts. Endless possibilities.",
    dashboard: {
      name: "orbit", greeting: "YOUR BUSINESS, AT A GLANCE", title: "A clearer view of growth.", period: "This month",
      metrics: [
        { label: "Total revenue", value: "$48,250", trend: "+18.6%" },
        { label: "Active customers", value: "2,845", trend: "+12.8%" },
        { label: "Conversion rate", value: "4.82%", trend: "+2.4%" },
      ],
      chartLabel: "Revenue overview", chartValue: "$48,250.00", activity: "Everything connected.", activityDetail: "One workspace. More possibilities.",
    },
    mobile: {
      name: "FORM®", title: "Everyday,\nelevated.", image: "/images/fashion.webp", imageAlt: "Editorial fashion image from the Algofort reference website", collection: "Explore the collection",
    },
  },
};
