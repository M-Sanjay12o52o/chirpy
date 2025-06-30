import type { NextFunction, Request, Response } from "express";
// import { respondWithError, respondWithJSON } from "../api/json.js";
// import { profaneRemove } from "../helper/profane.js";
import { BadRequestError, UnauthorizedError } from "../customErrors.js";
import { createChirp } from "../db/queries/chirps.js";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";

// export function handlerValidateChirps(
export async function handleCreateChirps(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // This is now an authenticated endpoint.
  // To post a chirp, a user needs to have a valid JWT.
  // The JWT will determine which user is posting the chirp.
  // - [x] Use the `getBearerToken` and `validateJWT` functions.
  // - [x] If the JWT is invalid, throw an appropriate error.

  const token = getBearerToken(req);
  const payload = validateJWT(token, config.secret);

  if (!payload) {
    // throw Error("Token not validted");
    res.status(401).json({ error: "Invalid token" });
  }

  try {
    const { body } = req.body;

    console.log("body: ", body);

    // const { body, userId } = req.body;

    if (typeof body == undefined) {
      throw new UnauthorizedError("The body is undefined.");
    }

    if (typeof body !== "string") {
      // throw new Error("Invalid body type");
      // throw new BadRequestError("Something went wrong on our end");
      throw new BadRequestError("Bla Bli Blu");
    }

    if (body.length > 140) {
      // throw new Error("Chirp is too long");
      throw new BadRequestError("Chirp is too long. Max length is 140");
    }

    //const cleanedBody = profaneRemove(body);

    // const result = await createChirp({ body, userId });
    const result = await createChirp({
      body,
      userId: payload.sub!,
    });

    // res.status(200).json({ cleanedBody });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
