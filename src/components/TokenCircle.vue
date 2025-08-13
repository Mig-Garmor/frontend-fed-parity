<script setup>
import { computed } from "vue";
import { useAppStore } from "../stores/app";

const props = defineProps({
  svg: String,
  size: String,
  price: String,
  name: String,
});

const appStore = useAppStore();

const circleSize = computed(() => {
  switch (props.size) {
    case "large":
      return "large-circle";
    case "medium":
      return "medium-circle";
    case "small":
      return "small-circle";
  }
});

const svgImports = import.meta.glob("@assets/tokens/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

const svgUrl = computed(() => {
  if (!props.svg) return null;

  const path = `/src/assets/tokens/${props.svg}.svg`;
  return svgImports[path] || null;
});
</script>

<template>
  <div class="token-circle-container">
    <div v-if="name" class="token-name">{{ name }}</div>
    <div
      class="token-circle"
      :class="circleSize"
      :style="{ backgroundImage: svgUrl ? `url(${svgUrl})` : '' }"
    ></div>
    <div
      v-if="appStore.loading"
      class="token-price animate-pulse-skeleton"
    ></div>
    <div v-else class="token-price">${{ price }}</div>
  </div>
</template>

<style lang="css" src="@styles/components/token-circles.css"></style>
