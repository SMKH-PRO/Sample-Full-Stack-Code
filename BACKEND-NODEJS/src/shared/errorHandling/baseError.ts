import { ErrorMessages, HttpStatusCode } from '../utils/constants';

class BaseError extends Error {
  public readonly name: string;

  public readonly httpCode: HttpStatusCode;

  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    isOperational: boolean,
    description: string = ErrorMessages.default,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
export default BaseError;
