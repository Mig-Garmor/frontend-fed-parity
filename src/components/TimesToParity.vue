<script setup>
import { useAppStore } from "../stores/app";
import { Icon } from "@iconify/vue";
import { dexscreenerRatios } from "../utils/urls";

import Arrow from "./Arrow.vue";
import { trackEvent } from "../utils/requests";

const appStore = useAppStore();

const props = defineProps({
  multiplier: String,
  ratioName: String,
});

const getRatioLink = (ratioName) => {
  trackEvent("click", ratioName);
  window.open(dexscreenerRatios[ratioName], "_blank");
};
</script>

<template>
  <div class="times-to-parity-container">
    <Arrow />
    <div class="ttp-container">
      <p v-if="appStore.loading" class="ttp-text animate-pulse-skeleton">
        x to parity
      </p>
      <p v-else class="ttp-text">{{ multiplier }}x to parity</p>
      <div class="ratio-name-container" @click="getRatioLink(ratioName)">
        <div class="ratio-name">{{ ratioName }}</div>
        <Icon icon="mdi:chart-line" />
      </div>
    </div>
  </div>
</template>

<style lang="css" src="@styles/components/TimesToParity.css"></style>
