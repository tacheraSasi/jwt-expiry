import { OTPXError } from './types';

export class OTPXValidationError extends OTPXError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'OTPXValidationError';
  }
}

export class OTPXGenerationError extends OTPXError {
  constructor(message: string, details?: any) {
    super(message, 'GENERATION_ERROR', details);
    this.name = 'OTPXGenerationError';
  }
}

export class OTPXVerificationError extends OTPXError {
  constructor(message: string, details?: any) {
    super(message, 'VERIFICATION_ERROR', details);
    this.name = 'OTPXVerificationError';
  }
}

export const ERROR_CODES = {
  INVALID_SECRET: 'INVALID_SECRET',
  INVALID_DIGITS: 'INVALID_DIGITS',
  INVALID_PERIOD: 'INVALID_PERIOD',
  INVALID_WINDOW: 'INVALID_WINDOW',
  INVALID_COUNTER: 'INVALID_COUNTER',
  INVALID_TOKEN: 'INVALID_TOKEN',
  ALGORITHM_NOT_SUPPORTED: 'ALGORITHM_NOT_SUPPORTED',
  ENCODING_NOT_SUPPORTED: 'ENCODING_NOT_SUPPORTED',
};