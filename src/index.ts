import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
import helmet from 'helmet';

const app: Express = express();
app.use(helmet());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

export default app;
