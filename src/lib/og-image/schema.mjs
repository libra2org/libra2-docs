// @ts-check
import { envField } from "astro/config";
import { IS_GITHUB_CI } from "../ci.mjs";
import { ENV_NAME } from "./constants.mjs";

export function getEnvsSchema() {
  return {
    [ENV_NAME]: envField.string({
      context: "server",
      access: "secret",
      optional: IS_GITHUB_CI,
    }),
  };
}
