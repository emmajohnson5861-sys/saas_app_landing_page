"use client";

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { landingFooter } from '@/config/ending';

/** Half-speed footer reveal, synchronized with the existing smooth-scroll loop. */
export function FooterReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    async function initialize() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      await document.fonts.ready;
      if (disposed || !root.current || !panel.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
        const animation = gsap.fromTo(panel.current, { y: () => -panel.current!.offsetHeight * landingFooter.revealDistance }, {
          y: 0, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
        });
        return () => { animation.revert(); };
      });
      const resize = new ResizeObserver(() => ScrollTrigger.refresh());
      resize.observe(panel.current);
      cleanup = () => { resize.disconnect(); media.revert(); };
      ScrollTrigger.refresh();
    }
    void initialize().catch(() => cleanup());
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div className="alp_footer-reveal" ref={root}><div className="alp_footer-reveal-inner" ref={panel}>{children}</div></div>;
}
