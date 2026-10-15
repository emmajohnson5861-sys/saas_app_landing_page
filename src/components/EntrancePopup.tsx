'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const STORAGE_KEY = 'algofort_popup_dont_show';
const COOKIE_NAME = 'algofort_popup_dont_show';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function EntrancePopup() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'sending' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  const closePopup = (forceDontShow?: boolean) => {
    // If the checkbox is checked OR explicitly requested, persist cookie & localStorage
    if (dontShowAgain || forceDontShow) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {}
      setCookie(COOKIE_NAME, 'true', 365);
    }

    setIsVisible(false);
    document.body.classList.remove('popup-locked');
    setTimeout(() => {
      setIsOpen(false);
    }, 450);
  };

  const openPopup = () => {
    setIsOpen(true);
    document.body.classList.add('popup-locked');
    // Allow DOM render before adding transition class
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  };

  useEffect(() => {
    setMounted(true);

    // Check if dismissed via cookie or localStorage
    const isDismissedCookie = getCookie(COOKIE_NAME) === 'true';
    let isDismissedStorage = false;
    try {
      isDismissedStorage = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {}

    // Expose helpers for developer/testing convenience
    if (typeof window !== 'undefined') {
      (window as unknown as { openEntrancePopup: () => void }).openEntrancePopup = openPopup;
      (window as unknown as { resetEntrancePopup: () => void }).resetEntrancePopup = () => {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
        console.log('Entrance popup cookie & localStorage reset. Refresh or run openEntrancePopup() to test.');
      };
    }

    if (!isDismissedCookie && !isDismissedStorage) {
      // Trigger smoothly on page load after brief delay
      const timer = setTimeout(() => {
        openPopup();
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dontShowAgain]);

  // Cleanup body lock on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('popup-locked');
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = (formData.get('name') as string) || 'there';

    setStatus({ type: 'sending', message: 'Sending your enquiry...' });

    // Simulate sending enquiry
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: `Thank you, ${name}! Your enquiry has been received. We’ll get back to you shortly.`,
      });
      formRef.current?.reset();

      // Automatically persist cookie when submitted and close
      setTimeout(() => {
        closePopup(true);
      }, 1800);
    }, 700);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div
      className={`entrance-popup-backdrop ${isVisible ? 'is-visible' : ''}`}
      id="entrance-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePopup();
        }
      }}
    >
      <div className="entrance-popup-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="entrance-popup-close"
          aria-label="Close popup"
          onClick={() => closePopup()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Media Column (Left) */}
        <div className="entrance-popup-media" aria-hidden="true">
          <picture>
            <source srcSet="/images/coding-workspace.webp" type="image/webp" />
            <Image
              className="entrance-popup-img"
              src="/images/coding-workspace.webp"
              alt="Algofort web development workspace"
              width={941}
              height={1672}
              priority
            />
          </picture>
        </div>

        {/* Content Column (Right) */}
        <div className="entrance-popup-content">
          <div className="entrance-popup-content-inner">
            <p className="entrance-popup-kicker section-label">
              <span className="section-plus" aria-hidden="true">+</span> Let's talk
            </p>
            <h2 className="entrance-popup-title" id="popup-title">
              Have a project in mind?
            </h2>
            <p className="entrance-popup-lead">
              Tell us a little about it. A new website, a redesign, or an idea you’re still figuring out — we’d like to hear it.
            </p>

            <form ref={formRef} className="entrance-popup-form" onSubmit={handleSubmit} aria-label="Project enquiry popup form">
              <div className="entrance-popup-fields">
                <label className="entrance-popup-field">
                  Name *
                  <input type="text" name="name" placeholder="Your name" autoComplete="name" maxLength={100} required />
                </label>
                <label className="entrance-popup-field">
                  Email *
                  <input type="email" name="email" placeholder="you@company.com" autoComplete="email" maxLength={254} required />
                </label>
                <label className="entrance-popup-field entrance-popup-field-full">
                  Phone / WhatsApp <span className="entrance-popup-optional">(optional)</span>
                  <input type="tel" name="phone" placeholder="Your number" autoComplete="tel" maxLength={50} />
                </label>
                <label className="entrance-popup-field entrance-popup-field-full">
                  Message *
                  <textarea name="message" placeholder="What do you have in mind?" minLength={10} maxLength={3000} required />
                </label>
              </div>

              <div className="entrance-popup-form-footer">
                <button
                  className="entrance-popup-submit roll-button"
                  type="submit"
                  disabled={status.type === 'sending'}
                  aria-label="Send enquiry"
                >
                  <span className="roll-label" aria-hidden="true">
                    <span className="roll-line roll-line-one">Send enquiry</span>
                    <span className="roll-line roll-line-two">Send enquiry</span>
                  </span>
                  <span className="cta-arrows" aria-hidden="true">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

              {/* Status Message */}
              {status.type !== 'idle' && (
                <p className={`entrance-popup-status is-${status.type}`} role="status" aria-live="polite">
                  {status.message}
                </p>
              )}

              {/* Bottom Right Checkbox for "Don't show this again" */}
              <div className="entrance-popup-bottom-bar">
                <label className="entrance-popup-checkbox-label">
                  <input
                    type="checkbox"
                    className="entrance-popup-checkbox"
                    id="entrance-popup-dont-show-cb"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                  />
                  <span>Don't show this again</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
