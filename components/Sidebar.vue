<script setup lang="ts">
const { data: projections } = await useFetch("/api/projections");

const route = useRoute();

const isActive = (id: string) => route.params.id === id;
</script>

<template>
  <ul
    class="menu menu-lg bg-base-200 text-base-content min-h-full w-80 p-4 flex-col-reverse"
  >
    <li v-for="projo in projections">
      <NuxtLink :href="'/' + projo.id" :class="{ active: isActive(projo.id) }">
        <span class="truncate">{{ projo.name }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
