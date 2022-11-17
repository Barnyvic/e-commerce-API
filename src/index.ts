import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
import helmet from 'helmet';

import userRouter from './routes/userRoute';
import { CustomRequest } from '../src/utils/interface';
import adminRouter from '../src/routes/admin';

const app: Express = express();
app.use(helmet());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

declare global {
  namespace Express {
    interface Request extends CustomRequest {}
  }
}

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

export default app;
