/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import 'dotenv/config';

const mongoURI = process.env.MONGO_URI!;
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(mongoURI as string);
    console.info('database connected', connection.connection.host);
  } catch (e) {
    console.error('error in database connection', e);
  }
};
