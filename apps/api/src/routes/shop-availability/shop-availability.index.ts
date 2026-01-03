import { createRouter } from "@api/lib/create-app";
import * as handlers from "./shop-availability.handlers";
import * as routes from "./shop-availability.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.remove, handlers.remove);

export default router;
