const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchPrices = async () => {
  const res = await fetch(`${backendURL}/prices`, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY, //Is this necessary?
    },
  });
  return await res.json();
};

export const fetchLiquidityPairs = async () => {
  const res = await fetch(`${backendURL}/liquidity-pairs`, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY, //Is this necessary?
    },
  });
  return await res.json();
};

export const trackEvent = (type, data = {}) => {
  const isAdmin = import.meta.env.VITE_IS_ADMIN === "true";
  if (isAdmin) {
    return;
  }
  const userId = localStorage.getItem("userId") || crypto.randomUUID();
  localStorage.setItem("userId", userId);

  const date = new Date();
  const dateISOString = date.toISOString();

  fetch(`${backendURL}/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      data,
      userId, // identify returning user
      url: window.location.href,
      ts: dateISOString,
    }),
  }).catch(() => {});
};
