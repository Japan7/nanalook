export default defineEventHandler(async (event) => {
  const discord_id = getRouterParam(event, "user");
  if (!discord_id) {
    setResponseStatus(event, 400);
    return;
  }

  const config = useRuntimeConfig();

  // fetch user calendar
  let userCalendar: string = "";
  const { data } = await authRetry(() =>
    nanapi.GET("/calendar/user_calendars/{discord_id}", {
      params: {
        path: {
          discord_id: discord_id as any,
        },
      },
    })
  );
  if (data !== undefined) {
    const icsUrl = data.ics.replace(/^webcal:/, "https:");
    userCalendar = await $fetch<string>(icsUrl);
  }

  // fetch guild calendar
  const url = new URL(`${config.nanapiUrl}/calendar/ics`);
  url.searchParams.append("client", config.nanapiCustomClientUsername);
  url.searchParams.append("user", discord_id);
  const guildCalendar = await $fetch<string>(url.toString());

  // dirty merge
  let ics = "";
  if (userCalendar) {
    let userLines = userCalendar.trim().split("\n");
    let guildLines = guildCalendar.trim().split("\n");
    ics = userLines.slice(0, -1).join("\n") + "\n";
    ics += "\n";
    ics += guildLines.slice(1).join("\n");
  } else {
    ics = guildCalendar;
  }

  setHeader(event, "Content-Type", "text/calendar");
  return ics;
});
