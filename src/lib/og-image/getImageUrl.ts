import { SignJWT } from "jose";
import { getOgImageSecret } from "./getOgImageSecret";

export async function getImageUrl(
  endpointUrl: URL,
  options: Record<string, unknown>,
): Promise<string> {
  const signedJWTToken = await new SignJWT(options)
    .setProtectedHeader({ alg: "HS256" })
    .sign(getOgImageSecret());
  const finalUrl = new URL(endpointUrl);

  finalUrl.searchParams.set("token", signedJWTToken);

  return finalUrl.toString();
}
