import crypto from "node:crypto";

export function generateSecret(length: number) {
  return crypto
    .randomBytes(length / 2)
    .toString("hex")
    .slice(0, length);
}
