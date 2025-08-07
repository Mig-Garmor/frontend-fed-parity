import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("App", () => {
  const loading = ref(true);

  return {
    loading,
  };
});
