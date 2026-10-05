import { portfolio } from '@/config/portfolio';
import type { SaaSLandingConfig } from '@/config/saas';
import { AnimatedButtonContent } from './AnimatedButtonContent';
import { SectionEyebrow } from './SectionEyebrow';
import { PortfolioGallery } from './PortfolioGallery';

export function SaaSPortfolio({ config }: { config: SaaSLandingConfig }) {
  return <section className="alp_portfolio" id="alp_portfolio" aria-labelledby="alp_portfolio-title">
    <div className="alp_container"><div className="alp_intro-inner">
      <div className="alp_portfolio-intro">
        <div className="alp_portfolio-copy"><SectionEyebrow>{portfolio.eyebrow}</SectionEyebrow><p className="alp_portfolio-description" data-alp-motion="text">{portfolio.description}</p></div>
        <div className="alp_portfolio-heading"><h2 id="alp_portfolio-title" data-alp-motion="heading">{portfolio.title}{' '}<span className="alp_portfolio-accent">{portfolio.titleAccent}</span></h2><div className="alp_portfolio-cta" data-alp-motion="reveal"><a href={config.hero.primaryCta.href} className="alp_button alp_button-3d alp_button-orange"><AnimatedButtonContent label={portfolio.cta}/></a></div></div>
      </div>
      <PortfolioGallery projects={portfolio.projects} contactHref={config.hero.primaryCta.href} />
    </div></div>
  </section>;
}
