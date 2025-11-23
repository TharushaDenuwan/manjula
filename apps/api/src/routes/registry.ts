import { createRouter } from "@api/lib/create-app";
import { AppOpenAPI } from "@api/types";

import { BASE_PATH } from "../lib/constants";

import index from "./index.route";
import media from "./media/media.index";

import contact from "./contact/contact.index";
import order from "./order/order.index";
import post from "./post/post.index";
import product from "./product/product.index";
import reviwe from "./reviwe/reviwe.index";
import system from "./system/system.index";
import tasks from "./tasks/tasks.index";

export function registerRoutes(app: AppOpenAPI) {
  return app
    .route("/", index)
    .route("/tasks", tasks)
    .route("/system", system)
    .route("/media", media)
    .route("/posts", post)
    .route("/reviwes", reviwe)
    .route("/contacts", contact)
    .route("/orders", order)
    .route("/products", product);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath(BASE_PATH));

export type Router = typeof router;
