import { asc, desc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import type { Request, Response } from "express";
import { chirps, users } from "../db/schema.js";

/*
The returned json doesn't contain all the chirps.
*/

// - [x] This should accept an optional query parameter called `authorId`.
// - [x] If the `authorId` query parameter is provided, the endpoint should return only the chirps for that author.
// - [x] If the `authorId` query parameter is not provided, the endpoint should return all chirps as it did before.

export async function handlerGetChirps(req: Request, res: Response) {
  const authorId = req.query.authorId as string | undefined;
  const sort = (req.query.sort as "asc" | "desc") || "asc";

  if (authorId) {
    const result = await db.query.chirps.findMany({
      // orderBy: (c) => [c.createdAt.asc],
      where: eq(chirps.userId, authorId),
      orderBy: (user) => [
        sort === "asc" ? asc(user.createdAt) : desc(user.createdAt),
      ],
    });

    res.status(200).json(result);
  } else {
    const result = await db.query.chirps.findMany({
      // orderBy: (c) => [c.createdAt.asc],
      // orderBy: (user) => [asc(user.createdAt)],
      orderBy: (user) => [
        sort === "asc" ? asc(user.createdAt) : desc(user.createdAt),
      ],
    });

    res.status(200).json(result);
  }
}
