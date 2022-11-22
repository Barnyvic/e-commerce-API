import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
import helmet from 'helmet';

import userRouter from './routes/userRoute';
import productRouter from './routes/productRoute';
import { CustomRequest } from '../src/utils/interface';
import adminRouter from '../src/routes/admin';
import reviewRouter from './routes/review';

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
app.use('/api/products', productRouter);
app.use('/api/admin', adminRouter);
app.use('/api/review', reviewRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

export default app;
