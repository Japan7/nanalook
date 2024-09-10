export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const { data } = await authRetry(() =>
    nanapi.GET("/projections/", {
      params: {
        query: {
          client_id: config.nanapiCustomClientId,
          status: "ONGOING",
        },
      },
    })
  );
  if (data === undefined) {
    throw new Error("Failed to fetch projections");
  }
  return data;
});
