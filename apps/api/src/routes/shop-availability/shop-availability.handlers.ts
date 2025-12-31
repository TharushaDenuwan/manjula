import { db } from "@api/db";
import { shopClosedDays } from "@repo/database";
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import { AppRouteHandler } from "@api/types";
import { CreateRoute, ListRoute, RemoveRoute } from "./shop-availability.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const data = await db.query.shopClosedDays.findMany({
    orderBy: (closed, { desc }) => [desc(closed.startDate)],
  });

  return c.json(data, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
  const user = c.get("user");

  if (!user || user.role !== "admin") {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [inserted] = await db
    .insert(shopClosedDays)
    .values({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const user = c.get("user");

  if (!user || user.role !== "admin") {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const result = await db.delete(shopClosedDays).where(eq(shopClosedDays.id, id));

  if (result.rowCount === 0) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
