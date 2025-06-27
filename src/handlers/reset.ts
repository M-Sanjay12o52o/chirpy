import type { Request, Response } from "express";
import { config } from "../config.js";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

// - [ ] Update the `POST /admin/reset` endpoint to delete all users in the database.
// - [x] You'll need a new query for this. Add a new value to your `.env` file called `PLATFORM` and set it equal to "dev".

export async function handlerReset(_: Request, res: Response) {
  if (config.platform !== "dev") {
    res.status(403).send("Reset is only allowed in dev mode");
  }

  await db.delete(users);

  config.fileserverHits = 0;
  // res.send("Hits reset to 0");
  // res.end();

  res.send("All users deleted and file server hits reset.");
}
