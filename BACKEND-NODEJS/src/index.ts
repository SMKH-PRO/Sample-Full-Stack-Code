import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes/index';
import errorHandler from './shared/errorHandling/index';
import { connectDB } from './database/index';
import 'dotenv/config';
import { ErrorCodes } from './shared/utils/constants';

// database connection
connectDB();

// express app
const app = express();
// port
const port = process.env.PORT || 3000;

// error handling
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

app.use(express.json());
app.use(cors());

// navigations
app.use('/api', routes);

// middleware to handle all api errors.
app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  console.log('Error occurred [middleware]', err);
  // eslint-disable-next-line no-underscore-dangle
  res.status(err.httpCode).send({ code: err.name || ErrorCodes.default, message: err.message });
  await errorHandler.handleError(err);
});
app.use(express.static(path.join(__dirname, '../build')));
// set a static folder
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`Application started on port ${port}!`);
});
