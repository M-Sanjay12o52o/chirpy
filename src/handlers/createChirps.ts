import type { NextFunction, Request, Response } from "express";
// import { respondWithError, respondWithJSON } from "../api/json.js";
// import { profaneRemove } from "../helper/profane.js";
import { BadRequestError } from "../customErrors.js";
import { createChirp } from "../db/queries/chirps.js";

// export function handlerValidateChirps(
export async function handleCreateChirps(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const { body } = req.body;

    const { body, userId } = req.body;

    console.log("body value:", body, "typeof:", typeof body);

    if (typeof body !== "string") {
      // throw new Error("Invalid body type");
      throw new Error("Something went wrong on our end");
    }

    if (body.length > 140) {
      // throw new Error("Chirp is too long");
      throw new BadRequestError("Chirp is too long. Max length is 140");
    }

    //const cleanedBody = profaneRemove(body);

    const result = await createChirp({ body, userId });

    // res.status(200).json({ cleanedBody });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
