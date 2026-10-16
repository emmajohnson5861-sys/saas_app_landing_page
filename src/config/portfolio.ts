import assets from './portfolio-assets.json';

/** Approval-stage concepts. Replace images/copy here with verified client work. */
export const portfolio = {
  eyebrow: 'Our Portfolio',
  title: 'Distinct products.',
  titleAccent: 'Built to scale.',
  description: 'A glimpse of the interfaces, platforms, and digital experiences we can build around your business.',
  cta: 'Let’s Build Your Product',
  projects: [
    { id: 'operations-dashboard', title: 'Operations Dashboard', category: 'SaaS / Analytics', span: 14, image: assets['operations-dashboard'], alt: 'Laptop mockup showing a dark analytics dashboard with charts and business metrics.', description: 'A concept for bringing team activity, business metrics, and daily operations into one clear workspace.', tags: ['Dashboard design', 'Data visualization', 'Web application'] },
    { id: 'grocery-mobile', title: 'Grocery Delivery App', category: 'Mobile / Delivery', span: 10, image: assets['grocery-mobile'], alt: 'Two mobile app screens showing grocery browsing and a shopping basket.', description: 'A mobile shopping concept with a simple path from product discovery to basket and checkout.', tags: ['Mobile experience', 'Product catalog', 'Checkout flow'] },
    { id: 'wellness-mobile', title: 'Wellness Mobile App', category: 'Mobile / Wellbeing', span: 10, image: assets['wellness-mobile'], alt: 'Warm-toned mobile interface mockup displayed among natural stone textures.', description: 'An interface direction for a calm, focused mobile experience built around everyday wellbeing.', tags: ['Interface concept', 'Mobile design', 'User experience'] },
    { id: 'commerce-platform', title: 'Commerce Platform', category: 'Web / Commerce', span: 14, image: assets['commerce-platform'], alt: 'Laptop displaying a grocery commerce storefront with categories and product listings.', description: 'A storefront concept that brings product discovery, categories, and shopping flows together.', tags: ['Commerce experience', 'Responsive design', 'Product discovery'] },
    { id: 'creator-workspace', title: 'Creator Workspace', category: 'Web / Creator tools', span: 13, image: assets['creator-workspace'], alt: 'Minimal laptop website mockup with editorial typography and a creative studio layout.', description: 'A visual direction for a creator-focused workspace with a distinct editorial identity.', tags: ['Visual identity', 'Web experience', 'Content presentation'] },
    { id: 'fashion-mobile', title: 'Mobile Commerce Experience', category: 'Mobile / Commerce', span: 11, image: assets['fashion-mobile'], alt: 'Minimal fashion mobile interface mockup on a sculptural monochrome background.', description: 'A mobile commerce direction with a clean product presentation and a focused browsing experience.', tags: ['Mobile interface', 'Product experience', 'Commerce design'] },
  ],
} as const;

export type PortfolioProject = (typeof portfolio.projects)[number];
