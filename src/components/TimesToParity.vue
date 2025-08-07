<script setup>
import Arrow from "./Arrow.vue";
import { useAppStore } from "../stores/app";

const appStore = useAppStore();

const props = defineProps({
  multiplier: String,
});
</script>

<template>
  <div class="times-to-parity-container">
    <Arrow />
    <p v-if="appStore.loading" class="ttp-text animate-pulse-skeleton">
      x to parity
    </p>
    <p v-else class="ttp-text">{{ multiplier }}x to parity</p>
  </div>
</template>

<style lang="css" src="@styles/components/TimesToParity.css"></style>
