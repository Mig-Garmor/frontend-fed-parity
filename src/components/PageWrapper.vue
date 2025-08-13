<script setup>
import { defineProps, watch } from "vue";
import HeaderComponent from "./HeaderComponent.vue";
import LastUpdated from "./utilities/LastUpdated.vue";

const props = defineProps({
  lastUpdated: {
    type: String,
  },
});
</script>

<template>
  <div class="page-wrapper">
    <HeaderComponent />
    <div class="content-container">
      <LastUpdated v-if="lastUpdated" :lastUpdated="lastUpdated" />
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css" src="@styles/components/page-wrapper.css"></style>
