# OTPX

A lightweight, flexible OTP (One-Time Password) generator for Node.js and TypeScript.

Supports multiple charsets (numeric, alphabetic, alphanumeric, hex, or custom), case options, and exclusion of ambiguous characters like `O0Il`.

---

## Features

- Generate OTPs with customizable length
- Built-in charsets: `numeric`, `alphabetic`, `alphanumeric`, `hex`
- Provide your own custom charset
- Exclude visually similar characters (`O`, `0`, `I`, `l`)
- Case handling: upper, lower, or mixed
- Secure random generation using Node.js `crypto`

---

## Installation

```bash
npm install otpx
# or

```

---

## Usage

### Basic Example

```ts
import OTPX from "otpx";

// Generate a 6-digit numeric OTP
const otp = OTPX.numeric();
console.log(otp); // e.g. "583920"
```

---

### Using Different Charsets

`````ts
import OTPX from "otpx";

// Alphabetic OTP (mixed case)
console.log(OTPX.alphabetic(8)); // e.g. "aZkPqTrB"

// Alphanumeric OTP with options
console.log(OTPX.alphanumeric(10, { excludeSimilar: true }));
// e.g. "9kPz3Hd2Gq"

// Hexadecimal OTP
````markdown
# npm-package-starter-template

A minimal, reusable TypeScript npm package starter template. This repository demonstrates a small library layout with build, test, and type-checking setup so you can quickly scaffold a new package.

## What's included
- TypeScript source in `src/`
- Build with `tsup` (CJS + ESM + types)
- Tests with `jest` + `ts-jest`
- `tsconfig.json` configured for library builds
- `LICENSE` (MIT) and example `README.md`

## Quickstart

1. Clone this repo and replace package metadata in `package.json` (name, author, repository, homepage, description).
2. Update the package source in `src/` and tests in `test/`.
3. Install dependencies and develop.

```bash
npm install
npm run build      # produce dist/ bundles
npm run test       # run tests
npm run typecheck  # run TypeScript type check
`````

When publishing, update `version` and run `npm publish` (or use CI to publish).

## Development

- Run tests in watch mode:

```bash
npm run test:watch
```

- Clean output and rebuild:

```bash
npm run clean
npm run build
```

## Usage Example

Replace `your-package-name` with the name you set in `package.json`.

```ts
import MyPackage from "your-package-name";

// use exports from src/index.ts
console.log(typeof MyPackage);
```

## Publishing

1. Ensure `package.json` fields are correct (`name`, `version`, `repository`, `license`, `author`).
2. Build (`npm run build`) and verify `dist/` contains expected files.
3. Publish to npm:

```bash
npm publish --access public
```

## Customize

- Add CI (GitHub Actions) to run `npm test` and `npm run build` on PRs.
- Add linting (ESLint) and formatting (Prettier) if desired.

## License

MIT

```
export class OtpService {
```
