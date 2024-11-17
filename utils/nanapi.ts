import type { InternalApi as _InternalApi } from "nitropack";

type InternalApi<
  P extends keyof _InternalApi,
  M extends keyof _InternalApi[P]
> = _InternalApi[P][M] extends infer T | undefined ? T : never;

export type Projection = InternalApi<"/api/projections/:id", "get">;
export type User = InternalApi<"/api/users", "get">[number];
