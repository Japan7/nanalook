import type { FetchResponse, Middleware } from "openapi-fetch";
import createClient from "openapi-fetch";
import type { paths } from "./nanapi";

const config = useRuntimeConfig();

let access_token = "";

const authMiddleware: Middleware = {
  onRequest: async ({ request }) => {
    if (!access_token) {
      access_token = await getToken();
    }
    request.headers.set("Authorization", `Bearer ${access_token}`);
    return request;
  },
};

async function getToken() {
  const formData = new FormData();
  formData.append("grant_type", "password");
  formData.append("username", config.nanapiClientUsername);
  formData.append("password", config.nanapiClientPassword);
  const { access_token } = await $fetch<{ access_token: string }>(
    "/clients/token",
    {
      baseURL: config.nanapiUrl,
      method: "POST",
      body: formData,
    }
  );
  return access_token;
}

export async function authRetry<T extends FetchResponse<any, any, any>>(
  makeReq: () => Promise<T>
) {
  let res;
  while (true) {
    res = await makeReq();
    if (res.response.status === 401) {
      access_token = "";
    } else {
      return res;
    }
  }
}

export const nanapi = createClient<paths>({ baseUrl: config.nanapiUrl });
nanapi.use(authMiddleware);
