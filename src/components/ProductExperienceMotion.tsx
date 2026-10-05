"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { productExperience } from '@/config/product-experience';

/** Scoped React port of the supplied pin/fan-out/expanding-plus sequence. */
export function ProductExperienceMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      void initialize();
    }, { rootMargin: '900px 0px' });

    async function initialize() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
        await document.fonts.ready;
        if (disposed || !element) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        cleanup = () => media.revert();
        media.add(productExperience.motion.desktopQuery, () => {
          const stage = element.querySelector<HTMLElement>('.alp_product-stage')!;
          const phone = element.querySelector<HTMLElement>('.alp_product-phone')!;
          const cards = element.querySelector<HTMLElement>('.alp_product-cards')!;
          const items = [...cards.querySelectorAll<HTMLElement>('.alp_product-card')];
          const plus = element.querySelector<HTMLElement>('.alp_product-plus-wrap')!;
          const vector = element.querySelector<SVGGElement>('.alp_product-plus-vector')!;
          const cardsBottom = () => cards.offsetTop + cards.offsetHeight;
          gsap.set(items, { x: index => (2 - index) * (items[0].offsetWidth + 10) });
          const sequence = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
            trigger: stage, start: 'top top', end: () => '+=' + innerHeight * productExperience.motion.scrollLength,
            pin: stage, scrub: productExperience.motion.scrub, anticipatePin: 1, invalidateOnRefresh: true,
          } });
          sequence.to(items, { x: 0, duration: .5 }, 0)
            .to([phone, cards], { y: () => -cardsBottom(), duration: .8 }, .5)
            .fromTo(plus, { y: () => cardsBottom() - 46 - innerHeight / 2 }, { y: 0, duration: .8 }, .5)
            // Transform the SVG group itself so circle and plus stay vector-rendered.
            .to(vector, { svgOrigin: '25 25', scale: 860, force3D: false, ease: 'power2.in', duration: 1.5 }, 1.3);
        }, element);
        media.add('(prefers-reduced-motion: no-preference)', () => {
          const path = element.querySelector<SVGPathElement>('.alp_product-line-svg path');
          if (path) {
            const length = path.getTotalLength();
            gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 4.8, ease: 'power2.out', scrollTrigger: { trigger: '.alp_product-development', start: 'top 80%', once: true } });
          }
        }, element);
        ScrollTrigger.refresh();
      } catch {
        cleanup(); // The normal section layout stays usable if animation setup fails.
      }
    }
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); cleanup(); };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const video = element.querySelector<HTMLVideoElement>('video')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    const updatePlayback = () => {
      if (visible && !reduced.matches && !connection?.saveData && !document.hidden) {
        if (!video.getAttribute('src')) video.src = video.dataset.src!;
        void video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      element.dataset.visible = String(visible);
      updatePlayback();
    }, { threshold: .05 });
    observer.observe(element.querySelector('.alp_product-development')!);
    document.addEventListener('visibilitychange', updatePlayback);
    reduced.addEventListener('change', updatePlayback);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', updatePlayback); reduced.removeEventListener('change', updatePlayback); video.pause(); };
  }, []);

  return <div className="alp_product-experience" ref={root}>
    {children}
  </div>;
}
