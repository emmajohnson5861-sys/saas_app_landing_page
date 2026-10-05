import { ArrowUpRight, Check } from "lucide-react";
import type { LandingConfig } from "@/config/landing";
import { BrandStar } from "./BrandStar";
import { ProjectShowcase } from "./ProjectShowcase";

export function HeroSection({ config }: { config: LandingConfig }) {
  return <section className="alp_hero" aria-labelledby="alp_hero-title">
    <div className="alp_container">
      <div className="alp_hero-grid">
        <div className="alp_hero-copy">
          <p className="alp_eyebrow alp_reveal"><span className="alp_status-dot" />{config.hero.eyebrow}</p>
          <h1 id="alp_hero-title" className="alp_hero-title">{config.hero.headline.map((line) => <span className="alp_headline-line" key={line}>{line}</span>)}<span className="alp_headline-line alp_headline-accent">{config.hero.accentLine}<BrandStar className="alp_headline-star" /></span></h1>
          <p className="alp_hero-description alp_reveal">{config.hero.description}</p>
          <div className="alp_hero-actions alp_reveal"><a href={config.primaryCta.href} className="alp_button alp_button-primary" data-alp-event="hero_cta_click">{config.primaryCta.label}<ArrowUpRight className="alp_icon" aria-hidden="true" /></a><a href={config.hero.secondaryCta.href} className="alp_text-link" data-alp-event="project_click">{config.hero.secondaryCta.label}<ArrowUpRight className="alp_icon" aria-hidden="true" /></a></div>
          <ul className="alp_reassurance alp_reveal">{config.hero.reassurance.map((item) => <li key={item}><Check className="alp_icon" aria-hidden="true" />{item}</li>)}</ul>
        </div>
        <ProjectShowcase config={config.showcase} />
      </div>
      <div className="alp_hero-baseline"><p><BrandStar />{config.hero.closingNote}</p><ul>{config.hero.disciplines.map((item) => <li key={item}>{item}</li>)}</ul><span className="alp_hero-number">ALG / 001</span></div>
    </div>
  </section>;
}
