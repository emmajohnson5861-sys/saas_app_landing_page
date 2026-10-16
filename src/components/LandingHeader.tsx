"use client";

import Image from "next/image";
import { AnimatedButtonContent } from "./AnimatedButtonContent";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LandingConfig, LandingLink } from "@/config/landing";
import { landingFooter } from "@/config/ending";

type HeaderConfig = Pick<LandingConfig, "brand" | "navigation" | "primaryCta"> & { secondaryHeaderCta?: LandingLink };

export function LandingHeader({ config, variant = "default" }: { config: HeaderConfig; variant?: "default" | "saas" }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function initTimeline() {
      const { gsap } = await import("gsap");
      if (!isMounted || !dialogRef.current || !backdropRef.current || !logoRef.current || !menuButton.current) return;

      const dialog = dialogRef.current;
      const backdrop = backdropRef.current;
      const logo = logoRef.current;
      const toggleBtn = menuButton.current;
      const actions = actionsRef.current;
      const links = dialog.querySelectorAll(".alp_mobile-dialog-link > span");
      const contacts = dialog.querySelector(".alp_mobile-menu-contacts");
      const cta = dialog.querySelector(".alp_mobile-menu-cta");

      // Set initial states
      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(dialog, { autoAlpha: 1, clipPath: "inset(0 0 100% 0 round 28px)" });
      gsap.set(links, { yPercent: 115 });
      if (contacts) gsap.set(contacts, { autoAlpha: 0, y: 14 });
      if (cta) gsap.set(cta, { autoAlpha: 0, y: 24 });
      gsap.set([logo, toggleBtn], { x: 0, y: 0 });
      if (actions) gsap.set(actions, { autoAlpha: 1 });

      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          if (!isMounted) return;
          dialog.hidden = true;
          backdrop.hidden = true;
          gsap.set([logo, toggleBtn], { clearProps: "transform" });
          if (actions) gsap.set(actions, { clearProps: "all" });
        },
      });

      if (actions) {
        tl.fromTo(actions, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25, ease: "power2.out" }, 0);
      }

      tl
      // 1. Move logo smoothly inside dialog card
      .fromTo(
        logo,
        { x: 0, y: 0 },
        {
          x: () => {
            const dRect = dialog.getBoundingClientRect();
            const lRect = logo.getBoundingClientRect();
            const currentX = (gsap.getProperty(logo, "x") as number) || 0;
            return dRect.left + 24 - (lRect.left - currentX);
          },
          y: () => {
            const dRect = dialog.getBoundingClientRect();
            const lRect = logo.getBoundingClientRect();
            const currentY = (gsap.getProperty(logo, "y") as number) || 0;
            return dRect.top + 20 - (lRect.top - currentY);
          },
          duration: 0.45,
          ease: "power3.inOut",
        },
        0
      )
      // 2. Move toggle button smoothly inside dialog card
      .fromTo(
        toggleBtn,
        { x: 0, y: 0 },
        {
          x: () => {
            const dRect = dialog.getBoundingClientRect();
            const tRect = toggleBtn.getBoundingClientRect();
            const currentX = (gsap.getProperty(toggleBtn, "x") as number) || 0;
            const targetLeft = dRect.right - 24 - tRect.width;
            return targetLeft - (tRect.left - currentX);
          },
          y: () => {
            const dRect = dialog.getBoundingClientRect();
            const tRect = toggleBtn.getBoundingClientRect();
            const currentY = (gsap.getProperty(toggleBtn, "y") as number) || 0;
            return dRect.top + 16 - (tRect.top - currentY);
          },
          duration: 0.45,
          ease: "power3.inOut",
        },
        0
      )
      // 3. Fade in backdrop
      .fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" }, 0)
      // 4. Wipe down card
      .fromTo(
        dialog,
        { autoAlpha: 1, clipPath: "inset(0 0 100% 0 round 28px)" },
        { autoAlpha: 1, clipPath: "inset(0 0 0% 0 round 28px)", duration: 0.5, ease: "power3.inOut" },
        0.08
      )
      // 5. Roll up links
      .fromTo(
        links,
        { yPercent: 115 },
        { yPercent: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" },
        0.55
      )
      // 6. Slide in contacts
      .fromTo(
        contacts,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
        0.72
      )
      // 7. Slide in CTA button
      .fromTo(
        cta,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.80
      );

      timelineRef.current = tl;
    }

    initTimeline();

    return () => {
      isMounted = false;
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;

    if (isOpen) {
      if (dialog) dialog.hidden = false;
      if (backdrop) backdrop.hidden = false;
      document.body.style.overflow = "hidden";
      if (tl) {
        tl.invalidate();
        tl.timeScale(1).play();
      }
    } else {
      document.body.style.overflow = "";
      if (tl) {
        tl.timeScale(1.5).reverse();
      } else {
        if (dialog) dialog.hidden = true;
        if (backdrop) backdrop.hidden = true;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen]);

  return (
    <>
      <header
        ref={header}
        className={`alp_header ${variant === "saas" ? "alp_saas-header" : ""} ${isOpen ? "alp_header-menu-active" : ""}`}
      >
        <div className="alp_container alp_header-inner">
          <a ref={logoRef} href={config.brand.home} className="alp_logo" aria-label={`${config.brand.name} home`}>
            <Image src={config.brand.logo} alt={config.brand.name} width={168} height={27} priority />
          </a>
          <nav className="alp_nav" aria-label="Main navigation">
            {config.navigation.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="alp_nav-link"
                data-active={link.label === "Home" ? true : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div ref={actionsRef} className="alp_header-actions">
            {config.secondaryHeaderCta && (
              <a
                href={config.secondaryHeaderCta.href}
                className="alp_button alp_button-raised alp_button-white alp_header-secondary"
              >
                {config.secondaryHeaderCta.label}
              </a>
            )}
            <a
              href={config.primaryCta.href}
              className={`alp_button alp_button-dark alp_header-cta ${variant === "saas" ? "alp_button-3d alp_button-orange" : ""}`}
            >
              {variant === "saas" ? (
                <AnimatedButtonContent label={config.primaryCta.label} />
              ) : (
                <>
                  {config.primaryCta.label}
                  <ArrowUpRight className="alp_icon" aria-hidden="true" />
                </>
              )}
            </a>
          </div>
          <button
            ref={menuButton}
            type="button"
            className={`alp_mobile-menu-toggle ${isOpen ? "is-open" : ""}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="alp_mobile-navigation"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              className="alp_menu-grid-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        ref={backdropRef}
        className="alp_mobile-menu-backdrop"
        hidden
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      {/* Floating Card Dialog Menu */}
      <div
        ref={dialogRef}
        id="alp_mobile-navigation"
        className="alp_mobile-menu-dialog"
        hidden
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        <nav className="alp_mobile-dialog-links" aria-label="Mobile main navigation">
          {config.navigation.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="alp_mobile-dialog-link"
              onClick={() => setIsOpen(false)}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="alp_mobile-menu-contacts">
          <p>Contact</p>
          <a href={landingFooter.phone.href}>{landingFooter.phone.label}</a>
          <a href={`mailto:${landingFooter.email}`}>{landingFooter.email}</a>
        </div>

        <a
          className={`alp_mobile-menu-cta ${variant === "saas" ? "alp_button alp_button-3d alp_button-orange" : ""}`}
          href={config.primaryCta.href}
          onClick={() => setIsOpen(false)}
        >
          {variant === "saas" ? (
            <AnimatedButtonContent label={config.primaryCta.label} />
          ) : (
            <>
              <span>{config.primaryCta.label}</span>
              <ArrowUpRight className="alp_icon" aria-hidden="true" />
            </>
          )}
        </a>
      </div>
    </>
  );
}

