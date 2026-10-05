"use client";

import Image from "next/image";
import { AnimatedButtonContent } from "./AnimatedButtonContent";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LandingConfig, LandingLink } from "@/config/landing";

type HeaderConfig = Pick<LandingConfig, "brand" | "navigation" | "primaryCta"> & { secondaryHeaderCta?: LandingLink };

export function LandingHeader({ config, variant = "default" }: { config: HeaderConfig; variant?: "default" | "saas" }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsOpen(false); menuButton.current?.focus(); }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setIsOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen]);

  return (
    <header ref={header} className={`alp_header ${variant === "saas" ? "alp_saas-header" : ""}`}>
      <div className="alp_container alp_header-inner">
        <a href={config.brand.home} className="alp_logo" aria-label={`${config.brand.name} home`}>
          <Image src={config.brand.logo} alt={config.brand.name} width={168} height={27} priority />
        </a>
        <nav className="alp_nav" aria-label="Main navigation">
          {config.navigation.map((link) => <a key={link.label} href={link.href} className="alp_nav-link" data-active={link.label === "Home" ? true : undefined}>{link.label}</a>)}
        </nav>
        <div className="alp_header-actions">
          {config.secondaryHeaderCta && <a href={config.secondaryHeaderCta.href} className="alp_button alp_button-raised alp_button-white alp_header-secondary">{config.secondaryHeaderCta.label}</a>}
          <a href={config.primaryCta.href} className={`alp_button alp_button-dark alp_header-cta ${variant === "saas" ? "alp_button-3d alp_button-orange" : ""}`}>{variant === "saas" ? <AnimatedButtonContent label={config.primaryCta.label} /> : <>{config.primaryCta.label}<ArrowUpRight className="alp_icon" aria-hidden="true" /></>}</a>
        </div>
        <button ref={menuButton} className="alp_menu-toggle" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="alp_mobile-menu" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X className="alp_icon" /> : <Menu className="alp_icon" />}</button>
      </div>
      <nav id="alp_mobile-menu" className="alp_mobile-menu" aria-label="Mobile navigation" hidden={!isOpen}>
        {config.navigation.map((link) => <a key={link.label} href={link.href} onClick={() => setIsOpen(false)}>{link.label}<ArrowUpRight className="alp_icon" aria-hidden="true" /></a>)}
        <a className={variant === "saas" ? "alp_button alp_button-3d alp_button-orange" : "alp_mobile-cta"} href={config.primaryCta.href} onClick={() => setIsOpen(false)}>{variant === "saas" ? <AnimatedButtonContent label={config.primaryCta.label} /> : <>{config.primaryCta.label}<ArrowUpRight className="alp_icon" aria-hidden="true" /></>}</a>
      </nav>
    </header>
  );
}

