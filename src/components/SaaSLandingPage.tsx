import { LandingHeader } from "./LandingHeader";
import { SaaSHero } from "./SaaSHero";
import { SaaSIntro } from "./SaaSIntro";
import { SaaSCapabilities } from "./SaaSCapabilities";
import { SaaSProductExperience } from "./SaaSProductExperience";
import { SaaSPortfolio } from './SaaSPortfolio';
import { SaaSClients } from './SaaSClients';
import { SaaSFooter } from './SaaSFooter';
import { LandingMotion } from "./LandingMotion";
import type { SaaSLandingConfig } from "@/config/saas";
import { capabilities } from "@/config/capabilities";
import { PageLoader } from './PageLoader';
import { pageLoader } from '@/config/loader';
import { EntrancePopup } from './EntrancePopup';

export function SaaSLandingPage({ config }: { config: SaaSLandingConfig }) {
  const content = <div className="alp_saas-page" id="alp_page-top"><LandingHeader config={config} variant="saas" /><main id="alp_main"><LandingMotion><SaaSHero config={config} /><SaaSIntro content={config.intro} />{capabilities.visible && <SaaSCapabilities />}<SaaSProductExperience config={config} /><SaaSPortfolio config={config} /><SaaSClients /></LandingMotion></main><SaaSFooter config={config} /><EntrancePopup /></div>;
  return pageLoader.enabled ? <PageLoader brand={config.brand}>{content}</PageLoader> : content;
}
