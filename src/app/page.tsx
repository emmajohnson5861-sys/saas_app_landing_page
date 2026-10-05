import { SaaSLandingPage } from "@/components/SaaSLandingPage";
import { saasLandingConfig } from "@/config/saas";

export default function HomePage() {
  return <SaaSLandingPage config={saasLandingConfig} />;
}
