import type { NextFunction, Request, Response } from "express";
import { getBearerToken, hashPassword, validateJWT } from "../auth.js";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { BadRequestError, UnauthorizedError } from "../customErrors.js";

export async function handleUserupdate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // endpoint for users to update their own (but not others') email and password
    // it requires:
    // - [x] an access token in the header
    // - [x] a new `password` and `email` in the request body

    const accessToken = getBearerToken(req);
    // - [x] if the access token is malformed or missing, respond with a `401` status code.
    if (!accessToken) throw new UnauthorizedError("Missing access token");

    console.log("-----Start-----");
    console.log("accessToken: ", accessToken);
    console.log("-----End------");

    // const secret = "supersecretkey";
    const secret = process.env.SECRET;
    const { sub: userId } = validateJWT(accessToken, secret!);
    const { email, password } = req.body;

    if (!email || !password || !userId)
      throw new BadRequestError("Missing email or password");

    // - [x] hash the password, then update the hashed papssword and the email for the authenticated user in the db.
    // - [x] respond with a `200` if everything is successful and the newly updated `User` resource (omitting the password, of course)
    const hashed_password = await hashPassword(password);
    const now = new Date();

    await db
      .update(users)
      .set({
        email,
        hashed_password,
        updatedAt: now,
      })
      .where(eq(users.id, userId));

    const [updatedUser] = await db
      .select({ id: users.id, email: users.email, createdAt: users.createdAt })
      .from(users)
      .where(eq(users.id, userId));

    res.status(200).json(updatedUser);
    return;
  } catch (error) {
    next(error);
  }
}
