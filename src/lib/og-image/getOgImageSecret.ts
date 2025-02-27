import * as astroEnv from "astro:env/server";
import { invariant } from "../invariant";
import { OGImageError } from "./errors";
import { ENV_NAME } from "./constants.mjs";

export function getOgImageSecret(): Uint8Array {
  // We don't use `getSecret` here, because it doesn't return default value if the secret isn't specified
  const secret = astroEnv[ENV_NAME];
  invariant(secret, new OGImageError("Secret isn't specified"));
  return new TextEncoder().encode(secret);
}
