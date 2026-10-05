"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { SplitText as SplitTextInstance } from "gsap/SplitText";
import { landingMotion as motion } from "@/config/motion";
import { waitForPageReveal } from '@/lib/page-reveal';

/** Content remains readable before JavaScript loads and when motion is disabled. */
export function LandingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const controller = new AbortController();

    async function initialize() {
      const [{ gsap }, { SplitText }] = await Promise.all([import("gsap"), import("gsap/SplitText")]);
      await document.fonts.ready;
      if (root.current) await waitForPageReveal(root.current, controller.signal);
      if (disposed || !root.current) return;
      gsap.registerPlugin(SplitText);
      const media = gsap.matchMedia();
      cleanup = () => media.revert();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const splits: SplitTextInstance[] = [];
        const animations = new Map<Element, ReturnType<typeof gsap.from>>();
        const revealed = new Set<Element>();
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            revealed.add(entry.target);
            animations.get(entry.target)?.play();
            observer.unobserve(entry.target);
          });
        }, { threshold: motion.viewportThreshold, rootMargin: motion.viewportMargin });

        root.current?.querySelectorAll<HTMLElement>("[data-alp-motion]").forEach(element => {
          const kind = element.dataset.alpMotion;
          if (kind === "heading" || kind === "text") {
            const heading = kind === "heading";
            const split = SplitText.create(element, {
              type: heading ? "words,chars" : "lines", tag: "span", aria: "auto",
              mask: heading ? "words" : "lines", autoSplit: !heading,
              linesClass: "alp_split-line",
              wordsClass: "alp_split-word", charsClass: "alp_split-char",
              onSplit(self) {
                const animation = gsap.from(heading ? self.chars : self.lines, {
                  paused: !revealed.has(element), opacity: 0,
                  ...(heading ? { x: motion.heading.x, yPercent: motion.heading.yPercent, rotation: motion.heading.rotation } : { yPercent: motion.text.yPercent }),
                  duration: heading ? motion.heading.duration : motion.text.duration,
                  stagger: heading ? { amount: motion.heading.stagger } : motion.text.stagger,
                  ease: motion.ease, clearProps: "transform,opacity",
                  // Mask only during the entrance; settled glyphs must not clip.
                  onComplete: () => { if (heading) gsap.set(self.masks, { overflow: "visible" }); },
                });
                animations.set(element, animation);
                // Responsive line re-splitting must not hide text already revealed.
                if (revealed.has(element)) animation.progress(1);
                return animation;
              },
            });
            splits.push(split);
          } else {
            const line = kind === "line";
            animations.set(element, gsap.from(element, {
              paused: true, opacity: line ? 1 : 0, y: line ? 0 : motion.reveal.y,
              scale: kind === "visual" ? motion.reveal.scale : 1,
              ...(line ? { scaleY: 0, transformOrigin: "top center" } : {}),
              duration: line ? motion.reveal.lineDuration : motion.reveal.duration,
              delay: Number(element.dataset.alpDelay ?? 0), ease: motion.ease,
              clearProps: "transform,opacity",
            }));
          }
          observer.observe(element);
        });
        return () => { observer.disconnect(); splits.forEach(split => split.revert()); };
      }, root);
    }

    void initialize().catch(() => cleanup());
    return () => { disposed = true; controller.abort(); cleanup(); };
  }, []);

  return <div className="alp_motion-root" ref={root}>{children}</div>;
}
