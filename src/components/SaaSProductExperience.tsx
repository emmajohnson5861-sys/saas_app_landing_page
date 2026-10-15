import Image from 'next/image';
import { BarChart3, Boxes, Code2, Menu, Network, Users } from 'lucide-react';
import type { SaaSLandingConfig } from '@/config/saas';
import { productExperience as content } from '@/config/product-experience';
import assets from '@/config/product-assets.json';
import { ProductExperienceMotion } from './ProductExperienceMotion';
import { SectionEyebrow } from './SectionEyebrow';
import { AnimatedButtonContent } from './AnimatedButtonContent';

const icons = [Code2, Users, Boxes, BarChart3, Network];
const base = '/product-experience/';
function Asset({ name, className, alt = '', sizes }: { name: keyof typeof assets; className?: string; alt?: string; sizes: string }) {
  return <Image src={base + name} {...assets[name]} alt={alt} className={className} sizes={sizes} />;
}

export function SaaSProductExperience({ config }: { config: SaaSLandingConfig }) {
  return <ProductExperienceMotion>
    <section className="alp_product-services" id="alp_product-services" aria-labelledby="alp_product-services-title">
      <div className="alp_container"><div className="alp_intro-inner">
        <div className="alp_product-heading"><SectionEyebrow>{content.services.eyebrow}</SectionEyebrow><h2 className="alp_product-title" id="alp_product-services-title" data-alp-motion="heading">{content.services.title} <span className="alp_product-heading-accent">{content.services.accent}</span></h2></div>
      </div></div>
        <div className="alp_product-stage">
          <div className="alp_product-phone"><div className="alp_product-phone-header"><div className="alp_product-logo"><Image src={config.brand.logo} alt={config.brand.name} width={120} height={20} /></div><Menu aria-hidden="true" size={24} /></div><div className="alp_product-phone-text"><p>{content.services.phoneTitle}</p><a href="#alp_product-development">{content.services.phoneLink}</a></div></div>
          <div className="alp_product-cards">{content.services.items.map((item,index) => { const Icon = icons[index]; return <article className="alp_product-card" key={item.title}><div className="alp_product-card-icon"><Icon aria-hidden="true" /></div><div className="alp_product-card-content"><h3 className="alp_product-card-title" data-alp-motion="heading">{item.title}</h3><p data-alp-motion="text">{item.detail}</p></div></article>; })}</div>
          <div className="alp_product-plus" aria-hidden="true"><div className="alp_product-plus-wrap"><svg className="alp_product-plus-shape" width="50" height="50" viewBox="0 0 50 50" fill="none"><g className="alp_product-plus-vector"><circle cx="25" cy="25" r="25"/><path fillRule="evenodd" clipRule="evenodd" d="M26.5 16.5H23.5V23.5H16.5V26.5H23.5V33.5H26.5V26.5H33.5V23.5H26.5V16.5ZM23.5 23.5H26.5V26.5H23.5Z"/></g></svg></div></div>
        </div>
    </section>
    <div className="alp_product-dark-chapter" data-alp-dark-start>
      <section className="alp_product-development" id="alp_product-development" aria-labelledby="alp_product-development-title">
        <div className="alp_product-line" aria-hidden="true"><svg className="alp_product-line-svg" viewBox="0 0 1728 1101" fill="none"><path d="M-43 773.821C160.86 662.526 451.312 637.01 610.111 733.104C768.91 829.197 932.595 1062.9 602.782 1098.75C272.969 1134.6 676.888 25.4306 1852 1"/></svg></div>
        <div className="alp_product-development-content">
          <div className="alp_product-marquee alp_product-marquee-base" aria-hidden="true"><div className="alp_product-marquee-track">{[0,1,2,3].map(index => <div className="alp_product-marquee-item" key={index}><p className="alp_product-marquee-text">{content.development.marquee}</p></div>)}</div></div>
          <div className="alp_container alp_product-development-container"><div className="alp_intro-inner alp_product-dev-copy"><SectionEyebrow>{content.development.eyebrow}</SectionEyebrow><h2 className="alp_product-dev-heading" id="alp_product-development-title" data-alp-motion="heading"><span className="alp_product-dev-title"><span>{content.development.title}</span><span className="alp_product-heading-accent">{content.development.accent}</span></span><span className="alp_product-dev-stars" aria-hidden="true">**</span></h2><div className="alp_product-floating-phones" aria-hidden="true"><Asset name="phone-01.webp" className="alp_product-phone-left" sizes="(max-width:768px) 220px, 400px"/><Asset name="phone-02.webp" className="alp_product-phone-right" sizes="(max-width:768px) 220px, 400px"/></div><div className="alp_product-dev-bottom"><p className="alp_product-dev-description" data-alp-motion="text">{content.development.description}</p><div className="alp_product-dev-actions"><a className="alp_button alp_button-3d alp_button-orange" href={config.hero.primaryCta.href}><AnimatedButtonContent label={content.development.primaryCta} /></a><a className="alp_button alp_button-3d alp_button-white" href="#alp_demo"><AnimatedButtonContent label={content.development.secondaryCta} /></a></div></div></div></div>
        </div>
        
        <div className="alp_product-screens">
          <div className="alp_product-screens-wrapper" aria-hidden="true"><div className="alp_product-screen-grid">{[1,2,3].map(row => <div className="alp_product-screen-row" key={row}>{[1,2,0,3,4].map((column,index) => <div className="alp_product-screen-item" key={index}><div className="alp_product-screen-media">{column > 0 && <Asset name={`screen${row}-${column}.webp` as keyof typeof assets} className="alp_product-screen-image" sizes="(max-width:768px) 150px, (max-width:1124px) 201px, 365px"/>}</div></div>)}</div>)}</div></div>
          <div className="alp_product-hand-wrapper" aria-hidden="true"><div className="alp_product-hand"><Asset name="hand.webp" className="alp_product-hand-image" sizes="(max-width:768px) 770px, (max-width:1124px) 1029px, 1870px"/><div className="alp_product-video"><video data-src={base + 'phone.mp4'} playsInline muted loop preload="none" poster={base + 'screen1-2.webp'} /></div></div></div>
        </div>
      </section>
    </div>
  </ProductExperienceMotion>;
}
