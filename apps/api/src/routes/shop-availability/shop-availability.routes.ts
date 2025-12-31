import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import {
    errorMessageSchema,
    queryParamsSchema
} from "@api/lib/helpers";
import {
    shopClosedDaysInsertSchema,
    shopClosedDaysSchema
} from "./shop-availability.schema";

const tags: string[] = ["Shop Availability"];

export const list = createRoute({
  tags,
  summary: "List all shop closed days",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(shopClosedDaysSchema),
      "The list of shop closed days"
    ),
  },
});

export const create = createRoute({
  tags,
  summary: "Create shop closed days",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(shopClosedDaysInsertSchema, "Range of days to close"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(shopClosedDaysSchema, "The record created"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

export const remove = createRoute({
  method: "delete",
  path: "/:id",
  tags,
  summary: "Delete a shop closed days record",
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Record deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type RemoveRoute = typeof remove;
