import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("App", () => {
  const loading = ref(true);
  const deviceType = ref(true);

  return {
    loading,
    deviceType,
  };
});
