"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, MessageCircle, Workflow } from 'lucide-react';
import { clientStories as content } from '@/config/ending';
import { SectionEyebrow } from './SectionEyebrow';

export function SaaSClients() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const activeIndex = useRef(0);
  const requestedIndex = useRef(0);
  const transition = useRef<((next: number) => void) | null>(null);
  const changeSlide = (next: number) => {
    const wrapped = (next % content.items.length + content.items.length) % content.items.length;
    requestedIndex.current = wrapped;
    if (transition.current) transition.current(wrapped);
    else { activeIndex.current = wrapped; setActive(wrapped); }
  };

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    async function initialize() {
      const [{ gsap }, { SplitText }] = await Promise.all([import('gsap'), import('gsap/SplitText')]);
      await document.fonts.ready;
      if (disposed || !root.current) return;
      gsap.registerPlugin(SplitText);
      const slides = [...root.current.querySelectorAll<HTMLElement>('.alp_client-story')];
      const owners = [...root.current.querySelectorAll<HTMLElement>('.alp_client-attribution')];
      let animation: ReturnType<typeof gsap.timeline> | null = null;
      const splits = slides.map(slide => SplitText.create(slide.querySelector('blockquote')!, {
        type: 'lines,chars', mask: 'lines', autoSplit: true,
        linesClass: 'alp_review-line', charsClass: 'alp_review-char',
        // Finish an in-flight swipe before responsive line wrapping changes.
        onSplit: () => { animation?.progress(1); },
      }));
      let locked = false;
      let queued: number | null = null;
      transition.current = next => {
        if (locked) { queued = next; return; }
        if (next === activeIndex.current) return;
        const previous = activeIndex.current;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          activeIndex.current = next;
          setActive(next);
          return;
        }
        locked = true;
        // Allow every outgoing line to finish, including narrow-screen wrapping.
        const swapAt = Math.max(content.motion.swapAt, content.motion.exitDuration + Math.max(0, splits[previous].lines.length - 1) * content.motion.lineStagger + .04);
        animation = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => {
          // React owns slide visibility; discard temporary animation styles.
          gsap.set([...splits[previous].lines, ...splits[next].lines], { clearProps: 'transform,opacity' });
          gsap.set([owners[previous], owners[next]], { clearProps: 'transform,opacity,visibility' });
          gsap.set([slides[previous], slides[next]], { clearProps: 'visibility' });
          locked = false;
          const pending = queued;
          queued = null;
          if (pending !== null && pending !== activeIndex.current) transition.current?.(pending);
        } });
        animation.to(splits[previous].lines, { yPercent: -110, opacity: 0, duration: content.motion.exitDuration, stagger: content.motion.lineStagger }, 0)
          .to(owners[previous], { yPercent: -110, opacity: 0, duration: content.motion.ownerExitDuration }, 0)
          .call(() => { activeIndex.current = next; setActive(next); }, [], swapAt)
          .set([slides[previous], owners[previous]], { visibility: 'hidden' }, swapAt)
          .set([slides[next], owners[next]], { visibility: 'visible' }, swapAt)
          .fromTo(splits[next].lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: content.motion.enterDuration, stagger: content.motion.lineStagger, ease: 'power3.out' }, swapAt)
          .fromTo(owners[next], { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: content.motion.ownerDuration, ease: 'power3.out' }, swapAt);
      };
      cleanup = () => { transition.current = null; animation?.kill(); splits.forEach(split => split.revert()); };
    }
    void initialize().catch(() => cleanup());
    return () => { disposed = true; cleanup(); };
  }, []);

  return <section className="alp_clients" id="alp_clients" aria-labelledby="alp_clients-title" ref={root}>
    <h2 id="alp_clients-title" className="alp_sr-only">What our clients say</h2>
    <div className="alp_container"><div className="alp_intro-inner alp_clients-layout">
      <aside className="alp_clients-aside">
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <p className="alp_clients-description" data-alp-motion="text">{content.description}</p>
        <div className="alp_clients-strengths" data-alp-motion="reveal">
          {content.strengths.map((item, index) => { const Icon = index === 0 ? MessageCircle : Workflow; return <div className="alp_clients-strength" key={item.title}><Icon aria-hidden="true"/><span><strong>{item.title}</strong><span>{item.detail}</span></span></div>; })}
        </div>
      </aside>
      <div className="alp_clients-carousel" role="region" aria-roledescription="carousel" aria-label="Client feedback" data-alp-motion="reveal" onKeyDown={event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); changeSlide(requestedIndex.current - 1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); changeSlide(requestedIndex.current + 1); }
      }}>
        <span className="alp_clients-quote-mark" aria-hidden="true">”</span>
        <div className="alp_clients-slides">
          {content.items.map((item, index) => <figure className="alp_client-story" key={item.name} data-active={index === active} aria-hidden={index !== active} inert={index !== active} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${content.items.length}: ${item.name}, ${item.company}`}>
            <blockquote cite={content.source}>{item.summary}</blockquote>
          </figure>)}
        </div>
        <div className="alp_clients-controls">
          <div className="alp_client-owners">{content.items.map((item, index) => <div className="alp_client-attribution" key={item.name} data-active={index === active} aria-hidden={index !== active} inert={index !== active}><span className="alp_client-avatar" aria-hidden="true">{item.initials}</span><span><strong className="alp_client-owner-name">{item.name}</strong><span className="alp_client-owner-role">{item.role} · {item.company}</span><span className="alp_clients-feedback-label">Client feedback · Summary</span></span></div>)}</div>
          <div className="alp_clients-navigation">
            <button type="button" className="alp_clients-arrow" aria-label="Previous client story" onClick={() => changeSlide(requestedIndex.current - 1)}><ArrowLeft aria-hidden="true"/></button>
            <span className="alp_clients-count" aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(content.items.length).padStart(2, '0')}</span>
            <button type="button" className="alp_clients-arrow" aria-label="Next client story" onClick={() => changeSlide(requestedIndex.current + 1)}><ArrowRight aria-hidden="true"/></button>
          </div>
        </div>
        <p className="alp_sr-only" aria-live="polite" aria-atomic="true">Story {active + 1} of {content.items.length}: {content.items[active].name}, {content.items[active].company}</p>
      </div>
    </div></div>
  </section>;
}
