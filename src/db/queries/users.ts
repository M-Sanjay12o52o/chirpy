import { db } from "../index.js";
import { NewUser, users } from "../schema.js";

export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values({ ...user, hashed_password: user.hashed_password })
    .onConflictDoNothing()
    .returning();
  return result;
}
