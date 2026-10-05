"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import { heroMotion as motion } from '@/config/hero-motion';
import { waitForPageReveal } from '@/lib/page-reveal';

/** Separate entrance/scroll layers avoid competing transforms on the live demo. */
export function SaaSHeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const controller = new AbortController();
    async function initialize() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      await document.fonts.ready;
      if (root.current) await waitForPageReveal(root.current, controller.signal);
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const element = root.current;
      const media = gsap.matchMedia();
      cleanup = () => media.revert();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const entrance = gsap.timeline({ defaults: { force3D: true, autoRound: false } });
        // Don't replay off-screen entrance effects when reloading further down.
        if (element.getBoundingClientRect().bottom > 0 && window.scrollY < 100) {
          entrance.from(element.querySelectorAll('[data-alp-hero-entrance]'), {
            y: motion.entrance.y, opacity: 0, duration: motion.entrance.duration,
            stagger: motion.entrance.stagger, ease: motion.entrance.ease, clearProps: 'transform,opacity',
          }, 0).from('.alp_sun-orbit-entrance', {
            scale: motion.sun.scale, rotation: motion.sun.rotation, opacity: 0,
            duration: motion.sun.duration, ease: 'power2.out', clearProps: 'transform,opacity',
          }, motion.sun.delay).from('.alp_sun-app-entrance', {
            y: motion.app.y, scale: motion.app.scale, opacity: 0,
            duration: motion.app.duration, ease: motion.entrance.ease, clearProps: 'transform,opacity',
          }, motion.app.delay);
        }
        const stage = element.querySelector<HTMLElement>('.alp_sun-stage')!;
        // No pinning or wheel/touch interception; compact screens skip parallax.
        const desktop = gsap.matchMedia();
        desktop.add('(min-width: 768px)', () => {
          // Start at page scroll zero, so the header's height isn't a dead zone.
          const hero = element.closest<HTMLElement>('.alp_sun-hero')!;
          const scrollDistance = () => Math.max(1, hero.offsetHeight) * motion.scroll.distanceRatio;
          // Reference motion is relative to the document, with no sticky-copy
          // compensation. Text, sun and app share the same reversible progress.
          // Keep the same compositing layer through starts, stops and reversals.
          // Fractional translations must stay fractional during small wheel steps.
          const timeline = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'none', force3D: true, autoRound: false } })
            .fromTo('.alp_saas-copy', { y: 0, opacity: 1 }, { y: motion.scroll.copyY, opacity: 0 }, 0)
            .fromTo('.alp_sun-orbit', { y: 0, rotation: 0 }, { y: motion.scroll.orbitY, rotation: motion.scroll.orbitRotation }, 0)
            .fromTo('.alp_sun-app', { y: motion.scroll.appStartY }, { y: motion.scroll.appY }, 0)
            .fromTo('.alp_sun-app', { scale: 1 }, { scale: motion.scroll.appScale, ease: 'sine.inOut', duration: 1 - motion.scroll.appScaleStart }, motion.scroll.appScaleStart)
            .fromTo('.alp_sun-app-fade', { y: 30 }, { y: -40 }, 0);
          let current = 0;
          let target = 0;
          let ticking = false;
          // Match the reference's damping at any refresh rate. The ticker runs
          // only while motion is settling, avoiding an idle animation loop.
          const tick = (_time: number, deltaMs: number) => {
            // A delayed frame should not jump the composition straight to target.
            const frameMs = Math.min(Math.max(deltaMs, 0), 50);
            const blend = 1 - Math.pow(motion.scroll.smoothing, frameMs / (1000 / 60));
            current += (target - current) * blend;
            if (Math.abs(target - current) < .00001) {
              current = target;
              gsap.ticker.remove(tick);
              ticking = false;
            }
            timeline.progress(current);
          };
          const follow = (progress: number) => {
            target = progress;
            if (!ticking && Math.abs(target - current) >= .00001) {
              ticking = true;
              gsap.ticker.add(tick);
            }
          };
          const trigger = ScrollTrigger.create({ trigger: hero, start: motion.scroll.start, end: scrollDistance,
            invalidateOnRefresh: true, onUpdate: self => follow(self.progress), onRefresh: self => follow(self.progress) });
          current = target = trigger.progress;
          timeline.progress(current);
          return () => { gsap.ticker.remove(tick); trigger.kill(); timeline.kill(); };
        }, element);
        gsap.to('.alp_sun-app-fade', { opacity: 0, ease: 'none',
          scrollTrigger: { trigger: stage, start: 'top 65%', end: 'top 5%', scrub: motion.scroll.scrub } });
        return () => { entrance.kill(); desktop.revert(); };
      }, element);
      ScrollTrigger.refresh();
    }
    void initialize().catch(() => cleanup());
    return () => { disposed = true; controller.abort(); cleanup(); };
  }, []);
  return <div className="alp_sun-motion" ref={root}>{children}</div>;
}
