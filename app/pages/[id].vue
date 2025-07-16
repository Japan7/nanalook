<script setup lang="ts">
const route = useRoute();

const { data: projection, status } = await useFetch(
  `/api/projections/${route.params.id}`
);

const loadingIndicator = useLoadingIndicator();
watchEffect(() => {
  status.value ? loadingIndicator.start() : loadingIndicator.finish();
});
</script>

<template>
  <Projection v-if="projection" :projection="projection" />
</template>
