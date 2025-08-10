<script setup></script>

<template>
  <div class="arrow-container">
    <!-- Right pointing arrow, show only on large screens -->
    <img
      src="@assets/arrow-right.svg"
      alt="Arrow right"
      class="hidden md:block lg:block max-w-[200px]"
    />
    <!-- Down pointing arrow, show only on small and medium screens -->
    <img
      src="@assets/arrow-down.svg"
      alt="Arrow down"
      class="block md:hidden lg:hidden max-w-[200px]"
    />
  </div>
</template>

<style lang="css" src="@styles/components/arrow.css"></style>
