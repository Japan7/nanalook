<script setup lang="ts">
import iCalendarPlugin from "@fullcalendar/icalendar";
import FullCalendar, {
  type CalendarOptions,
  type PluginInput,
} from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/vue3/interaction";
import frLocale from "@fullcalendar/vue3/locales/fr";
import "@fullcalendar/vue3/skeleton.css";
import themePlugin from "@fullcalendar/vue3/themes/classic";
import "@fullcalendar/vue3/themes/classic/palette.css";
import "@fullcalendar/vue3/themes/classic/theme.css";
import timeGridPlugin from "@fullcalendar/vue3/timegrid";
import tippy from "tippy.js";
import "tippy.js/themes/light-border.css";

const props = defineProps<{ eventSources: CalendarOptions["eventSources"] }>();

const options: CalendarOptions = {
  plugins: [
    themePlugin,
    timeGridPlugin,
    interactionPlugin,
    // The iCalendar plugin's v7 declaration incorrectly requires a URL for every source.
    iCalendarPlugin as unknown as PluginInput,
  ],
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
  <div class="calendar-theme">
    <FullCalendar :options="options" />
  </div>
</template>

<style scoped>
.calendar-theme {
  --fc-classic-background: oklch(var(--b1));
  --fc-classic-foreground: oklch(var(--bc));
  --fc-classic-faint: oklch(var(--bc) / 4%);
  --fc-classic-muted: oklch(var(--bc) / 8%);
  --fc-classic-strong: oklch(var(--bc) / 14%);
  --fc-classic-faint-foreground: oklch(var(--bc) / 50%);
  --fc-classic-muted-foreground: oklch(var(--bc) / 70%);
  --fc-classic-border: oklch(var(--bc) / 20%);
  --fc-classic-strong-border: oklch(var(--bc) / 40%);
}
</style>
