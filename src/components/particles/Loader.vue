<script setup>
import { defineProps } from "vue";

defineProps({
  text: {
    type: Boolean,
    default: true,
  },
  grow: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="loader-container" :class="grow ? 'grow' : 'h-fit'">
    <div class="loader"></div>
  </div>
</template>

<style lang="css" src="@styles/components/particles/loader.css"></style>
