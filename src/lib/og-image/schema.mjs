// @ts-check
import { envField } from "astro/config";
import { generateSecret } from "../secrets";
import { ENV_NAME } from "./constants.mjs";

export function getEnvsSchema(withFallback = true) {
  return {
    [ENV_NAME]: envField.string({
      context: "server",
      access: "secret",
      default: withFallback ? generateSecret(20) : undefined,
    }),
  };
}
