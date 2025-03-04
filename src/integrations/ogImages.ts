import type { AstroIntegration } from "astro";
import { envField } from "astro/config";
import { OG_IMAGES_ENV_NAME } from "../lib/og-image/constants";
import { ENV, IS_GITHUB_CI } from "../lib/env";

export function ogImagesIntegration(): AstroIntegration {
  return {
    name: "astro-og-images",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          env: {
            schema: {
              [OG_IMAGES_ENV_NAME]: envField.string({
                context: "server",
                access: "secret",
                optional: true,
              }),
            },
          },
        });
      },
      "astro:config:done": ({ logger }) => {
        if (!ENV[OG_IMAGES_ENV_NAME]) {
          // Only require the secret in Vercel production deployments
          if (ENV.VERCEL === "1" && !IS_GITHUB_CI) {
            throw new Error(`${OG_IMAGES_ENV_NAME} must be set in Vercel deployments.`);
          }

          logger.warn(
            `${OG_IMAGES_ENV_NAME} is not set. OG image generation is disabled for this build (enabled in production).`,
          );
        }
      },
    },
  };
}
