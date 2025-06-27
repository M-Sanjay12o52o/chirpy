import type { NextFunction, Request, Response } from "express";
import { checkPasswordHash } from "../auth.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { NewUser } from "../db/schema.js";
import { users } from "../db/schema.js";

export type UserResponse = Omit<NewUser, "hashed_password">;

export async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

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

  if (match && user) {
    const { hashed_password, ...safeUser } = user;
    res.status(200).json(safeUser as UserResponse);
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
