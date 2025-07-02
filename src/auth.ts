import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";
import crypto from "crypto";

export async function hashPassword(password: string) {
  const hashed_password = await bcrypt.hash(password, 10);

  return hashed_password;
}

export async function checkPasswordHash(password: string, hash: string) {
  const result = bcrypt.compare(password, hash);

  return result;
}

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function makeJWT(
  userID: string,
  expiresIn: number,
  secret: string
): string {
  const iat = Math.floor(Date.now() / 1000);
  const payload: payload = {
    iss: "chirpy",
    sub: userID,
    iat,
    exp: iat + expiresIn,
  };

  return jwt.sign(payload, secret);
}

// - [x] Add a `validateJWT` function
// - [ ] Use the `jwt.verify(token, secret)` function to validate the
// signature of the JWT and extract the decoded token payload.
// - [ ] It will throw an error if the token is invalid or has expired.
// - [ ] If the token is invalid, throw a suitable error.
// - [ ] Return the user's `id` from the token (which should be stored in the `sub` field).

// export function validateJWT(tokenString: string, secret: string): string {
//   const result = jwt.verify(tokenString, secret);

//   console.log("result: ", result);

//   return "";
// }

export function validateJWT(tokenString: string, secret: string): JwtPayload {
  const decoded = jwt.verify(tokenString, secret);
  if (typeof decoded === "string") throw new Error("Invalid token");
  return decoded;
}

// Auth information will come into our server in the `Authorization`
// header. Its value will look like this:
// Bearer TOKEN_STRING
export function getBearerToken(req: Request): string {
  // - [x] Should look for the Authorization header in the request
  // - [x] and return the `TOKEN_STRING` if it exists (stripping off the `Bearer` prefix and whitespace).
  // We can use the request's `.get` method.
  // - [x] If the header doesn't exist, throw an error.
  // - [ ] Write unit tests.

  const authHeader = req.get("Authorization");

  console.log("authHeader: ", authHeader);

  console.log("authHeader.split(' ')[1]:", authHeader?.split(" ")[1]);

  if (!authHeader) {
    throw Error("Header not present");
  }

  return authHeader.split(" ")[1];
}

export function makeRefreshToken() {
  const refresh_tokens = crypto.randomBytes(32).toString("hex");

  return refresh_tokens;
}

export function getAPIKey(req: Request) {
  const authHeader = req.header("Authorization");

  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "ApiKey") return null;

  return parts[1];
}
