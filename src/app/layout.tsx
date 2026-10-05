import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { saasLandingConfig } from "@/config/saas";
import { SmoothScroll } from '@/components/SmoothScroll';
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--alp_font-sans", display: "swap" });
const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--alp_font-display", display: "swap" });

export const metadata: Metadata = {
  ...saasLandingConfig.metadata,
  icons: { icon: "/brand/favicon.png" },
  openGraph: { ...saasLandingConfig.metadata, type: "website", siteName: "Algofort" },
  twitter: { card: "summary", ...saasLandingConfig.metadata },
  // Keep the approval-stage preview out of search results; change at launch.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${display.variable}`}><body className="alp_body"><SmoothScroll /><a className="alp_skip-link" href="#alp_main">Skip to content</a>{children}</body></html>;
}
