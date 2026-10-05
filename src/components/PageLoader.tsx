"use client";

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { pageLoader as config } from '@/config/loader';
import type { SaaSLandingConfig } from '@/config/saas';
import { TwistingLoaderBar } from './TwistingLoaderBar';

const reels = [Array.from({ length: 2 }, (_, index) => index), Array.from({ length: 11 }, (_, index) => index % 10), Array.from({ length: 101 }, (_, index) => index % 10)];

/** Native CSS loader and logo handoff. Progress tracks critical readiness only. */
export function PageLoader({ brand, children }: { brand: SaaSLandingConfig['brand']; children: ReactNode }) {
  const [complete, setComplete] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = root.current!;
    const content = page.current!;
    const controller = new AbortController();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let disposed = false;
    let released = false;
    let frame = 0;
    let exitFrame = 0;
    let leaving = false;
    let value = 0;
    let target = 0;
    let from = 0;
    let started = 0;
    const digits = [...counter.current!.querySelectorAll<HTMLElement>('.alp_loader-reel')];
    const bar = overlay.current!.querySelector<HTMLElement>('.alp_loader-progress-fill')!;
    const html = document.documentElement;
    html.classList.add('alp_loading');
    content.inert = true;

    const reveal = () => {
      if (released) return;
      released = true;
      shell.dataset.alpLoadState = 'ready';
      shell.dispatchEvent(new Event('alp:page-reveal'));
    };
    const finish = () => {
      if (disposed || controller.signal.aborted) return;
      reveal();
      content.inert = false;
      html.classList.remove('alp_loading');
      cancelAnimationFrame(frame);
      cancelAnimationFrame(exitFrame);
      timers.forEach(clearTimeout);
      resize.disconnect();
      controller.abort();
      setComplete(true);
    };
    const render = () => {
      const digitHeight = digits[0].firstElementChild!.getBoundingClientRect().height;
      const positions = [Math.floor(value / 100) + Math.max(0, value % 100 - 99), Math.floor(value / 10) + Math.max(0, value % 10 - 9), value];
      positions.forEach((position, index) => { digits[index].style.transform = `translate3d(0,${-position * digitHeight}px,0)`; });
      counter.current?.setAttribute('aria-valuenow', String(Math.floor(value)));
      bar.style.transform = `scaleX(${value / 100})`;
    };
    const resize = new ResizeObserver(render);
    resize.observe(counter.current!);
    timers.push(setTimeout(finish, config.maxWaitMs));

    const settle = () => {
      if (leaving || controller.signal.aborted) return;
      leaving = true;
      if (reduced) { finish(); return; }
      timers.push(setTimeout(() => {
        const mark = logo.current!;
        const fromRect = mark.getBoundingClientRect();
        const toRect = content.querySelector<HTMLElement>('.alp_header .alp_logo')?.getBoundingClientRect();
        mark.style.left = '0';
        mark.style.top = '0';
        mark.style.width = `${fromRect.width}px`;
        mark.style.transform = `translate3d(${fromRect.left}px,${fromRect.top}px,0)`;
        // Commit the starting rectangle before applying the CSS transition.
        mark.getBoundingClientRect();
        exitFrame = requestAnimationFrame(() => {
          overlay.current!.dataset.leaving = 'true';
          mark.style.transition = `transform ${config.logoDuration}s cubic-bezier(.76,0,.24,1), opacity .5s ease`;
          if (toRect && toRect.bottom > 0) mark.style.transform = `translate3d(${toRect.left}px,${toRect.top}px,0) scale(${toRect.width / fromRect.width})`;
          else mark.style.opacity = '0';
          timers.push(setTimeout(reveal, 200));
          timers.push(setTimeout(finish, config.logoDuration * 1000 + 80));
        });
      }, config.completeHold * 1000));
    };
    const tick = (time: number) => {
      if (disposed || controller.signal.aborted) return;
      if (!started) started = time;
      const duration = target === 100 ? config.progressDuration : config.checkpointDuration;
      const progress = reduced ? 1 : Math.min(1, (time - started) / (duration * 1000));
      const eased = progress * progress * (3 - 2 * progress);
      value = from + (target - from) * eased;
      render();
      if (progress < 1) frame = requestAnimationFrame(tick);
      else if (target === 100) settle();
    };
    const update = (weight: number) => {
      if (disposed || controller.signal.aborted) return;
      cancelAnimationFrame(frame);
      from = value;
      target = Math.min(100, target + weight);
      started = 0;
      frame = requestAnimationFrame(tick);
    };
    const ready = (promise: Promise<unknown>, weight: number) => { void promise.catch(() => {}).then(() => update(weight)); };
    ready(document.fonts.ready, config.weights.fonts);
    ready(document.readyState === 'complete' ? Promise.resolve() : new Promise<void>(resolve => window.addEventListener('load', () => resolve(), { once: true, signal: controller.signal })), config.weights.document);
    const image = logo.current!.querySelector('img')!;
    ready(image.complete ? image.decode() : new Promise<void>(resolve => {
      image.addEventListener('load', () => resolve(), { once: true, signal: controller.signal });
      image.addEventListener('error', () => resolve(), { once: true, signal: controller.signal });
    }), config.weights.logo);

    return () => {
      disposed = true;
      controller.abort();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(exitFrame);
      timers.forEach(clearTimeout);
      resize.disconnect();
      content.inert = false;
      html.classList.remove('alp_loading');
    };
  }, []);

  return <div className="alp_loading-shell" ref={root} data-alp-load-state={complete ? 'ready' : 'loading'}>
    {!complete && <div className="alp_page-loader" ref={overlay}>
      <div className="alp_loader-backdrop" aria-hidden="true" />
      <div className="alp_loader-meta" aria-hidden="true"><span>ALGOFORT / PRODUCT STUDIO</span><span>{config.chapter}</span></div>
      <div className="alp_loader-logo" ref={logo} aria-hidden="true"><Image src={brand.logo} alt="" width={600} height={96} priority /></div>
      <div className="alp_loader-center"><TwistingLoaderBar {...config.bar} /></div>
      <p className="alp_loader-tagline" aria-hidden="true">{config.tagline}</p>
      <div className="alp_loader-bottom">
        <span className="alp_loader-caption">{config.label}</span>
        <div className="alp_loader-counter" ref={counter} role="progressbar" aria-label="Loading Algofort" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
          <span className="alp_loader-digits" aria-hidden="true">{reels.map((values, index) => <span className="alp_loader-digit" key={index}><span className="alp_loader-reel">{values.map((digit, position) => <span key={position}>{digit}</span>)}</span></span>)}</span><span className="alp_loader-percent" aria-hidden="true">%</span>
        </div>
        <div className="alp_loader-progress" aria-hidden="true"><span className="alp_loader-progress-fill" /></div>
      </div>
    </div>}
    <div className="alp_page-content" ref={page}>{children}</div>
    <noscript><style>{'.alp_page-loader{display:none!important}'}</style></noscript>
  </div>;
}
