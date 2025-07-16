<script setup lang="ts">
const props = defineProps<{ projection: Projection }>();

const eventSources = toEventSources(props.projection.participants);
</script>

<template>
  <div class="flex flex-wrap gap-x-8 mb-2">
    <div v-for="source in eventSources" class="flex items-center gap-1">
      <div
        class="size-4 rounded-sm"
        :style="{ 'background-color': source.color }"
      />
      <p>{{ source.id }}</p>
    </div>
  </div>

  <Calendar :event-sources="eventSources" />
</template>
