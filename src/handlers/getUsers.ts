import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import type { Request, Response } from "express";
import { chirps } from "../db/schema.js";

/*
The returned json doesn't contain all the chirps.
*/

export async function handlerGetUsers(req: Request, res: Response) {
  try {
    const usersRaw = await db.query.users.findMany();
    // const users = usersRaw.map((user) => ({
    //   ...user,
    //   isChirpyRed: user.is_chirpy_red,
    // }));

    // res.status(200).json(users);
    res.status(200).json(usersRaw);
  } catch (error) {
    res.status(404).json({
      error: "Not found",
    });
  }
}
