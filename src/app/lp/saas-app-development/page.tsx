import type { Metadata } from "next";
import { SaaSLandingPage } from "@/components/SaaSLandingPage";
import { saasLandingConfig } from "@/config/saas";

export const metadata: Metadata = {
  ...saasLandingConfig.metadata,
  openGraph: { ...saasLandingConfig.metadata, type: "website", siteName: "Algofort" },
  twitter: { card: "summary", ...saasLandingConfig.metadata },
};

export default function SaaSDevelopmentPage() {
  return <SaaSLandingPage config={saasLandingConfig} />;
}
