import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

function makeJWT(userID: string, expiresIn: number, secret: string): string {
  const iat = Math.floor(Date.now() / 1000);
  const payload: payload = {
    iss: "chirpy",
    sub: userID,
    iat,
    exp: iat + expiresIn,
  };

  return jwt.sign(payload, secret);
}

const userID = "12345";
const expiresIn = 60 * 60; // 1 hour in seconds
const secret = "supersecretkey";

const result = makeJWT(userID, expiresIn, secret);

console.log("-----START-----");
console.log("result: ", result);
console.log("-----STOP-----");

// - [x] Add a `validateJWT` function
// - [x] Use the `jwt.verify(token, secret)` function to validate the
// signature of the JWT and extract the decoded token payload.
// - [ ] It will throw an error if the token is invalid or has expired.
// - [ ] If the token is invalid, throw a suitable error.
// - [ ] Return the user's `id` from the token (which should be stored in the `sub` field).
function validateJWT(tokenString: string, secret: string): string {
  try {
    const decoded_token = jwt.verify(tokenString, secret);

    if (typeof decoded_token === "object" && "sub" in decoded_token) {
      return decoded_token.sub as string;
    }

    throw new Error("Invalid token payload structure");
  } catch (error) {
    throw error;
  }
}

const result2 = validateJWT(result, secret);

console.log("-----START-----");
console.log("result2: ", result2);
console.log("-----STOP-----");

const test_var = "akljdklsfa";

const result3 = validateJWT(test_var, secret);

console.log("-----START-----");
console.log("result2: ", result3);
console.log("-----STOP-----");
