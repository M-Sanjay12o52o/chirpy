import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import type { Request, Response } from "express";
import { chirps } from "../db/schema.js";

/*
The returned json doesn't contain all the chirps.
*/

export async function handlerGetChirp(req: Request, res: Response) {
  try {
    const params = req.params;
    const chirpId = params.chirpId;

    if (!chirpId) {
      res.status(400).json({ error: "Chirp ID is required" });
    }

    console.log("chirpId: ", chirpId);

    const result = await db.query.chirps.findFirst({
      where: eq(chirps.id, chirpId),
    });

    console.log("result: ", result);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: "Not found",
    });
  }
}
