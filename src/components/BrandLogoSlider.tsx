"use client";

import { useEffect, useRef } from 'react';
import { brandShowcase as content } from '@/config/brand-showcase';

type Mark = typeof content.brands[number]['mark'];

function BrandMark({ mark }: { mark: Mark }) {
  return <svg className="alp_logos-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    {mark === 'star' && <path d="M16 1L19.5 12.5L31 16L19.5 19.5L16 31L12.5 19.5L1 16L12.5 12.5Z" fill="currentColor"/>}
    {mark === 'orbit' && <><circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="3"/><ellipse cx="16" cy="16" rx="15" ry="6" transform="rotate(-40 16 16)" stroke="currentColor" strokeWidth="2"/></>}
    {mark === 'layers' && <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"><path d="M16 3L30 10L16 17L2 10Z"/><path d="M2 17L16 24L30 17M2 24L16 31L30 24"/></g>}
    {mark === 'vertex' && <path d="M16 2L31 29H21L16 19L11 29H1Z" fill="currentColor"/>}
    {mark === 'relay' && <g fill="currentColor"><rect x="1" y="7" width="13" height="18" rx="6.5"/><rect x="18" y="7" width="13" height="18" rx="6.5"/></g>}
    {mark === 'forma' && <path d="M2 2H30V10H11V15H25V23H11V30H2Z" fill="currentColor"/>}
    {mark === 'kinetik' && <g stroke="currentColor" strokeWidth="5"><path d="M5 3V29M27 3L14 16L27 29"/></g>}
    {mark === 'lumio' && <><circle cx="16" cy="16" r="7" fill="currentColor"/><g stroke="currentColor" strokeWidth="2.5"><path d="M16 0V5M16 27V32M0 16H5M27 16H32M5 5L8 8M24 24L27 27M5 27L8 24M24 8L27 5"/></g></>}
  </svg>;
}

/** A single composited CSS track; no animation timer or third-party carousel. */
export function BrandLogoSlider() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = false;
    const update = () => { element.dataset.running = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      update();
    }, { threshold: .05 });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);

  return <div className="alp_logos" ref={root} data-running="false" role="region" aria-label="Illustrative brand showcase">
    <div className="alp_logos-heading" data-alp-motion="reveal"><p>{content.title}</p></div>
    <div className="alp_logos-window"><div className="alp_logos-track">
      {[0,1].map(copy => <ul className="alp_logos-group" key={copy} aria-hidden={copy === 1}>{content.brands.map(brand => <li className={`alp_logos-brand alp_logos-brand-${brand.mark}`} key={brand.name}><BrandMark mark={brand.mark}/><span>{brand.name}</span></li>)}</ul>)}
    </div></div>
  </div>;
}
