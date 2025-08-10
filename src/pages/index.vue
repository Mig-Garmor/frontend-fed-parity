<script setup>
import { computed, onMounted, ref } from "vue";
import TimesToParity from "../components/TimesToParity.vue";
import TokenCircle from "../components/TokenCircle.vue";
import { fetchPrices, trackEvent } from "../utils/requests";
import { useAppStore } from "../stores/app";

const tokenPrices = ref({});

const appStore = useAppStore();

onMounted(async () => {
  trackEvent("pageview");

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

const readableLastUpdated = computed(() => {
  const tokenData = tokenPrices && tokenPrices.value;

  if (tokenData) {
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
    } else return "";
  } else {
    return "";
  }
});
</script>

<template>
  <div class="home-container">
    <div class="title-container">
      <div class="header-left-block">
        <img class="header-image" src="../assets/teh-lady.png" alt="" />
      </div>
      <h1 class="title-1">$FED To Parity</h1>
      <div class="header-right-block"></div>
    </div>
    <div class="last-updated">
      Last updated:
      {{ readableLastUpdated ? readableLastUpdated : "Loading..." }}
    </div>
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
  </div>
</template>

<style lang="css" src="@styles/pages/home.css"></style>
