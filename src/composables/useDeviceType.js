import { ref, onMounted, onUnmounted } from "vue";

export const useDeviceType = (breakpoint = 1024) => {
  const deviceType = ref(window.innerWidth < breakpoint ? "mobile" : "desktop");

  const updateDeviceType = () => {
    deviceType.value = window.innerWidth < breakpoint ? "mobile" : "desktop";
  };

  onMounted(() => {
    window.addEventListener("resize", updateDeviceType);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateDeviceType);
  });

  return { deviceType };
};
