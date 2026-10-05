import Image from "next/image";
import { ArrowUpRight, ArrowRight, Bell, Check, ChevronDown, LayoutDashboard, Layers, Settings2, ShoppingBag, Users, Zap } from "lucide-react";
import type { LandingConfig } from "@/config/landing";
import { BrandStar } from "./BrandStar";

// These are clearly labelled interface concepts, not client work or agency results.
// Kept server-rendered: the illustration does not ship dashboard JavaScript.
export function ProjectShowcase({ config }: { config: LandingConfig["showcase"] }) {
  const dashboard = config.dashboard;
  return (
    <figure className="alp_showcase alp_reveal" aria-label="Illustrative desktop and mobile interface concepts">
      <div className="alp_showcase-heading"><span className="alp_tiny-cross">+</span>{config.label}<span className="alp_showcase-index">01 / 01</span></div>
      <div className="alp_showcase-stage">
        <div className="alp_orbit-ring" aria-hidden="true" />
        <BrandStar className="alp_showcase-star" />
        <div className="alp_browser" aria-hidden="true">
          <div className="alp_browser-chrome"><span className="alp_browser-dots"><i /><i /><i /></span><span className="alp_browser-address">{dashboard.name}.app / overview</span><ArrowUpRight /></div>
          <div className="alp_dashboard">
            <div className="alp_dashboard-sidebar"><span className="alp_orbit-logo">o<span /></span><LayoutDashboard /><Layers /><Users /><Settings2 /><span className="alp_sidebar-bottom">a.</span></div>
            <div className="alp_dashboard-main">
              <div className="alp_dashboard-top"><span className="alp_dashboard-brand">{dashboard.name}<span>®</span></span><span className="alp_dashboard-tools"><Bell /><span>JD</span></span></div>
              <div className="alp_dashboard-title"><div><p>{dashboard.greeting}</p><h2>{dashboard.title}</h2></div><span className="alp_period">{dashboard.period}<ChevronDown /></span></div>
              <div className="alp_metrics">{dashboard.metrics.map((metric) => <div className="alp_metric" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small><ArrowUpRight />{metric.trend}<span> vs last month</span></small></div>)}</div>
              <div className="alp_chart"><div className="alp_chart-heading"><span>{dashboard.chartLabel}<strong>{dashboard.chartValue}</strong></span><span className="alp_chart-key"><i />Revenue</span></div>
                <div className="alp_chart-plot"><div className="alp_chart-axis"><span>50k</span><span>25k</span><span>0</span></div><svg className="alp_chart-svg" viewBox="0 0 400 130" preserveAspectRatio="none"><defs><linearGradient id="alp_chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--alp_color-accent)" stopOpacity="0.24" /><stop offset="100%" stopColor="var(--alp_color-accent)" stopOpacity="0" /></linearGradient></defs><path d="M0 110H400M0 65H400M0 20H400" stroke="#ffffff0c" strokeDasharray="3 5" /><path d="M0 106C20 105 24 80 45 85S76 116 95 82S122 106 145 72S173 78 190 59S210 85 237 52S255 58 280 33S300 56 320 28S350 50 365 21S386 28 400 7V130H0Z" fill="url(#alp_chart-fill)" /><path d="M0 106C20 105 24 80 45 85S76 116 95 82S122 106 145 72S173 78 190 59S210 85 237 52S255 58 280 33S300 56 320 28S350 50 365 21S386 28 400 7" stroke="var(--alp_color-accent)" strokeWidth="2.5" fill="none" /></svg></div><div className="alp_chart-months"><span>01 Jun</span><span>07 Jun</span><span>14 Jun</span><span>21 Jun</span><span>30 Jun</span></div>
              </div>
              <div className="alp_dashboard-bottom"><span className="alp_integration-icon"><Zap /></span><span><strong>{dashboard.activity}</strong><small>{dashboard.activityDetail}</small></span><ArrowUpRight /></div>
            </div>
          </div>
        </div>
        <div className="alp_phone" aria-hidden="true"><div className="alp_phone-speaker" /><div className="alp_phone-nav"><strong>{config.mobile.name}</strong><ShoppingBag /></div><div className="alp_phone-photo"><Image src={config.mobile.image} alt="" fill sizes="(max-width: 767px) 120px, 180px" priority /><div className="alp_phone-photo-copy"><span>THE NEW PERSPECTIVE</span><strong>{config.mobile.title}</strong></div></div><div className="alp_phone-bottom"><span>{config.mobile.collection}</span><ArrowRight /><div className="alp_phone-swatches"><i /><i /><i /><span>Thoughtfully designed.</span></div></div><div className="alp_phone-home" /></div>
        <div className="alp_build-note"><span className="alp_build-note-icon"><Check /></span><span>Good design.<br /><strong>Better business.</strong></span></div>
      </div>
      <figcaption className="alp_showcase-caption"><span>{config.caption}</span><span className="alp_showcase-devices">DESKTOP <span>↗</span> MOBILE</span></figcaption>
    </figure>
  );
}
