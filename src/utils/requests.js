export const fetchPrices = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/prices`, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
    },
  });
  return await res.json();
};
