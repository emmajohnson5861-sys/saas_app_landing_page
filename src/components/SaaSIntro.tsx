import { ArrowRight, Box, Layers3, Users } from "lucide-react";
import type { SaaSLandingConfig } from "@/config/saas";
import { AnimatedButtonContent } from "./AnimatedButtonContent";
import { SectionEyebrow } from "./SectionEyebrow";

const layerIcons = [Users, Box, Layers3];

export function SaaSIntro({ content }: { content: SaaSLandingConfig["intro"] }) {
  return <section className="alp_intro" aria-labelledby="alp_intro-title" id="alp_intro">
    <svg className="alp_intro-curve" viewBox="0 0 400 320" fill="none" aria-hidden="true" data-alp-motion="line"><path d="M-80 5C138 38 266 174 295 340" /></svg>
    <div className="alp_container"><div className="alp_intro-inner"><div className="alp_intro-grid">
      <div className="alp_intro-copy">
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 id="alp_intro-title" data-alp-motion="heading">{content.title}{" "}<span className="alp_intro-title-accent">{content.titleAccent}</span></h2>
        <p className="alp_intro-description" data-alp-motion="text">{content.description}</p>
        <div className="alp_intro-cta" data-alp-motion="reveal"><a href={content.cta.href} className="alp_button alp_button-3d alp_button-white"><AnimatedButtonContent label={content.cta.label} /></a></div>
      </div>
      <figure className="alp_blueprint" data-alp-motion="visual" aria-labelledby="alp_blueprint-title">
        <div className="alp_blueprint-heading"><p>{content.blueprint.label}</p><h3 id="alp_blueprint-title" data-alp-motion="heading">{content.blueprint.title}</h3></div>
        <ol className="alp_blueprint-layers">{content.blueprint.layers.map((layer, index) => {
          const Icon = layerIcons[index % layerIcons.length];
          return <li className="alp_blueprint-layer" data-alp-motion="reveal" data-alp-delay={index * 0.12} key={layer.label}>
            <span className="alp_blueprint-node" aria-hidden="true"><Icon /></span>
            <div className="alp_blueprint-layer-body"><span className="alp_blueprint-layer-label">{layer.label}</span><h4>{layer.title}</h4><ul>{layer.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul></div>
            {index < content.blueprint.layers.length - 1 && <span className="alp_blueprint-connector" data-alp-motion="line" aria-hidden="true" />}
          </li>;
        })}</ol>
        <div className="alp_blueprint-footer"><span aria-hidden="true" /><i aria-hidden="true" />{content.blueprint.footer}<ArrowRight aria-hidden="true" /></div>
      </figure>
    </div></div></div>
  </section>;
}

