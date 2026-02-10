/**
 * A minimal example library for the starter template.
 *
 * Exports:
 * - `greet(name?)` : returns a greeting string
 * - `sum(...numbers)` : returns the numeric sum
 *
 * Both named exports and a default export object are provided to showcase
 * common package export patterns.
 */

/** Return a friendly greeting. */
export function greet(name = "world"): string {
  return `Hello, ${name}!`;
}

/** Sum numbers and return their total (0 when no args). */
export function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

const defaultExport = { greet, sum } as const;

export default defaultExport;
