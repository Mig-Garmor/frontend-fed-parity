<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const sortColumn = ref(null);
const sortDirection = ref("asc");

function sortBy(column) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
}

const sortedItems = computed(() => {
  if (!sortColumn.value) return [...props.items];

  return [...props.items].sort((a, b) => {
    const sortKey = `${sortColumn.value}Raw`;
    const valA = a[sortKey] ?? a[sortColumn.value];
    const valB = b[sortKey] ?? b[sortColumn.value];

    if (valA < valB) return sortDirection.value === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection.value === "asc" ? 1 : -1;
    return 0;
  });
});
</script>

<template>
  <div class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            @click="sortBy(header.value)"
            class="sortable"
          >
            {{ header.text }}
            <span v-if="sortColumn === header.value">
              {{ sortDirection === "asc" ? "▲" : "▼" }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, rowIndex) in sortedItems" :key="rowIndex">
          <td v-for="header in headers" :key="header.value">
            {{ item[header.value] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="css" src="@styles/components/table.css"></style>
