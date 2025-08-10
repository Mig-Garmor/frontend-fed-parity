export function trackEvent(type, data = {}) {
  const userId = localStorage.getItem("userId") || crypto.randomUUID();
  localStorage.setItem("userId", userId);
  fetch(`${import.meta.env.VITE_BACKEND_URL}/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      data,
      userId, // identify returning user
      url: window.location.href,
      ts: Date.now(),
    }),
  }).catch(() => {});
}
