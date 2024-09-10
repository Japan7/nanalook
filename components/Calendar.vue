<script setup lang="ts">
import type { CalendarOptions } from "@fullcalendar/core/index.js";
import iCalendarPlugin from "@fullcalendar/icalendar";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/vue3";

const props = defineProps<{ eventSources: CalendarOptions["eventSources"] }>();

const options: CalendarOptions = {
  plugins: [timeGridPlugin, interactionPlugin, iCalendarPlugin],
  initialView: "timeGridWeek",
  height: "calc(100vh - 175px)",
  nowIndicator: true,
  scrollTime: "21:00:00",
  ...props,
};
</script>

<template>
  <FullCalendar :options="options" />
</template>
