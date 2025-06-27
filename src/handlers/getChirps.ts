import { asc } from "drizzle-orm";
import { db } from "../db/index.js";
import type { Request, Response } from "express";

/*
The returned json doesn't contain all the chirps.
*/

export async function handlerGetChirps(_: Request, res: Response) {
  const result = await db.query.chirps.findMany({
    // orderBy: (c) => [c.createdAt.asc],
    orderBy: (user) => [asc(user.createdAt)],
  });

  res.status(200).json(result);
}
