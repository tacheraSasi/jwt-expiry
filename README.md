# jwt-expiry

A lightweight utility to check if a JWT token has expired.

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

### With Custom Skew

By default, the function considers a token expired 30 seconds before its actual expiration time (clock skew protection). You can customize this:

```ts
// Consider expired 60 seconds before actual expiration
isJwtExpired(token, 60);

// No skew - only expired if past actual exp time
isJwtExpired(token, 0);
```

## API

### `isJwtExpired(token: string, skewSeconds?: number): boolean`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `token` | `string` | - | JWT token string to check |
| `skewSeconds` | `number` | `30` | Seconds before actual expiration to consider the token expired |

**Returns:** `true` if the token is expired or invalid, `false` if still valid.

### Behavior

- Returns `true` if the token is malformed or cannot be decoded
- Returns `true` if the token has no `exp` claim
- Returns `true` if the token expires within the skew window
- Returns `false` if the token is valid and not expired

## Types

```ts
import { JwtPayload } from "jwt-expiry";

// JwtPayload type
type JwtPayload = {
  exp: number;
  [key: string]: any;
};
```

## License

MIT
