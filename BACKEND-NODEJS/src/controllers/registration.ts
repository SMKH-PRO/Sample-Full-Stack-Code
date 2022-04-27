/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import Registration, { IUser } from '../database/models/index';
import { handleError } from '../shared/utils/helpers';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const data: IUser = body;
    const newUser = await new Registration(data).save();
    res.json(newUser);
  } catch (e: any) {
    handleError(e, next);
  }
};
