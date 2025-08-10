const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchPrices = async () => {
  const res = await fetch(`${backendUrl}/prices`, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
    },
  });
  return await res.json();
};

export function trackEvent(type, data = {}) {
  const isAdmin = import.meta.env.VITE_IS_ADMIN === "true";
  if (isAdmin) {
    console.log("Admin no track");
    return;
  }
  const userId = localStorage.getItem("userId") || crypto.randomUUID();
  localStorage.setItem("userId", userId);

  fetch(`${backendUrl}/track`, {
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
