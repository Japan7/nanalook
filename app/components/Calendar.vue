<script setup lang="ts">
import type { CalendarOptions } from "@fullcalendar/core/index.js";
import frLocale from "@fullcalendar/core/locales/fr";
import iCalendarPlugin from "@fullcalendar/icalendar";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/vue3";
import tippy from "tippy.js";
import "tippy.js/themes/light-border.css";

const props = defineProps<{ eventSources: CalendarOptions["eventSources"] }>();

const options: CalendarOptions = {
  plugins: [timeGridPlugin, interactionPlugin, iCalendarPlugin],
  initialView: "timeGridWeek",
  height: "calc(100vh - 175px)",
  nowIndicator: true,
  scrollTime: "21:00:00",
  locale: frLocale,
  eventDidMount: (info) => {
    tippy(info.el, {
      content: info.event.source?.id,
      theme: "light-border",
      placement: "top-start",
      animation: false,
    });
  },
  ...props,
};
</script>

<template>
  <FullCalendar :options="options" />
</template>
