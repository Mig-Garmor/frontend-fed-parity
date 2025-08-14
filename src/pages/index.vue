<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchPrices, trackEvent } from "../utils/requests";
import { useAppStore } from "../stores/app";

import { useDeviceType } from "../composables/useDeviceType";

import TimesToParity from "../components/TimesToParity.vue";
import TokenCircle from "../components/TokenCircle.vue";
import PageWrapper from "../components/PageWrapper.vue";

const tokenPrices = ref({});

const appStore = useAppStore();

const { deviceType } = useDeviceType();

onMounted(async () => {
  trackEvent("pageview", { deviceType: deviceType.value, page: "home" });

  tokenPrices.value = await fetchPrices();
  appStore.loading = false;
});

const ratios = computed(() => {
  //Check if not an empty object
  if (!appStore.loading) {
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

const lastUpdated = computed(() => {
  const tokenData = tokenPrices && tokenPrices.value;

  if (Object.keys(tokenData).length > 0) {
    const firstKeyWithLastUpdated =
      tokenData &&
      Object.keys(tokenData).find((key) => tokenData[key]?.lastUpdated);

    if (firstKeyWithLastUpdated) {
      const lastUpdatedValue = firstKeyWithLastUpdated
        ? tokenData[firstKeyWithLastUpdated].lastUpdated
        : "";

      const date = new Date(lastUpdatedValue);

      return date.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      });
    } else return "error getting data";
  } else {
    return "loading...";
  }
});
</script>

<template>
  <PageWrapper :lastUpdated="lastUpdated">
    <div class="text-white text-3xl font-bold pt-[20px]">1:1:1</div>
    <div class="tokens-display-container">
      <div class="all-token-container">
        <TokenCircle
          size="large"
          svg="teh"
          :price="
            tokenPrices['FED']
              ? parseFloat(tokenPrices['FED'].price).toFixed(8)
              : ''
          "
          name="FED"
        />
        <TimesToParity
          :multiplier="ratios ? ratios['tbill-fed'] : ''"
          ratioName="FED/TBILL"
        />
        <TokenCircle
          size="large"
          svg="tbill"
          :price="
            tokenPrices['TBILL']
              ? parseFloat(tokenPrices['TBILL'].price).toFixed(6)
              : ''
          "
          name="TBILL"
        />
        <TimesToParity
          class="hidden md:block"
          :multiplier="ratios ? ratios['pdai-tbill'] : ''"
          ratioName="TBILL/PDAI"
        />
        <TokenCircle
          class="hidden md:block"
          size="large"
          svg="pDAI"
          :price="
            tokenPrices['PDAI']
              ? parseFloat(tokenPrices['PDAI'].price).toFixed(6)
              : ''
          "
          name="PDAI"
        />
      </div>
      <div class="pdai-fed-container">
        <TokenCircle
          size="medium"
          svg="teh"
          :price="
            tokenPrices['FED']
              ? parseFloat(tokenPrices['FED'].price).toFixed(8)
              : ''
          "
          name="FED"
        />
        <TimesToParity
          :multiplier="ratios ? ratios['pdai-fed'] : ''"
          ratioName="FED/PDAI"
        />
        <TokenCircle
          size="medium"
          svg="pDAI"
          :price="
            tokenPrices['PDAI']
              ? parseFloat(tokenPrices['PDAI'].price).toFixed(6)
              : ''
          "
          name="PDAI"
        />
      </div>
    </div>
  </PageWrapper>
</template>

<style lang="css" src="@styles/pages/home.css"></style>
