import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export async function hashPassword(password: string) {
  const hashed_password = await bcrypt.hash(password, 10);

  return hashed_password;
}

export async function checkPasswordHash(password: string, hash: string) {
  const result = bcrypt.compare(password, hash);

  return result;
}

// - [x] Create a `makeJWT` function - function makeJWT(userID: string, expiresIn: number, secret: string): string;
// - [x] Use `jwt.sign(payload, secret, [options])`
// - [x] Use - type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">; to narrow the `JwtPayload` type down to the keys we care about:

/*
- `iss`: is the issuer of the token. Set this to `chirpy`
- `sub`: is the subject of the token, which is the user's ID.
- `iat`: is the time the token was issued. Use `Math.floor(Date.now() / 1000)` to get the current time in seconds.
- `exp`: is the time the token expires. Use `iat + expiresIn` to set the expiration.
*/

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

export function validateJWT(tokenString: string, secret: string): string {
  const result = jwt.verify(tokenString, secret);

  console.log("result: ", result);

  return "";
}
