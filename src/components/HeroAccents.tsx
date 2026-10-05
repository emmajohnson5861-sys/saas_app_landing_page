import type { SaaSLandingConfig } from '@/config/saas';

const iconPaths = {
  design: 'M5 19L6.5 13.5L16 4L20 8L10.5 17.5L5 19ZM14 6L18 10',
  code: 'M8 7L3 12L8 17M16 7L21 12L16 17M14 4L10 20',
  cloud: 'M7 18H18A4 4 0 0 0 18 10H17A6 6 0 0 0 5.5 8.5A4.8 4.8 0 0 0 7 18Z',
};

/** The product journey belongs to the copy, sharing its entrance and scroll fade. */
export function HeroAccents({ steps }: { steps: SaaSLandingConfig['hero']['journey'] }) {
  return <ol className="alp_hero-flow" aria-label="From idea to launch" data-alp-hero-entrance>
    {steps.map((step, index) => <li className="alp_hero-flow-step" key={step.label}>
      <span className="alp_hero-flow-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d={iconPaths[step.icon]}/></svg></span>
      <span>{step.label}</span>
      {index < steps.length - 1 && <svg className="alp_hero-flow-connector" viewBox="0 0 48 8" fill="none" aria-hidden="true" focusable="false"><path className="alp_hero-flow-line" pathLength="1" d="M1 4H44"/><path className="alp_hero-flow-arrow" d="M40 1L44 4L40 7"/></svg>}
    </li>)}
  </ol>;
}
