import { ErrorMessages, HttpStatusCode } from '../utils/constants';
import BaseError from './baseError';

export interface APIErrorType {
  name?: string,
  httpCode?: string,
  isOperational?: boolean,
  description?: string
}
class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = 'Internal Server Error',
  ) {
    super(name, httpCode, isOperational, description || ErrorMessages.default);
  }
}

export default APIError;
