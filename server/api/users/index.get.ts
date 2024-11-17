export default defineEventHandler(async () => {
  const { data } = await authRetry(() => nanapi.GET("/user/accounts"));
  if (data === undefined) {
    throw new Error("Failed to fetch user accounts");
  }
  return data;
});
