import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import type { Request, Response } from "express";
import { chirps } from "../db/schema.js";

/*
The returned json doesn't contain all the chirps.
*/

export async function handlerGetUsers(req: Request, res: Response) {
  try {
    const users = await db.query.users.findMany();

    console.log("users: ", users);

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      error: "Not found",
    });
  }
}
