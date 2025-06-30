import type { NextFunction, Request, Response } from "express";
import { getBearerToken } from "../auth.js";
import { db } from "../db/index.js";
import { refresh_tokens } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function handleRevoke(
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

    const now = new Date();

    await db
      .update(refresh_tokens)
      .set({
        revoked_at: now,
        updatedAt: now,
      })
      .where(eq(refresh_tokens.token, token));

    res.status(204).send();
    return;
  } catch (error) {
    console.error("Revoke error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
}
