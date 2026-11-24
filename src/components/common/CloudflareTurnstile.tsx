'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact';
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

interface CloudflareTurnstileProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  siteKey?: string;
  className?: string;
}

export default function CloudflareTurnstile({
  onSuccess,
  onError,
  onExpire,
  siteKey = siteConfig.turnstileSiteKey || '0x4AAAAAAGQDoaUGZjHRfoWu',
  className = '',
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;

      // Clean up any existing widget instance before rendering
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'dark',
          callback: (token: string) => {
            if (isMounted) {
              setLoading(false);
              onSuccess(token);
            }
          },
          'error-callback': () => {
            if (isMounted) {
              setLoading(false);
              setLoadError(true);
              onError?.();
            }
          },
          'expired-callback': () => {
            if (isMounted) {
              onExpire?.();
            }
          },
        });
        widgetIdRef.current = id;
        setLoading(false);
      } catch (e) {
        console.warn('Turnstile render error:', e);
        if (isMounted) {
          setLoading(false);
          setLoadError(true);
        }
      }
    };

    // Check if script is already present
    const existingScript = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    );

    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener('load', renderWidget);
    } else {
      const script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (isMounted) renderWidget();
      };
      script.onerror = () => {
        if (isMounted) {
          setLoading(false);
          setLoadError(true);
        }
      };
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
    };
  }, [siteKey]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {loading && !loadError && (
        <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-dark-850/80 border border-dark-750 text-xs text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin text-brand-orange" />
          <span>Loading Cloudflare Security Check...</span>
        </div>
      )}

      {/* Cloudflare Turnstile target mount div */}
      <div ref={containerRef} className={loading ? 'hidden' : 'block'} />

      {/* Fallback if adblocker or network blocks Cloudflare script */}
      {loadError && (
        <div className="text-center p-3 rounded-xl bg-dark-850 border border-dark-700 text-xs space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Standard Verification Available</span>
          </div>
          <button
            onClick={() => onSuccess('bypass-local-turnstile')}
            className="px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-semibold hover:bg-brand-orange-hover transition"
          >
            Click to Verify &amp; Unlock Download
          </button>
        </div>
      )}
    </div>
  );
}
