/** Summaries of feedback already published on the supplied Algofort website.
 * Replace copy, names, and initials here when updating client stories.
 * No third-party awards or ratings are presented as Algofort credentials.
 */
export const clientStories = {
  eyebrow: 'What Our Clients Say',
  description: 'Our clients bring the ambition. We bring the product thinking and engineering to make it real.',
  strengths: [
    { title: 'Clear communication', detail: 'A shared vision, every step.' },
    { title: 'Built together', detail: 'One team, from idea to launch.' },
  ],
  source: 'https://algoforts.vercel.app/#sec-testimonials',
  motion: { lineStagger: .02, exitDuration: .55, enterDuration: .8, swapAt: .72, ownerExitDuration: .55, ownerDuration: .7 },
  items: [
    { name: 'Ahsan Raza', initials: 'AR', role: 'CEO', company: 'QuickBasket · Karachi', summary: 'Algofort helped QuickBasket turn an idea into a working app faster than expected. A responsive, professional team and skilled engineering made the experience feel like a true technology partnership.' },
    { name: 'Bilal Shahid', initials: 'BS', role: 'CTO', company: 'PayWell Solutions · Islamabad', summary: 'The team understood the complexity behind PayWell’s fintech product and delivered a secure, scalable solution on time. Clear understanding of the requirements made a real difference to the project.' },
    { name: 'Hira Javed', initials: 'HJ', role: 'Marketing Head', company: 'Al-Karim Fabrics · Faisalabad', summary: 'Algofort’s website revamp brought Al-Karim Fabrics a sleek, fast, mobile-friendly experience. The result matched what the team wanted for its customers and gave the website a fresh direction.' },
    { name: 'Zainab Fatima', initials: 'ZF', role: 'Founder', company: 'GlamNest · Lahore', summary: 'The branding work transformed GlamNest’s online presence. A more premium, professional look brought a clearer identity to the business and changed how the brand presented itself online.' },
  ],
} as const;

/** Contact details and social URLs from the supplied Algofort home page. */
export const landingFooter = {
  title: 'We’d love to',
  titleAccent: 'hear from you.',
  description: 'Have a SaaS idea, a product to improve, or a challenge worth solving? Let’s build what’s next, together.',
  cta: 'Become a Client',
  emailPrompt: 'Prefer email? Drop us a line.',
  email: 'hello@algofort.com',
  phone: { label: '+92 323 367 8383', href: 'tel:+923233678383' },
  contactNote: 'Your next chapter starts with a conversation.',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/algofort' },
    { label: 'Instagram', href: 'https://instagram.com/algofort' },
    { label: 'Facebook', href: 'https://facebook.com/algofort' },
  ],
  services: [
    { label: 'Web Development', href: '#alp_product-services' },
    { label: 'Brand Identity', href: '#alp_product-services' },
    { label: 'SaaS App Development', href: '#alp_product-services' },
    { label: 'Mobile App Development', href: '#alp_product-services' },
  ],
  privacy: { label: 'Privacy Policy', href: 'https://algoforts.vercel.app/#privacy' },
  revealDistance: 0.5,
} as const;
