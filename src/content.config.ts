import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  // TODO: Find the root of errors later

  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
