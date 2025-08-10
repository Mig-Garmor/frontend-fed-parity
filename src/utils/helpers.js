export function trackEvent(type, data = {}) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      data,
      url: window.location.href,
      ts: Date.now(),
    }),
  }).catch(() => {});
}
