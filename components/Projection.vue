<script setup lang="ts">
import type { EventSourceInput } from "@fullcalendar/core/index.js";
import uniqolor from "uniqolor";

const props = defineProps<{ projection: Projection }>();

const eventSources = props.projection.participants.map(
  (p) =>
    ({
      id: p.discord_username,
      url: `/api/calendars/${p.discord_id_str}`,
      format: "ics",
      color: uniqolor(p.discord_id_str).color,
    } satisfies EventSourceInput)
);
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
