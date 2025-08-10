<script setup>
import HeaderComponent from "./HeaderComponent.vue";
</script>

<template>
  <div class="page-wrapper">
    <HeaderComponent />
    <slot></slot>
  </div>
</template>

<style lang="css" src="@styles/components/PageWrapper.css"></style>
