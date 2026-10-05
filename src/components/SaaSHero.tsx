import { ChevronRight } from "lucide-react";
import { AnimatedButtonContent } from "./AnimatedButtonContent";
import type { SaaSLandingConfig } from "@/config/saas";
import { InteractiveDashboard } from "./InteractiveDashboard";
import { BrandLogoSlider } from "./BrandLogoSlider";
import { SaaSHeroMotion } from "./SaaSHeroMotion";
import { HeroAccents } from "./HeroAccents";

/** Layered CSS eclipse: recessed band, fine rims and static diffused lighting. */
function HeroSun() {
  return <div className="alp_sun-orbit-clip" aria-hidden="true"><div className="alp_sun-orbit"><div className="alp_sun-orbit-entrance">
    <div className="alp_sun-sculpture">
      <span className="alp_sun-bloom"/>
      <span className="alp_sun-ring-base"/>
      <span className="alp_sun-rim-halo"/>
      <span className="alp_sun-ring-face"/>
      <span className="alp_sun-ring-shading"/>
      <span className="alp_sun-outer-rim"/>
      <span className="alp_sun-inner-halo"/>
      <span className="alp_sun-inner-rim"/>
    </div>
  </div></div></div>;
}

export function SaaSHero({ config }: { config: SaaSLandingConfig }) {
  return <section className="alp_saas-hero alp_sun-hero" aria-labelledby="alp_saas-title">
    <SaaSHeroMotion>
    <div className="alp_container">
      <div className="alp_saas-copy">
        <p className="alp_saas-eyebrow" data-alp-hero-entrance><span className="alp_saas-eyebrow-tag">New</span><span>{config.hero.eyebrow}</span><ChevronRight className="alp_saas-eyebrow-chevron" aria-hidden="true" /></p>
        <h1 id="alp_saas-title" className="alp_saas-title" aria-label={`${config.hero.headlineStart} ${config.hero.headlineEnd} ${config.hero.headlineSecond}`} data-alp-hero-entrance><span className="alp_saas-title-line">{config.hero.headlineStart}</span>{" "}<span className="alp_saas-title-line"><span className="alp_saas-accent">{config.hero.headlineEnd}</span>{" "}{config.hero.headlineSecond}</span></h1>
        <p className="alp_saas-description" data-alp-hero-entrance>{config.hero.description}</p>
        <div className="alp_saas-actions" data-alp-hero-entrance><a href={config.hero.secondaryCta.href} className="alp_button alp_button-3d alp_button-white"><AnimatedButtonContent label={config.hero.secondaryCta.label} /></a><a href={config.hero.primaryCta.href} className="alp_button alp_button-3d alp_button-orange" data-alp-event="hero_cta_click"><AnimatedButtonContent label={config.hero.primaryCta.label} /></a></div>
        <HeroAccents steps={config.hero.journey}/>
      </div>
      <div className="alp_sun-stage"><HeroSun/><div className="alp_sun-app-entrance"><div className="alp_sun-app"><InteractiveDashboard brand={config.brand}/><div className="alp_sun-app-fade" aria-hidden="true"/></div></div></div>
      <BrandLogoSlider />
    </div>
    </SaaSHeroMotion>
  </section>;
}

