import type { EventSourceInput } from "@fullcalendar/core/index.js";
import uniqolor from "uniqolor";

export function toEventSources(users: User[]) {
  return users
    .toSorted((a, b) => a.discord_username.localeCompare(b.discord_username))
    .map(
      (p) =>
        ({
          id: p.discord_username,
          url: `/api/calendars/${p.discord_id}`,
          format: "ics",
          color: uniqolor(p.discord_id).color,
        } satisfies EventSourceInput)
    );
}
