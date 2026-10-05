"use client";

import type { CSSProperties } from 'react';

export type TwistingLoaderBarProps = {
  text?: string;
  sliceCount?: number;
  /** Duration of each slice's full rotation, in seconds. */
  speed?: number;
  /** Maximum width and proportional height, in pixels. */
  width?: number;
  height?: number;
};

const styles = `
.alp_twist-loader{position:relative;width:100%;max-width:var(--alp_twist-width);aspect-ratio:var(--alp_twist-aspect);container-type:inline-size;isolation:isolate}
.alp_twist-scene{position:absolute;inset:0;perspective:1200px;perspective-origin:50% 40%;--alp_twist-bar-width:100cqw;--alp_twist-face-height:calc(100cqw * var(--alp_twist-ratio));--alp_twist-slice-width:calc(var(--alp_twist-bar-width) / var(--alp_twist-count))}
.alp_twist-slices{display:flex;width:100%;height:100%;transform-style:preserve-3d}
.alp_twist-slice{position:relative;flex:0 0 calc(100% / var(--alp_twist-count));height:100%;transform-style:preserve-3d;will-change:transform;animation:alp_twist-wave var(--alp_twist-speed) cubic-bezier(.65,0,.35,1) infinite;animation-delay:calc(var(--alp_twist-index) * .035s)}
.alp_twist-face{position:absolute;inset:0 auto auto 0;width:calc(var(--alp_twist-slice-width) + .5px);height:100%;overflow:hidden;backface-visibility:hidden;background:#fff;color:#000;border-block:var(--alp_twist-stroke) solid #000;box-sizing:border-box;transform:rotateX(var(--alp_twist-turn)) translateZ(calc(var(--alp_twist-face-height) / 2))}
.alp_twist-slice:first-child .alp_twist-face{border-left:var(--alp_twist-stroke) solid #000}
.alp_twist-slice:last-child .alp_twist-face{border-right:var(--alp_twist-stroke) solid #000}
.alp_twist-text{position:absolute;left:calc(-1 * var(--alp_twist-index) * var(--alp_twist-slice-width));top:calc(-1 * var(--alp_twist-stroke));width:var(--alp_twist-bar-width);height:var(--alp_twist-face-height);display:flex;align-items:center;justify-content:center;white-space:nowrap;font-family:'Arial Black',Impact,Arial,sans-serif;font-weight:900;font-size:calc(var(--alp_twist-face-height) * .31);letter-spacing:.35em;line-height:1;box-sizing:border-box;padding-left:.35em}
.alp_twist-slice:first-child .alp_twist-text{margin-left:calc(-1 * var(--alp_twist-stroke))}
@keyframes alp_twist-wave{from{transform:rotateX(0deg)}to{transform:rotateX(-360deg)}}
@media(prefers-reduced-motion:reduce){.alp_twist-slice{animation:none;will-change:auto;transform:none}.alp_twist-face:not(:first-child){display:none}}
`;

/** Standalone React + CSS prism. No images, animation packages or WebGL. */
export function TwistingLoaderBar({ text = 'L O A D I N G', sliceCount = 40, speed = 1.2, width = 600, height = 140 }: TwistingLoaderBarProps) {
  const count = Math.min(50, Math.max(30, Math.round(Number.isFinite(sliceCount) ? sliceCount : 40)));
  const barWidth = Number.isFinite(width) && width > 0 ? width : 600;
  const barHeight = Number.isFinite(height) && height > 0 ? height : 140;
  const duration = Number.isFinite(speed) && speed > 0 ? speed : 1.2;
  const properties = {
    '--alp_twist-width': `${barWidth}px`,
    '--alp_twist-aspect': `${barWidth} / ${barHeight}`,
    '--alp_twist-ratio': barHeight / barWidth,
    '--alp_twist-count': count,
    '--alp_twist-speed': `${duration}s`,
    '--alp_twist-stroke': 'clamp(3px, 1.5cqw, 10px)',
  } as CSSProperties;

  return <div className="alp_twist-loader" style={properties} role="img" aria-label={text.replace(/\s+/g, '')}>
    <style>{styles}</style>
    <div className="alp_twist-scene" aria-hidden="true"><div className="alp_twist-slices">
      {Array.from({ length: count }, (_, index) => <div className="alp_twist-slice" key={index} style={{ '--alp_twist-index': index } as CSSProperties}>
        {[0, 90, 180, 270].map(angle => <div className="alp_twist-face" key={angle} style={{ '--alp_twist-turn': `${angle}deg` } as CSSProperties}><span className="alp_twist-text">{text}</span></div>)}
      </div>)}
    </div></div>
  </div>;
}
