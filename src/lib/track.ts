type PlausibleHandler = (event: string, payload?: { props?: Record<string, unknown> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleHandler;
  }
}

// Minimal analytics wrapper (Plausible-compatible)
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    // no-op for now
    console.debug("[track]", event, props);
  }
}
