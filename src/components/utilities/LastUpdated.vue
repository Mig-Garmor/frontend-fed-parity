<script setup>
import { defineProps } from "vue";

const props = defineProps({
  lastUpdated: String,
});
</script>

<template>
  <div class="last-updated-container">
    Last updated:
    {{ lastUpdated ?? "" }}
  </div>
</template>

<style lang="css" src="@styles/components/utilities/last-updated.css"></style>
