import type { NextFunction, Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../customErrors.js";
import { db } from "../db/index.js";
import { chirps, refresh_tokens, users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { config } from "../config.js";

export async function handleDelete(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // - [x] add a new delete route /api/chirps/:chirpID route to your server that deletes a chirp from the database by its `id`.
    const accessToken = getBearerToken(req);
    if (!accessToken) throw new UnauthorizedError("Missing access token");

    const params = req.params;
    const chirpId = params.chirpID;
    const payload = validateJWT(accessToken, config.secret);

    if (!payload) {
      throw new UnauthorizedError("Invalid token.");
    }

    const userId = payload.sub!;

    const chirp = await db.query.chirps.findFirst({
      where: eq(chirps.id, chirpId),
    });

    const allUsers = await db.select().from(users);
    console.log("allUsers: ", allUsers);

    console.log("chirp: ", chirp);
    console.log("userId: ", userId);

    // - [x] If the chirp is not found, return a `404` status code.
    if (!chirp) {
      throw new NotFoundError("Chirp not found.");
    }

    // - [x] This is an authenticated endpoint, so be sure to check the token in the header. Only allow the deletion of a chirp if the user is the author of the chirp.
    // - [x] If they are not, return a `403` status code.
    if (chirp.userId !== userId) {
      throw new ForbiddenError("Not your chirp");
    }

    await db.delete(chirps).where(eq(chirps.id, chirpId));
    // - [x] If the chirp is deleted successfully, return a `204` status code.
    console.log("Deleting chirp, sending 204");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
