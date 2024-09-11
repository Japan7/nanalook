export default defineEventHandler(async (event) => {
  const discord_id = getRouterParam(event, "user");
  if (!discord_id) {
    setResponseStatus(event, 400);
    return;
  }

  const config = useRuntimeConfig();

  const url = new URL(`${config.nanapiUrl}/calendar/ics`);
  url.searchParams.append("client", config.nanapiCustomClientUsername);
  url.searchParams.append("user", discord_id);
  url.searchParams.append("aggregate", "true");
  const ics = await $fetch<string>(url.toString());

  setHeader(event, "Content-Type", "text/calendar");
  return ics;
});
