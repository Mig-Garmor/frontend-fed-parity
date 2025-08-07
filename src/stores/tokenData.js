import { defineStore } from "pinia";

export const useTokenData = defineStore(
  "tokenData",
  () => {
    const tokenData = ref({});

    return {};
  },
  { persist: true }
);
