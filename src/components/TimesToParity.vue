<script setup>
import Arrow from "./Arrow.vue";

const props = defineProps({
  multiplier: String,
});
</script>

<template>
  <div class="times-to-parity-container">
    <Arrow />
    <p class="ttp-text">{{ multiplier }}x to parity</p>
  </div>
</template>

<style lang="css" src="@styles/components/TimesToParity.css"></style>
