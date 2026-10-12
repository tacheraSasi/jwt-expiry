import { jwtDecode, type JwtPayload as JwtDecodePayload } from "jwt-decode";

/**
 * Re-exported from `jwt-decode` for convenience. `exp` is optional because
 * tokens without an expiration claim are valid per RFC 7519.
 */
export type JwtPayload = JwtDecodePayload;

/**
 * Checks whether a JWT is expired (or close enough to expiry that it should
 * not be used).
 *
 * This only decodes the token; it does **not** verify the signature. Use it
 * for client-side decisions such as refreshing a token, never for
 * authorization on a server.
 *
 * @param token JWT in compact serialization (string) form
 * @param skewSeconds Seconds before the actual `exp` to treat the token as expired (default: 30)
 * @returns `true` if the token is expired, malformed, has a non-numeric `exp`,
 *          or expires within the skew window
 */
export function isJwtExpired(token: string, skewSeconds = 30): boolean {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (typeof exp !== "number" || !Number.isFinite(exp)) return true;
    const skew =
      Number.isFinite(skewSeconds) && skewSeconds > 0 ? skewSeconds : 0;
    return exp <= Math.floor(Date.now() / 1000) + skew;
  } catch {
    return true;
  }
}

export default isJwtExpired;
