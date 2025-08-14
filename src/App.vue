<script setup>
import { onMounted } from "vue";
import { useDeviceType } from "./composables/useDeviceType";
import { useAppStore } from "./stores/app";

const { deviceType } = useDeviceType();

const appStore = useAppStore();

onMounted(() => {
  appStore.deviceType = deviceType;
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
