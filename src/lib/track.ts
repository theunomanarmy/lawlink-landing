const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

/**
 * Lightweight wrapper around Plausible analytics. Falls back to no-ops when the
 * script has not been loaded yet, so components can eagerly import it.
 */
export function trackEvent(eventName: string, props?: Record<string, unknown>) {
  if (!PLAUSIBLE_DOMAIN) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[analytics] Plausible disabled - event skipped`, {
        eventName,
        props,
      });
    }
    return;
  }

  if (typeof window === "undefined") {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[analytics] Server-side render for ${eventName}`, props);
    }
    return;
  }

  window.plausible?.(eventName, props ? { props } : undefined);
}

export function isAnalyticsEnabled() {
  return Boolean(PLAUSIBLE_DOMAIN);
}
