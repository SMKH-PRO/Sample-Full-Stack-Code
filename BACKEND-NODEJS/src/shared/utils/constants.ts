export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}
export enum ErrorMessages {
  default = 'Something went wrong!',
}
export enum ErrorCodes {
  default = 'ERROR',
  operationFailed = 'OPERATION_FAILED',
  internalError = 'INTERNAL_ERROR',

}
export const environment = process.env.NODE_ENV;
export const isDev = environment === 'development';
