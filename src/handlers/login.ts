import type { NextFunction, Request, Response } from "express";
import { checkPasswordHash, makeJWT, makeRefreshToken } from "../auth.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { NewUser, refresh_tokens } from "../db/schema.js";
import { users } from "../db/schema.js";
import { config } from "../config.js";

export type UserResponse = Omit<NewUser, "hashed_password">;

export async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "User or Password missing",
    });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user) {
      const match = await checkPasswordHash(password, user.hashed_password);

      if (match) {
        // - [ ] Make sure whether access tokens (JWTs) expires after 1 hours.
        // - [ ] Make sure refresh tokens expire after 60 days.
        // - [ ] And also make sure the expiration time is also stored in the database.
        // - [ ] The `revoked_at` field should be `null` when the token is created.

        // Questions:
        // - [ ] Should refresh token change on each login?
        const accessTokenExpiry = 60 * 60;
        const refreshTokenExpiry = 60 * 24 * 60 * 60 * 1000;

        console.log("---Start---");
        console.log("accessTokenExpiry: ", accessTokenExpiry);
        console.log("refreshTokenExpiry: ", refreshTokenExpiry);
        console.log("---End---");

        const accessToken = makeJWT(user.id, accessTokenExpiry, config.secret);
        const refreshToken = makeRefreshToken();

        console.log("---Start---");
        console.log("accessToken: ", accessToken);
        console.log("refreshToken: ", refreshToken);
        console.log("---End---");

        await db.insert(refresh_tokens).values({
          token: refreshToken,
          userId: user.id,
          expires_at: new Date(Date.now() + refreshTokenExpiry),
          revoked_at: null,
        });

        const { hashed_password, ...safeUser } = user;

        // - [ ] update to return a refresh token, as well as an access token
        res.status(200).json({
          ...(safeUser as UserResponse),
          token: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.status(401).json("Email or Password does not match");
      }
    } else {
      res.status(401).json("Email or Password does not match");
    }
  } catch (error) {
    console.error("Login error:", error);
    // res.status(401).json("Email or Password does not match");
    res.status(500).json("Internal Server Error");
  }
}
