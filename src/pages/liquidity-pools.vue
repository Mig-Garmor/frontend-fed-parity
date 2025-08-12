<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { fetchLiquidityPools } from "../utils/requests";
import { formatWithThousandsSeparator } from "../utils/helpers";

import PageWrapper from "../components/PageWrapper.vue";
import TableComponent from "../components/TableComponent.vue";
import Loader from "../components/particles/loader.vue";

const liquidityPairs = ref({});
const loadingPage = ref(true);

onMounted(async () => {
  liquidityPairs.value = await fetchLiquidityPools();
  loadingPage.value = false;
});

const fedLiquidityPairsHeaders = [
  { text: "LPs", value: "name" },
  { text: "Liquidity", value: "liquidity" },
  { text: "Volume 24h", value: "volume" },
  { text: "Created @", value: "createdAt" },
];

const preparedDataLiquidityPairs = computed(() => {
  return liquidityPairs.value.map((pair) => {
    const creationDate = new Date(pair.pairCreationTime);

    const day = String(creationDate.getDate()).padStart(2, "0");
    const month = String(creationDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = creationDate.getFullYear();

    const hours = String(creationDate.getHours()).padStart(2, "0");
    const minutes = String(creationDate.getMinutes()).padStart(2, "0");

    const formattedCreationDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return {
      name: `${pair.baseToken.symbol}/${pair.quoteToken.symbol}`,
      liquidity:
        pair.liquidity.total === ""
          ? "N/A"
          : `$ ${formatWithThousandsSeparator(pair.liquidity.total)}`,
      volume: `$ ${formatWithThousandsSeparator(pair.volume.h24)}`, // Displayed value, not the raw value, but formatted to $pair.volume.h24,
      createdAt: formattedCreationDate, // Displayed value
      createdAtRaw: pair.pairCreationTime, // Numeric value for sorting
    };
  });
});
</script>

<template>
  <PageWrapper>
    <div class="liquidity-pairs-container">
      <div class="text-white text-3xl pt-[20px]">FED - Liquidity Pools</div>
      <div class="table-container">
        <Loader v-if="loadingPage" />
        <TableComponent
          v-if="!loadingPage"
          :headers="fedLiquidityPairsHeaders"
          :items="preparedDataLiquidityPairs"
        />
      </div>
    </div>
  </PageWrapper>
</template>

<style lang="css" src="@styles/pages/liquidity-pairs.css"></style>
