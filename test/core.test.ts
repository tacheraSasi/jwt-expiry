import isJwtExpired, { isJwtExpired as namedExport } from "../src/index";

const NOW_SECONDS = 1_700_000_000;

function base64Url(input: string): string {
  return Buffer.from(input, "utf-8").toString("base64url");
}

function createToken(payload: Record<string, unknown>): string {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64Url(JSON.stringify(payload));
  return `${header}.${body}.test-signature`;
}

describe("isJwtExpired", () => {
  beforeEach(() => {
    jest.spyOn(Date, "now").mockReturnValue(NOW_SECONDS * 1000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns true for an expired token", () => {
    expect(isJwtExpired(createToken({ exp: NOW_SECONDS - 3600 }))).toBe(true);
  });

  it("returns false for a valid (non-expired) token", () => {
    expect(isJwtExpired(createToken({ exp: NOW_SECONDS + 3600 }))).toBe(false);
  });

  it("returns true when the token expires within the skew window", () => {
    expect(isJwtExpired(createToken({ exp: NOW_SECONDS + 15 }), 30)).toBe(true);
  });

  it("returns false when the token expires outside the skew window", () => {
    expect(isJwtExpired(createToken({ exp: NOW_SECONDS + 60 }), 30)).toBe(false);
  });

  it("treats a token expiring exactly at now + skew as expired", () => {
    expect(isJwtExpired(createToken({ exp: NOW_SECONDS + 30 }), 30)).toBe(true);
  });

  it("treats a token expiring exactly now as expired", () => {
    expect(isJwtExpired(createToken({ exp: NOW_SECONDS }), 0)).toBe(true);
  });

  it("uses a 30 second skew by default", () => {
    expect(isJwtExpired(createToken({ exp: NOW_SECONDS + 29 }))).toBe(true);
    expect(isJwtExpired(createToken({ exp: NOW_SECONDS + 31 }))).toBe(false);
  });

  it("treats a non-numeric exp claim as expired", () => {
    expect(isJwtExpired(createToken({ exp: String(NOW_SECONDS + 3600) }))).toBe(
      true,
    );
  });

  it("treats a null exp claim as expired", () => {
    expect(isJwtExpired(createToken({ exp: null }))).toBe(true);
  });

  it("treats negative or non-finite skew as no skew", () => {
    const expiringSoon = createToken({ exp: NOW_SECONDS + 5 });
    expect(isJwtExpired(expiringSoon, -60)).toBe(false);
    expect(isJwtExpired(expiringSoon, Number.NaN)).toBe(false);
  });

  it("returns true for an invalid token", () => {
    expect(isJwtExpired("invalid-token")).toBe(true);
    expect(isJwtExpired("")).toBe(true);
  });

  it("returns true for a token whose payload is not valid JSON", () => {
    expect(isJwtExpired(`a.${base64Url("not-json")}.c`)).toBe(true);
  });

  it("returns true for a token without an exp claim", () => {
    expect(isJwtExpired(createToken({ sub: "user123" }))).toBe(true);
  });

  it("default export equals named export", () => {
    expect(isJwtExpired).toBe(namedExport);
  });
});
