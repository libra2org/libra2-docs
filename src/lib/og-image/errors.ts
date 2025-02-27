export class OGImageError extends Error {
  constructor(message: string) {
    super(`[OGImage]: ${message}`);
    this.name = "OGImageError";
  }
}
