import { NextFunction, Request, Response } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function handlePolkaWebhooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // - [ ] Add a database query that upgrades a user to chirpy red based on their ID.
  // This accepts a request of this shape:
  /*
  {
  "event": "user.upgraded",
  "data": {
    "userId": "3311741c-680c-4546-99f3-fc9efac2036c"
    }
  }
  */

  const { event, data } = req.body;
  const userId = data.userId;

  // - [x] if the `event` is anything other than `user.upgraded`, the endpoint should
  // immediately respond with a `204` status code - we don't care about any other events.

  if (event !== "user.upgraded") {
    res.status(204).end();
    return;
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  // - [x] If the user can't be found, the endpoint should respond with a `404` status code.
  if (!existingUser) {
    res.status(404).end();
    return;
  }

  // - [x] if the `event` is `user.upgraded`, then it should update the user in the database, and mark that they are a Chirpy Red member.
  try {
    if (event == "user.upgraded") {
      await db
        .update(users)
        .set({
          // is_chirpy_red: true,
          isChirpyRed: true,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
    }

    // - [x] if the user is upgraded successfully, the endpoint should respond with a `204` status code and an empty response body.
    res.status(204).json({});
    return;
  } catch (error) {
    next(error);
  }

  // NOTE: Polka uses the response code to know whether the webhook was received successfully. If the response code is anything other than `2xx`, they'll retry the request.
  // - [ ] Update all endpoints that return user resources to include the `is_chirpy_red` field.
}
