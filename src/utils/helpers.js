export function trackEvent(type, data = {}) {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/track`, {
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
