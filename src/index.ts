import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  exp: number; // expiration time in seconds
  [key: string]: any;
};

/**
 * Check if the jwt token is expired
 * @param token jwt token to be verified in string format
 * @param skewSeconds number of seconds to consider the token expired before actual expiration (default: 30 seconds)
 * @returns True if the token has expired
 */
export function isJwtExpired(token: string, skewSeconds = 30): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now + skewSeconds;
  } catch {
    return true;
  }
}

export default isJwtExpired;
