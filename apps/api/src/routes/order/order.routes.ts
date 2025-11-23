import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import {
  errorMessageSchema,
  getPaginatedSchema,
  queryParamsSchema,
  stringIdParamSchema,
} from "@api/lib/helpers";
import {
  orderInsertSchema,
  ordersSchema,
  orderUpdateSchema,
} from "./order.schema";

const tags: string[] = ["Order"];

// List route definition
export const list = createRoute({
  tags,
  summary: "List all orders",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(ordersSchema)),
      "The list of orders"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Get by ID route definition
export const getById = createRoute({
  tags,
  summary: "Get order by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ordersSchema, "The order item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Order not found"
    ),
  },
});

// Create Order route definition
export const create = createRoute({
  tags,
  summary: "Create order",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(orderInsertSchema, "Create new order"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(ordersSchema, "The order created"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Order not created"
    ),
  },
});

// Update order route definition
export const update = createRoute({
  tags,
  summary: "Update Order",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      orderUpdateSchema,
      "Update order details schema"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(orderUpdateSchema, "The order item"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

export const remove = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Order"],
  summary: "Delete an order",
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Order deleted",
    },
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
  },
});

// Export types
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
