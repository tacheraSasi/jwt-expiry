# jwt-expiry

A lightweight utility to check if a JWT token has expired.

> **Note:** This library only decodes the token. It does **not** verify the
> signature, so it must not be used for authorization on a server. Use it for
> client-side decisions such as knowing when to refresh a token.

## Installation

```bash
npm install jwt-expiry
```

## Usage

```ts
import { isJwtExpired } from "jwt-expiry";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

if (isJwtExpired(token)) {
  console.log("Token has expired");
} else {
  console.log("Token is still valid");
}
```

A default export is also available:

```ts
import isJwtExpired from "jwt-expiry";
```

### With Custom Skew

By default, the function considers a token expired 30 seconds before its actual
expiration time, so a request won't fail mid-flight from clock skew. You can
customize this:

```ts
// Consider expired 60 seconds before actual expiration
isJwtExpired(token, 60);

// No skew - only expired once the actual exp time is reached
isJwtExpired(token, 0);
```

Negative or non-finite `skewSeconds` values are treated as `0`.

## API

### `isJwtExpired(token: string, skewSeconds?: number): boolean`

| Parameter     | Type     | Default | Description                                                          |
| ------------- | -------- | ------- | -------------------------------------------------------------------- |
| `token`       | `string` | -       | JWT token string to check                                            |
| `skewSeconds` | `number` | `30`    | Seconds before actual expiration to consider the token expired       |

**Returns:** `true` if the token is expired or unusable, `false` if it is still
valid.

### Behavior

- Returns `true` if the token is malformed, cannot be decoded, or has a payload
  that is not valid JSON
- Returns `true` if the `exp` claim is missing or is not a finite number
  (per [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4),
  a token without `exp` never expires; this library treats it as unusable
  instead)
- Returns `true` if the token expires within the skew window, including exactly
  at `exp === now + skewSeconds`
- Returns `false` if the token is valid and outside the skew window

## Types

`JwtPayload` is re-exported from
[`jwt-decode`](https://github.com/auth0/jwt-decode), where `exp` is optional:

```ts
import type { JwtPayload } from "jwt-expiry";

type JwtPayload = {
  exp?: number;
  iat?: number;
  nbf?: number;
  // ...standard claims
  [claim: string]: unknown;
};
```

## License

MIT
