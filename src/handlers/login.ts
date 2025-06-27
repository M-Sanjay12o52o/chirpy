import type { NextFunction, Request, Response } from "express";
import { checkPasswordHash, makeJWT } from "../auth.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { NewUser } from "../db/schema.js";
import { users } from "../db/schema.js";
import { config } from "../config.js";

export type UserResponse = Omit<NewUser, "hashed_password">;

export async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  let expiresInSeconds = req.body.expiresInSeconds ?? 3600;

  if (expiresInSeconds > 3600) {
    expiresInSeconds = 3600;
  }

  if (!email || !password) {
    res.status(400).json({
      error: "User or Password missing",
    });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  const hashed_password = user?.hashed_password;

  const match = await checkPasswordHash(password, hashed_password!);

  console.log("---Start---");
  console.log("email: ", email);
  console.log("password: ", password);
  console.log("user: ", user);
  console.log("hashed_password: ", hashed_password);
  console.log("match: ", match);
  console.log("---End---");

  /*
  {
  "id": "5a47789c-a617-444a-8a80-b50359247804",
  "createdAt": "2021-07-01T00:00:00Z",
  "updatedAt": "2021-07-01T00:00:00Z",
  "email": "lane@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
  */

  // - [x] Once you have the token, respond to the request with
  // a `200` code and this body shape:

  if (match && user) {
    const token = makeJWT(user.id, expiresInSeconds, config.secret);
    const { hashed_password, ...safeUser } = user;

    res.status(200).json({
      ...(safeUser as UserResponse),
      token,
    });
  } else {
    res.status(401).json("Email or Password does not match.");
  }
}

/*
if (match) {
  const { hashed_password, ...safeUser } = user!;
  res.status(200).json(safeUser as UserResponse);
}
*/
