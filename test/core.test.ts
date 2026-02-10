import isJwtExpired, { isJwtExpired as namedExport } from "../src/index";

// Helper to create a JWT with a specific exp claim
function createToken(exp: number): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ exp }));
  const signature = "test-signature";
  return `${header}.${payload}.${signature}`;
}

describe("isJwtExpired", () => {
  it("returns true for an expired token", () => {
    const pastExp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
    const token = createToken(pastExp);
    expect(isJwtExpired(token)).toBe(true);
  });

  it("returns false for a valid (non-expired) token", () => {
    const futureExp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const token = createToken(futureExp);
    expect(isJwtExpired(token)).toBe(false);
  });

  it("returns true when token expires within skew window", () => {
    const nearExp = Math.floor(Date.now() / 1000) + 15; // 15 seconds from now
    const token = createToken(nearExp);
    expect(isJwtExpired(token, 30)).toBe(true); // default skew is 30s
  });

  it("returns false when token expires outside skew window", () => {
    const nearExp = Math.floor(Date.now() / 1000) + 60; // 60 seconds from now
    const token = createToken(nearExp);
    expect(isJwtExpired(token, 30)).toBe(false);
  });

  it("returns true for an invalid token", () => {
    expect(isJwtExpired("invalid-token")).toBe(true);
  });

  it("returns true for a token without exp claim", () => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ sub: "user123" })); // no exp
    const token = `${header}.${payload}.signature`;
    expect(isJwtExpired(token)).toBe(true);
  });

  it("default export equals named export", () => {
    expect(isJwtExpired).toBe(namedExport);
  });
});
