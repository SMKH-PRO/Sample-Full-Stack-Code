/* eslint-disable import/prefer-default-export */
import { MongooseError } from 'mongoose';
import { NextFunction } from 'express';
import APIError from '../errorHandling/apiError';
import MongoError from '../errorHandling/mangooseError';
import { ErrorCodes, HttpStatusCode } from './constants';

export const isMongooseError = (err: MongooseError | Error) => Boolean(err?.name && err?.message);
export const handleError = (e: any, next: NextFunction) => {
  if (isMongooseError(e)) {
    next(new MongoError(e));
  } else {
    next(new APIError(ErrorCodes.default, HttpStatusCode.BAD_REQUEST, true, e?.message));
  }
};
