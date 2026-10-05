"use client";

import { useEffect } from 'react';
import { smoothScroll } from '@/config/motion';

/** Native document scrolling, synchronized with the existing GSAP animation loop. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let generation = 0;
    let cleanup = () => {};

    async function initialize() {
      const current = ++generation;
      cleanup();
      cleanup = () => {};
      if (reduced.matches) return;
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'), import('gsap'), import('gsap/ScrollTrigger'),
        ]);
        if (disposed || current !== generation || reduced.matches) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
          // Use a single duration/easing curve rather than interpolation damping.
          lerp: 0,
          duration: smoothScroll.duration,
          easing: smoothScroll.easing,
          wheelMultiplier: smoothScroll.wheelMultiplier,
          smoothWheel: true,
          syncTouch: false,
          virtualScroll: () => !document.documentElement.hasAttribute('data-alp-scroll-lock') && !document.documentElement.classList.contains('alp_loading'),
          anchors: { offset: smoothScroll.anchorOffset },
          prevent: node => node instanceof HTMLElement && (
            node.matches('dialog[open], textarea, select, [data-alp-native-scroll]') ||
            (node.matches('.alp_demo-main, .alp_demo-activities') && node.scrollHeight > node.clientHeight + 1)
          ),
        });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        // Update scroll position before GSAP renders dependent hero transforms.
        gsap.ticker.add(tick, false, true);
        gsap.ticker.lagSmoothing(0);
        document.documentElement.classList.add('alp_smooth-scroll');
        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.off('scroll', ScrollTrigger.update);
          lenis.destroy();
          document.documentElement.classList.remove('alp_smooth-scroll');
        };
      } catch {
        cleanup(); // Native wheel and CSS anchor scrolling remain available.
      }
    }
    const onPreferenceChange = () => { void initialize(); };
    void initialize();
    reduced.addEventListener('change', onPreferenceChange);
    return () => { disposed = true; generation++; reduced.removeEventListener('change', onPreferenceChange); cleanup(); };
  }, []);
  return null;
}
