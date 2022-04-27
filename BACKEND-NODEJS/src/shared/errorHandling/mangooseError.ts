import { MongooseError } from 'mongoose';
import { ErrorMessages, HttpStatusCode } from '../utils/constants';
import APIError from './apiError';

interface Props extends MongooseError {
  _message?: string
}
class MongoError extends APIError {
  constructor(error: Props) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, message, _message } = error;
    const description = message || _message || ErrorMessages.default;
    super(name, HttpStatusCode.BAD_REQUEST, true, description);
  }
}

export default MongoError;
