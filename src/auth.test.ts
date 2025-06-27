import { describe, it, expect, beforeAll } from "vitest";
import { checkPasswordHash, hashPassword, makeJWT, validateJWT } from "./auth";

// This makes sure that we can create and validate JWTs,
// expired tokens are rejected, and JWTs
// signed with the wrong secret are rejected.

// test for password hashing.
describe("Password Hashing", () => {
  const password1 = "correctPassword123!";
  const password2 = "anotherPassword456!";
  let hash1: string;
  let hash2: string;

  beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
  });

  it("should return true for the correct passwod", async () => {
    const result = await checkPasswordHash(password1, hash1);
    expect(result).toBe(true);
  });

  it("should return false for the incorrect passwod", async () => {
    const result = await checkPasswordHash(password1, hash2);
    expect(result).toBe(false);
  });

  it("should generate different hashes for different passwords", async () => {
    expect(hash1).not.toBe(hash2);
  });

  it("should generate different hashes for same password (due to salt)", async () => {
    const hash1Again = await hashPassword(password1);
    expect(hash1Again).not.toBe(hash1);
  });
});
