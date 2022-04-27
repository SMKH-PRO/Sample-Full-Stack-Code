/* eslint-disable class-methods-use-this */
import BaseError from './baseError';
import logger from '../logger';

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await logger.error(
      'ErrorHandled: ',
      err,
    );
    // right here we can write code to send email to administration notifying about the error.
  }

  public isTrustedError(error: BaseError | Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
const errorHandlr = new ErrorHandler();
export default errorHandlr;
