export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    setResponseStatus(event, 400);
    return;
  }
  const config = useRuntimeConfig();
  const { data } = await authRetry(() =>
    nanapi.GET("/projections/{id}", {
      params: {
        path: { id },
        query: {
          client_id: config.nanapiCustomClientId,
        },
      },
    })
  );
  if (data === undefined) {
    setResponseStatus(event, 404);
    return;
  }
  return data;
});
