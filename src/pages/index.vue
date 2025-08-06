<script setup>
import { computed, onMounted, ref } from "vue";
import TimesToParity from "../components/TimesToParity.vue";
import TokenCircle from "../components/TokenCircle.vue";

import { fetchPrices } from "../utils/requests";

const tokenPrices = ref({});
const loading = ref(true);

onMounted(async () => {
  tokenPrices.value = await fetchPrices();
  loading.value = false;
});

const ratios = computed(() => {
  //Check if not an empty object
  if (!loading.value) {
    const DAITBILL = (
      parseFloat(tokenPrices.value.PDAI.price) /
      parseFloat(tokenPrices.value.TBILL.price)
    ).toFixed(2);
    const TBILLFED = (
      parseFloat(tokenPrices.value.TBILL.price) /
      parseFloat(tokenPrices.value.FED.price)
    ).toFixed(2);
    const PDAIFED = (
      parseFloat(tokenPrices.value.PDAI.price) /
      parseFloat(tokenPrices.value.FED.price)
    ).toFixed(2);

    const ratios = {
      "pdai-tbill": DAITBILL,
      "tbill-fed": TBILLFED,
      "pdai-fed": PDAIFED,
    };
    return ratios;
  }
});
</script>

<template>
  <div class="home-container">
    <h1 class="title-1">FED - TBill - pDAI</h1>
    <h1 class="title-2">1:1:1</h1>
    <!-- Desktop view -->
    <div v-if="!loading.value && ratios" class="all-token-container">
      <TokenCircle size="large" svg="teh" />
      <TimesToParity :multiplier="ratios['tbill-fed']" />
      <TokenCircle size="large" svg="tbill" />
      <TimesToParity
        class="hidden md:block"
        :multiplier="ratios['pdai-tbill']"
      />
      <TokenCircle class="hidden md:block" size="large" svg="pDAI" />
    </div>
    <div v-if="!loading.value && ratios" class="pdai-fed-container">
      <TokenCircle size="medium" svg="teh" />
      <TimesToParity :multiplier="ratios['pdai-fed']" />
      <TokenCircle size="medium" svg="pDAI" />
    </div>
  </div>
</template>

<style lang="css" src="@styles/pages/home.css"></style>
