import { landingConfig, type LandingLink } from "./landing";

export type SaaSLandingConfig = {
  slug: string;
  brand: typeof landingConfig.brand;
  metadata: { title: string; description: string };
  navigation: LandingLink[];
  primaryCta: LandingLink;
  secondaryHeaderCta?: LandingLink;
  intro: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    cta: LandingLink;
    blueprint: {
      label: string;
      title: string;
      layers: { label: string; title: string; capabilities: string[] }[];
      footer: string;
    };
  };
  hero: {
    eyebrow: string;
    headlineStart: string;
    headlineEnd: string;
    headlineSecond: string;
    description: string;
    primaryCta: LandingLink;
    secondaryCta: LandingLink;
    reassurance: string[];
    journey: { label: string; icon: 'design' | 'code' | 'cloud' }[];
  };
  product: {
    name: string;
    workspace: string;
    caption: string;
    overview: {
      greeting: string;
      title: string;
      revenueLabel: string;
      revenue: string;
      revenueChange: string;
      metrics: { label: string; value: string; trend: string }[];
      activityTitle: string;
      payments: { initials: string; name: string; plan: string; amount: string }[];
    };
    projects: {
      title: string;
      subtitle: string;
      tabs: string[];
      items: { title: string; category: string; progress: number; status: string; people: string[] }[];
    };
    automation: {
      title: string;
      subtitle: string;
      workflowName: string;
      steps: { title: string; detail: string }[];
      items: { title: string; detail: string }[];
    };
  };
};

export const saasLandingConfig: SaaSLandingConfig = {
  slug: "saas-app-development",
  brand: landingConfig.brand,
  metadata: {
    title: "SaaS App Development Services | Algofort",
    description: "Turn your SaaS idea into a scalable product with Algofort. From UX design and MVP development to subscriptions, integrations, and launch.",
  },
  navigation: [{ label: "Home", href: "/" }, ...landingConfig.navigation.map(link => link.label === 'Work' ? { ...link, href: '#alp_portfolio' } : link.label === 'Reviews' ? { ...link, href: '#alp_clients' } : link)],
  primaryCta: { ...landingConfig.primaryCta, label: "Get Started" },
  intro: {
    eyebrow: "Product-led development",
    title: "More than an app.",
    titleAccent: "A business built to grow.",
    description: "We turn ambitious ideas into SaaS products people love to use. From product strategy and design to scalable engineering, we build every layer around your customers and your business.",
    cta: { ...landingConfig.primaryCta, label: "Let’s Talk About Your Idea" },
    blueprint: {
      label: "Your product, thoughtfully engineered",
      title: "Connected by design.",
      layers: [
        { label: "01 / Experience", title: "Made for your users", capabilities: ["User Experience", "Product Design", "Web & Mobile"] },
        { label: "02 / Product", title: "Built around your business", capabilities: ["Web Applications", "Subscriptions", "Integrations"] },
        { label: "03 / Foundation", title: "Ready for your next chapter", capabilities: ["APIs & Integrations", "Data", "Cloud Infrastructure"] },
      ],
      footer: "One product. Every layer considered.",
    },
  },
  hero: {
    journey: [{ label: 'Design', icon: 'design' }, { label: 'Build', icon: 'code' }, { label: 'Launch', icon: 'cloud' }],
    eyebrow: "Custom SaaS Development Services",
    headlineStart: "Turn Your Ideas Into",
    headlineEnd: "Powerful",
    headlineSecond: "SaaS Products",
    description: "We build scalable, secure, and high-performing SaaS applications that help you automate, grow, and stay ahead in the digital world.",
    primaryCta: { ...landingConfig.primaryCta, label: "Start Your Project" },
    secondaryCta: { label: "Explore Live Demo", href: "#alp_demo" },
    reassurance: ["MVP to full-scale product", "Built around your business"],
  },
  // Sample UI data for an illustrative SaaS workspace. These are not client results.
  product: {
    name: "orbit",
    workspace: "Acme Workspace",
    caption: "SaaS interface concept · Dashboards, collaboration & automation",
    overview: {
      greeting: "Good morning, Alex",
      title: "Your business.\nIn focus.",
      revenueLabel: "Monthly recurring revenue",
      revenue: "$24,680",
      revenueChange: "+12.8% this month",
      metrics: [
        { label: "Active users", value: "1,284", trend: "+8.2%" },
        { label: "Subscriptions", value: "342", trend: "+6.4%" },
      ],
      activityTitle: "Recent activity",
      payments: [
        { initials: "SL", name: "Sarah Lee", plan: "Pro plan · Monthly", amount: "+$49.00" },
        { initials: "MC", name: "Marcus Chen", plan: "Team plan · Monthly", amount: "+$129.00" },
      ],
    },
    projects: {
      title: "A little clarity.\nA lot of progress.",
      subtitle: "Your team, in sync.",
      tabs: ["Active", "Completed", "All projects"],
      items: [
        { title: "Analytics dashboard", category: "Product design", progress: 72, status: "In progress", people: ["AK", "JL", "MS"] },
        { title: "Customer onboarding", category: "User experience", progress: 48, status: "In progress", people: ["SL", "JR"] },
        { title: "API integration", category: "Engineering", progress: 100, status: "Complete", people: ["MC", "AK"] },
      ],
    },
    automation: {
      title: "Less busywork.\nMore possibility.",
      subtitle: "Workflows that work for you.",
      workflowName: "Customer onboarding",
      steps: [
        { title: "New signup", detail: "When a customer joins" },
        { title: "Create workspace", detail: "Set up their account" },
        { title: "Send welcome email", detail: "Make a great first impression" },
      ],
      items: [
        { title: "Subscription billing", detail: "Runs automatically" },
        { title: "Team notifications", detail: "Keep everyone connected" },
      ],
    },
  },
};
