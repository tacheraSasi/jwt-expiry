export interface OTPXOptions {
  algorithm?: 'sha1' | 'sha256' | 'sha512';
  digits?: number;
  period?: number;
  window?: number;
  counter?: number;
  secretEncoding?: 'ascii' | 'base32' | 'hex';
}

export interface HOTPOptions extends OTPXOptions {
  counter: number;
}

export interface TOTPOptions extends OTPXOptions {
  period: number;
  timestamp?: number;
}

export interface OTPXResult {
  token: string;
  expiresAt?: Date;
  remainingTime?: number;
}

export interface OTPXVerificationResult {
  isValid: boolean;
  isExpired?: boolean;
  delta?: number;
}

export class OTPXError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'OTPXError';
  }
}

export type OTPAlgorithm = 'sha1' | 'sha256' | 'sha512';
export type SecretEncoding = 'ascii' | 'base32' | 'hex';