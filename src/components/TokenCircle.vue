<script setup>
import { computed } from "vue";

const props = defineProps({
  svg: String,
  size: String,
  price: Number,
});

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
    <div v-if="price" class="token-badge">${{ price }}</div>

    <div class="token-circle" :class="circleSize">
      <img :src="svgUrl" alt="" />
    </div>
  </div>
</template>

<style lang="css" src="@styles/components/TokenCircles.css"></style>
