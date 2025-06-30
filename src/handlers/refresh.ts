import type { NextFunction, Request, Response } from "express";
import { getBearerToken, makeJWT } from "../auth.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { refresh_tokens, users } from "../db/schema.js";
import { config } from "../config.js";

export async function handleRefresh(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = getBearerToken(req);
    if (!token) {
      res.status(401).json({ error: "Missing token" });
      return;
    }

    // ? In what case does this return something.
    const db_refresh_tokens = await db.query.refresh_tokens.findFirst({
      where: (refresh_tokens, { eq }) => eq(refresh_tokens.token, token),
    });

    const now = new Date();

    if (
      !db_refresh_tokens ||
      db_refresh_tokens.expires_at < now ||
      db_refresh_tokens.revoked_at !== null
    ) {
      res
        .status(401)
        .json({ error: "Invalid, expired, or revoked refresh token" });
      return;
    }

    const user = await db.query.users.findFirst({
      // where: (users, { eq }) => eq(users.id, db_refresh_tokens?.userId),
      where: eq(users.id, db_refresh_tokens?.userId),
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const accessToken = makeJWT(user.id, 60 * 60, config.secret);

    console.log("-----Start-----");
    console.log("db_refresh_tokens: ", db_refresh_tokens?.token);
    // console.log("db_refresh_tokens: ", db_refresh_tokens?.createdAt);
    // console.log("db_refresh_tokens: ", db_refresh_tokens?.updatedAt);
    // console.log("db_refresh_tokens: ", db_refresh_tokens?.userId);
    // console.log("db_refresh_tokens: ", db_refresh_tokens?.expires_at);
    // console.log("db_refresh_tokens: ", db_refresh_tokens?.revoked_at);
    console.log("-----End------");

    res.status(200).json({
      token: accessToken,
    });
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
