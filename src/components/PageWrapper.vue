<script setup>
import HeaderComponent from "./HeaderComponent.vue";
</script>

<template>
  <div class="page-wrapper">
    <HeaderComponent />
    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css" src="@styles/components/page-wrapper.css"></style>
