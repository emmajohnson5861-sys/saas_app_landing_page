import Image from 'next/image';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import type { SaaSLandingConfig } from '@/config/saas';
import { landingFooter as content } from '@/config/ending';
import { AnimatedButtonContent } from './AnimatedButtonContent';
import { LandingMotion } from './LandingMotion';
import { FooterReveal } from './FooterReveal';

export function SaaSFooter({ config }: { config: SaaSLandingConfig }) {
  return <FooterReveal><LandingMotion><footer className="alp_footer" id="alp_contact" aria-labelledby="alp_footer-title">
    <div className="alp_container"><div className="alp_intro-inner">
      <a href={config.brand.home} className="alp_footer-logo" aria-label={`${config.brand.name} home`}><Image src={config.brand.logo} alt={config.brand.name} width={168} height={27} style={{ height: 'auto' }}/></a>
      <div className="alp_footer-layout">
        <div className="alp_footer-invitation">
          <h2 id="alp_footer-title" data-alp-motion="heading">{content.title} <span className="alp_footer-accent">{content.titleAccent}</span></h2>
          <p className="alp_footer-description" data-alp-motion="text">{content.description}</p>
          <a className="alp_button alp_button-3d alp_button-orange alp_footer-cta" href={config.hero.primaryCta.href}><AnimatedButtonContent label={content.cta}/></a>
          <p className="alp_footer-email-prompt">{content.emailPrompt}</p>
          <a className="alp_footer-email" href={`mailto:${content.email}`}>{content.email}</a>
        </div>
        <nav className="alp_footer-navigation" aria-label="Footer navigation">
          <div className="alp_footer-column"><h3>Contact us</h3><ul><li><span className="alp_footer-contact-label">Our email</span><a href={`mailto:${content.email}`}>{content.email}</a></li><li><a href={content.phone.href}>{content.phone.label}</a></li><li className="alp_footer-contact-note">{content.contactNote}</li></ul></div>
          <div className="alp_footer-column"><h3>Follow us</h3><ul>{content.socials.map(link => <li key={link.label}><a className="alp_footer-social" href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight aria-hidden="true"/></a></li>)}</ul></div>
          <div className="alp_footer-column"><h3>Services</h3><ul>{content.services.map(link => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul></div>
        </nav>
      </div>
      <div className="alp_footer-bottom"><p>© {new Date().getFullYear()} {config.brand.name}. All rights reserved <span aria-hidden="true">·</span> <a href={content.privacy.href}>{content.privacy.label}</a></p><a className="alp_footer-top" href="#alp_page-top">Back to the top <ArrowUp aria-hidden="true"/></a></div>
    </div></div>
  </footer></LandingMotion></FooterReveal>;
}
