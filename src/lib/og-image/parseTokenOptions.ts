import type { z } from "astro:schema";
import { jwtVerify } from "jose";
import { invariant } from "../invariant";
import { getOgImageSecret } from "./getOgImageSecret";
import { OGImageError } from "./errors";

export async function parseTokenOptions<Schema extends z.AnyZodObject>(
  signedJWTToken: string | null,
  schema: Schema,
): Promise<z.infer<Schema>> {
  invariant(signedJWTToken, new OGImageError("Token isn't specified"));
  const verifiedJWT = await jwtVerify(signedJWTToken, getOgImageSecret());

  return schema.parse(verifiedJWT.payload);
}
