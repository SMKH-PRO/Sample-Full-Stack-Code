/* eslint-disable no-useless-escape */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import BaseError from '../../shared/errorHandling/baseError';
import { ErrorCodes, HttpStatusCode } from '../../shared/utils/constants';

export interface IUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\([0-9]{3}\) [0-9]{3} - [0-9]{4}$/, 'Phone number is not valid'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
  },
  password: { type: String, required: true },

});
// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(this.password, salt);
    this.password = hashedPW;
    next();
  } catch (e: any) {
    next(new BaseError(ErrorCodes.internalError, HttpStatusCode.INTERNAL_SERVER, true, e?.message));
  }
});
const UserRegistration = model<IUser>('registrations', userSchema);

export default UserRegistration;
