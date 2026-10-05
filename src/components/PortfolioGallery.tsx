"use client";

import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { PortfolioProject } from '@/config/portfolio';
import { AnimatedButtonContent } from './AnimatedButtonContent';

export function PortfolioGallery({ projects, contactHref }: { projects: readonly PortfolioProject[]; contactHref: string }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const project = active === null ? null : projects[active];

  useEffect(() => {
    if (active === null) return;
    const panel = dialog.current!;
    if (!panel.open) panel.showModal();
    const previous = document.documentElement.getAttribute('data-alp-scroll-lock');
    document.documentElement.setAttribute('data-alp-scroll-lock', 'true');
    return () => {
      if (previous === null) document.documentElement.removeAttribute('data-alp-scroll-lock');
      else document.documentElement.setAttribute('data-alp-scroll-lock', previous);
    };
  }, [active]);

  const close = () => dialog.current?.close();
  return <>
    <div className="alp_portfolio-grid">
      {projects.map((item, index) => <article key={item.id} className="alp_portfolio-card" style={{ '--alp_portfolio-span': item.span } as CSSProperties} data-alp-motion="visual" data-alp-delay={index % 2 * .1}>
        <button type="button" className="alp_portfolio-project" aria-label={`Preview ${item.title} design concept`} onClick={event => { opener.current = event.currentTarget; setActive(index); }}>
          <Image {...item.image} alt={item.alt} className="alp_portfolio-image" placeholder="blur" sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1023px) 55vw, 670px" />
          <span className="alp_portfolio-caption"><span className="alp_portfolio-caption-copy"><span className="alp_portfolio-category">{item.category}</span><span className="alp_portfolio-name">{item.title}</span></span><span className="alp_portfolio-arrow" aria-hidden="true"><ArrowUpRight /></span></span>
        </button>
      </article>)}
    </div>
    <dialog ref={dialog} className="alp_portfolio-dialog" aria-labelledby="alp_portfolio-preview-title" aria-describedby="alp_portfolio-preview-description" onClose={() => { setActive(null); opener.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      {project && <div className="alp_portfolio-preview" data-alp-native-scroll>
        <div className="alp_portfolio-preview-header"><span>Design concept <span aria-hidden="true">/</span> {String(active! + 1).padStart(2, '0')}</span><button className="alp_portfolio-icon-button" type="button" aria-label="Close project preview" onClick={close} autoFocus><X /></button></div>
        <div className="alp_portfolio-preview-media"><Image key={project.id} {...project.image} alt={project.alt} placeholder="blur" sizes="(max-width: 768px) 90vw, 960px" /></div>
        <div className="alp_portfolio-preview-copy"><span className="alp_portfolio-category">{project.category}</span><h3 id="alp_portfolio-preview-title">{project.title}</h3><p id="alp_portfolio-preview-description">{project.description}</p><ul className="alp_portfolio-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><div className="alp_portfolio-preview-actions"><a href={contactHref} className="alp_button alp_button-3d alp_button-orange"><AnimatedButtonContent label="Discuss a Similar Project" /></a><div className="alp_portfolio-preview-navigation"><button className="alp_portfolio-icon-button" type="button" aria-label="Previous project" onClick={() => setActive((active! + projects.length - 1) % projects.length)}><ArrowLeft /></button><span aria-live="polite">{active! + 1} / {projects.length}</span><button className="alp_portfolio-icon-button" type="button" aria-label="Next project" onClick={() => setActive((active! + 1) % projects.length)}><ArrowRight /></button></div></div></div>
      </div>}
    </dialog>
  </>;
}
